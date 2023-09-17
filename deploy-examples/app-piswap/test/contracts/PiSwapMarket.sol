// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

// interfaces
import "./interfaces/IPiSwapMarket.sol";
import "./interfaces/IERC2981.sol";
import "./interfaces/IWETH.sol";
// libraries
import "./lib/market/PiSwapLibrary.sol";
import "./lib/market/Oracle.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// base contracts
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";

contract PiSwapMarket is ContextUpgradeable, ReentrancyGuardUpgradeable, ERC1155HolderUpgradeable, ERC721HolderUpgradeable, IPiSwapMarket {
    using OracleLib for PriceSnapshot[];
    using TokenTypeLib for TokenType;
    using SwapKindLib for SwapKind;
    using SafeERC20 for IWETH;

    IRegistry private _registry;
    NFTData private _nftData;
    PriceSnapshot[] private _oracle;
    int256 internal _lockedEthCorrection;

    modifier ensure(uint256 deadline, string memory method) {
        require(block.timestamp < deadline, _errMsg(method, "EXPIRED"));
        _;
    }

    /// @notice on every ETH / Token swap lock half of the fee
    modifier lockLiquidity(TokenType tokenIn, TokenType tokenOut) {
        require(tokenIn != TokenType.LIQUIDITY && tokenOut != TokenType.LIQUIDITY, _errMsg("swap", "LIQUIDITY_TOKEN_SWAP"));
        require(tokenIn != tokenOut, _errMsg("swap", "EQUAL_TOKEN_IN_OUT"));
        // sort tokens and check if ETH is traded, invert BULL/BEAR to track added liquidity
        (TokenType ethToken, TokenType nonTradedToken) = tokenIn < tokenOut ? (tokenIn, tokenOut.invert()) : (tokenOut, tokenIn.invert());
        if (ethToken.isEth()) {
            (uint256 reserveBefore, ) = _getSwapReserves(ethToken, nonTradedToken);
            _;
            (uint256 reserveAfter, ) = _getSwapReserves(ethToken, nonTradedToken);
            assert(reserveAfter >= reserveBefore);
            // half of the liquidity added through the fee is minted to the protocol
            uint256 adjustedReserve = reserveBefore + (reserveAfter - reserveBefore) / 2;
            uint256 impact = (reserveAfter * 1 ether) / adjustedReserve - 1 ether;
            uint256 liquidityMinted = (_registry.totalSupply(TokenType.LIQUIDITY.id()) * impact) / 1 ether;
            _registry.mint(address(this), liquidityMinted, TokenType.LIQUIDITY);
        } else {
            _;
        }
    }

    function initialize(
        address tokenAddress,
        uint256 tokenId,
        NFTType nftType
    ) external initializer {
        __ERC1155Holder_init();
        __ERC721Holder_init();
        __ReentrancyGuard_init();
        _registry = IRegistry(_msgSender());
        _nftData = NFTData(tokenId, tokenAddress, nftType);
        // approve MAX_UINT on initialization for gas costs,
        // total supply of ethereum would have to be deposited over 1e50 times
        // for the approved amount to become insufficient
        IWETH WETH = IWETH(_registry.WETH());
        WETH.approve(_msgSender(), type(uint256).max);
    }

    /// @notice see {IPiSwapMarket-registry}
    function registry() public view returns (address) {
        return address(_registry);
    }

    /// @notice see {IPiSwapMarket-underlyingNFT}
    function underlyingNFT()
        external
        view
        returns (
            address tokenAddress,
            uint256 tokenId,
            NFTType nftType
        )
    {
        tokenAddress = _nftData.tokenAddress;
        tokenId = _nftData.tokenId;
        nftType = _nftData.nftType;
    }

    /// @notice see {IPiSwapMarket-mint}
    function mint(Arguments.Mint calldata args)
        external
        ensure(args.deadline, "mint")
        nonReentrant
        returns (uint256 amountIn, uint256 amountOut)
    {
        uint256 fee;
        if (args.kind.givenIn()) {
            amountIn = args.amount;
            fee = (amountIn * _registry.fee()) / 10000;
            amountOut = mintOutGivenIn(amountIn - fee);
            require(amountOut >= args.slippage, _errMsg("mint", "SLIPPAGE"));
        } else {
            amountOut = args.amount;
            uint256 amountInWithoutFee = mintInGivenOut(amountOut);
            amountIn = (amountInWithoutFee * 10000) / (10000 - _registry.fee());
            fee = amountIn - amountInWithoutFee;
            require(amountIn <= args.slippage, _errMsg("mint", "SLIPPAGE"));
        }

        _deposit(TokenType.ETH, amountIn, args.useWeth);
        if (fee != 0) _registry.withdraw(fee, _registry.beneficiary());
        _registry.mint(args.to, amountOut, TokenType.BULL);
        _registry.mint(args.to, amountOut, TokenType.BEAR);
        emit Minted(_msgSender(), args.to, amountIn, amountOut);
    }

    /// @notice see {IPiSwapMarket-burn}
    function burn(Arguments.Burn calldata args)
        external
        ensure(args.deadline, "burn")
        nonReentrant
        returns (uint256 amountIn, uint256 amountOut)
    {
        uint256 fee;

        if (args.kind.givenIn()) {
            amountIn = args.amount;
            uint256 amountOutWithoutFee = burnOutGivenIn(amountIn);
            fee = (amountOutWithoutFee * _registry.fee()) / 10000;
            amountOut = amountOutWithoutFee - fee;
            require(amountOut >= args.slippage, _errMsg("burn", "SLIPPAGE"));
        } else {
            amountOut = args.amount;
            uint256 amountOutWithFee = (amountOut * 10000) / (10000 - _registry.fee());
            fee = amountOutWithFee - amountOut;
            amountIn = burnInGivenOut(amountOutWithFee);
            require(amountIn <= args.slippage, _errMsg("burn", "SLIPPAGE"));
        }

        _registry.burn(_msgSender(), amountIn, TokenType.BULL);
        _registry.burn(_msgSender(), amountIn, TokenType.BEAR);
        if (fee != 0) _registry.withdraw(fee, _registry.beneficiary());
        _withdraw(TokenType.ETH, amountOut, args.useWeth, args.to);
        emit Burned(_msgSender(), args.to, amountIn, amountOut);
    }

    /// @notice see {IPiSwapMarket-addLiquidity}
    function addLiquidity(Arguments.AddLiquidity calldata args)
        external
        ensure(args.deadline, "addLiquidity")
        nonReentrant
        returns (
            uint256 liquidityMinted,
            uint256 amountBull,
            uint256 amountBear
        )
    {
        uint256 liquiditySupply = _registry.totalSupply(TokenType.LIQUIDITY.id());
        if (liquiditySupply > 0) {
            uint256 bullReserve = getReserve(TokenType.BULL);
            uint256 ethReserve = getReserve(TokenType.ETH);
            uint256 totalTokenReserve = bullReserve + getReserve(TokenType.BEAR);
            uint256 totalTokenAmount = (totalTokenReserve * args.amountEth) / ethReserve;
            amountBull = (totalTokenAmount * bullReserve) / totalTokenReserve;
            amountBear = totalTokenAmount - amountBull;
            liquidityMinted = (args.amountEth * liquiditySupply) / ethReserve;
            require(
                liquidityMinted >= args.minLiquidity && args.maxBull >= amountBull && args.maxBear >= amountBear,
                _errMsg("addLiquidity", "SLIPPAGE")
            );
            _deposit(TokenType.ETH, args.amountEth, args.useWeth);
            _registry.safeTransferFrom(_msgSender(), address(this), TokenType.BULL.id(), amountBull, "");
            _registry.safeTransferFrom(_msgSender(), address(this), TokenType.BEAR.id(), amountBear, "");
            _registry.mint(args.to, liquidityMinted, TokenType.LIQUIDITY);
            emit LiquidityAdded(_msgSender(), args.to, liquidityMinted, args.amountEth, amountBull, amountBear);
        } else {
            // initialize pool
            liquidityMinted = args.amountEth;
            amountBull = args.maxBull;
            amountBear = args.maxBear;
            require(args.amountEth != 0 && amountBull != 0 && amountBear != 0, _errMsg("addLiquidity", "INSUFFICIENT_AMOUNT"));
            _deposit(TokenType.ETH, args.amountEth, args.useWeth);
            _registry.safeTransferFrom(_msgSender(), address(this), TokenType.BULL.id(), args.maxBull, "");
            _registry.safeTransferFrom(_msgSender(), address(this), TokenType.BEAR.id(), args.maxBear, "");
            _registry.mint(args.to, liquidityMinted, TokenType.LIQUIDITY);
            emit LiquidityAdded(_msgSender(), args.to, liquidityMinted, args.amountEth, args.maxBull, args.maxBear);
        }
    }

    /// @notice see {IPiSwapMarket-removeLiquidity}
    function removeLiquidity(Arguments.RemoveLiquidity calldata args)
        external
        ensure(args.deadline, "removeLiquidity")
        nonReentrant
        returns (
            uint256 amountEth,
            uint256 amountBull,
            uint256 amountBear
        )
    {
        uint256 liquiditySupply = _registry.totalSupply(TokenType.LIQUIDITY.id());
        require(liquiditySupply > 0);

        amountEth = (getReserve(TokenType.ETH) * args.amountLiquidity) / liquiditySupply;
        amountBull = (getReserve(TokenType.BULL) * args.amountLiquidity) / liquiditySupply;
        amountBear = (getReserve(TokenType.BEAR) * args.amountLiquidity) / liquiditySupply;
        require(
            amountEth >= args.minEth && amountBull >= args.minBull && amountBear >= args.minBear,
            _errMsg("removeLiquidity", "SLIPPAGE")
        );

        _registry.burn(_msgSender(), args.amountLiquidity, TokenType.LIQUIDITY);
        _withdraw(TokenType.ETH, amountEth, args.useWeth, args.to);
        _registry.safeTransferFrom(address(this), args.to, TokenType.BULL.id(), amountBull, "");
        _registry.safeTransferFrom(address(this), args.to, TokenType.BEAR.id(), amountBear, "");
        emit LiquidityRemoved(_msgSender(), args.to, args.amountLiquidity, amountEth, amountBull, amountBear);
    }

    /// @notice see {IPiSwapMarket-swap}
    function swap(Arguments.Swap calldata args)
        external
        ensure(args.deadline, "swap")
        lockLiquidity(args.tokenIn, args.tokenOut)
        nonReentrant
        returns (uint256 amountIn, uint256 amountOut)
    {
        require(args.amount != 0, _errMsg("swap", "AMOUNT_ZERO"));
        _registerPrice();
        if (args.kind.givenIn()) {
            amountIn = args.amount;
            amountOut = swapOutGivenIn(amountIn, args.tokenIn, args.tokenOut);
            require(amountOut >= args.slippage, _errMsg("swap", "SLIPPAGE"));
        } else {
            amountOut = args.amount;
            amountIn = swapInGivenOut(amountOut, args.tokenIn, args.tokenOut);
            require(amountIn <= args.slippage, _errMsg("swap", "SLIPPAGE"));
        }
        _deposit(args.tokenIn, amountIn, args.useWeth);
        _withdraw(args.tokenOut, amountOut, args.useWeth, args.to);
        emit Swapped(_msgSender(), args.to, args.tokenIn, args.tokenOut, amountIn, amountOut);
    }

    /// @notice see {PiSwapLibrary-sellNFT}
    function sellNFT(NFTSwap calldata args) external ensure(args.deadline, "sellNFT") nonReentrant returns (bool) {
        uint256 nftValueAcc = nftValueAccumulated();
        uint256 totalValue = nftValueAcc * args.amount;
        require(_sufficientLiquidityForSwap(nftValueAcc, args.amount), _errMsg("sellNFT", "INSUFFICIENT_LIQUIDITY"));
        address nftAddress = _nftData.tokenAddress;
        if (_nftData.nftType == NFTType.ERC721) {
            require(args.amount == 1, _errMsg("sellNFT", "INVALID_AMOUNT"));
            IERC721_ NFT = IERC721_(nftAddress);
            NFT.safeTransferFrom(_msgSender(), address(this), _nftData.tokenId, "");
        } else {
            require(args.amount > 0, _errMsg("sellNFT", "INVALID_AMOUNT"));
            IERC1155_ NFT = IERC1155_(nftAddress);
            NFT.safeTransferFrom(_msgSender(), address(this), _nftData.tokenId, args.amount, "");
        }
        address royaltyReceiver = address(0);
        uint256 royalty = 0;
        if (_checkRoyaltyInterface(nftAddress)) {
            (royaltyReceiver, royalty) = IERC2981(nftAddress).royaltyInfo(_nftData.tokenId, totalValue);
            // pay out max 10% royalty
            if (royalty > totalValue / 10) {
                royalty = totalValue / 10;
            }
            _registry.withdraw(royalty, royaltyReceiver);
            emit RoyaltyPaid(royaltyReceiver, royalty);
        }
        require(totalValue - royalty >= args.slippage, _errMsg("sellNFT", "SLIPPAGE"));
        _lockedEthCorrection -= int256(totalValue);
        _withdraw(TokenType.ETH, totalValue - royalty, args.useWeth, args.to);
        emit NFTSold(_msgSender(), args.to, nftValueAcc, args.amount);
        return true;
    }

    /// @notice see {PiSwapLibrary-buyNFT}
    function buyNFT(NFTSwap calldata args) external ensure(args.deadline, "buyNFT") nonReentrant returns (bool) {
        uint256 nftValueAcc = nftValueAccumulated();
        require(nftValueAcc <= args.slippage, _errMsg("buyNFT", "SLIPPAGE"));
        _deposit(TokenType.ETH, nftValueAcc * args.amount, args.useWeth);
        if (_nftData.nftType == NFTType.ERC721) {
            require(args.amount == 1, _errMsg("buyNFT", "INVALID_AMOUNT"));
            IERC721_ NFT = IERC721_(_nftData.tokenAddress);
            NFT.safeTransferFrom(address(this), args.to, _nftData.tokenId, "");
        } else {
            IERC1155_ NFT = IERC1155_(_nftData.tokenAddress);
            NFT.safeTransferFrom(address(this), _msgSender(), _nftData.tokenId, args.amount, "");
        }
        _lockedEthCorrection += int256(nftValueAcc * args.amount);
        emit NFTPurchased(_msgSender(), args.to, nftValueAcc, args.amount);
        return true;
    }

    /// @notice see {PiSwapLibrary-depositedEth}
    function depositedEth() public view returns (uint256) {
        uint256 currentSupply = _registry.totalSupply(TokenType.BULL.id());
        return PiSwapLibrary.depositedEth(currentSupply);
    }

    /// @notice returns reserve
    /// @dev if ETH, balance of contract is subtracted by the deposited ETH
    /// @dev if LIQUIDITY, reserve is amount of locked liquidity tokens
    function getReserve(TokenType tokenType) public view returns (uint256 reserve) {
        reserve = _registry.balanceOf(address(this), tokenType.id());
        if (tokenType.isEth()) {
            reserve -= depositedEth();
            reserve = uint256(int256(reserve) - _lockedEthCorrection);
        }
    }

    /// @notice see {IPiSwapMarket-mintOutGivenIn}
    function mintOutGivenIn(uint256 amountIn) public view returns (uint256 amountOut) {
        uint256 currentSupply = _registry.totalSupply(TokenType.BULL.id());
        amountOut = PiSwapLibrary.mintOutGivenIn(currentSupply, amountIn);
    }

    /// @notice see {IPiSwapMarket-mintInGivenOut}
    function mintInGivenOut(uint256 amountOut) public view returns (uint256 amountIn) {
        uint256 currentSupply = _registry.totalSupply(TokenType.BULL.id());
        amountIn = PiSwapLibrary.mintInGivenOut(currentSupply, amountOut);
    }

    /// @notice see {IPiSwapMarket-burnOutGivenIn}
    function burnOutGivenIn(uint256 amountIn) public view returns (uint256 amountOut) {
        uint256 currentSupply = _registry.totalSupply(TokenType.BULL.id());
        amountOut = PiSwapLibrary.burnOutGivenIn(currentSupply, amountIn);
    }

    /// @notice see {IPiSwapMarket-burnInGivenOut}
    function burnInGivenOut(uint256 amountOut) public view returns (uint256 amountIn) {
        uint256 currentSupply = _registry.totalSupply(TokenType.BULL.id());
        amountIn = PiSwapLibrary.burnInGivenOut(currentSupply, amountOut);
    }

    /// @notice see {IPiSwapMarket-swapOutGivenIn}
    function swapOutGivenIn(
        uint256 amountIn,
        TokenType tokenIn,
        TokenType tokenOut
    ) public view returns (uint256 amountOut) {
        (uint256 reserveIn, uint256 reserveOut) = _getSwapReserves(tokenIn, tokenOut);
        uint256 amountInWithFee = (amountIn * reserveIn) / (amountIn + reserveIn);
        amountOut = PiSwapLibrary.swapOutGivenIn(reserveIn, reserveOut, amountInWithFee);
    }

    /// @notice see {IPiSwapMarket-swapInGivenOut}
    function swapInGivenOut(
        uint256 amountOut,
        TokenType tokenIn,
        TokenType tokenOut
    ) public view returns (uint256 amountIn) {
        (uint256 reserveIn, uint256 reserveOut) = _getSwapReserves(tokenIn, tokenOut);
        uint256 amountInWithoutFee = PiSwapLibrary.swapInGivenOut(reserveIn, reserveOut, amountOut);
        require(reserveIn > amountInWithoutFee, _errMsg("swap", "MAX_IN"));
        amountIn = (amountInWithoutFee * reserveIn) / (reserveIn - amountInWithoutFee);
    }

    /// @notice see {IPiSwapMarket-averageNftValue}
    function lockedEth() public view returns (uint256) {
        uint256 currentSupply = _registry.totalSupply(TokenType.LIQUIDITY.id());
        if (currentSupply == 0) return 0;
        uint256 lockedLiquidity = (getReserve(TokenType.LIQUIDITY) * 1 ether) / currentSupply;
        assert(lockedLiquidity <= 1 ether);
        if (lockedLiquidity == 0) return 0;
        (uint256 ethReserve, uint256 tokenReserve) = _getSwapReserves(TokenType.ETH, TokenType.BULL);
        uint256 lockedEthReserve = (ethReserve * lockedLiquidity) / 1 ether;
        uint256 lockedTokensReserve = (tokenReserve * lockedLiquidity) / 1 ether;
        int256 lockedEthCorrected = int256(PiSwapLibrary.lockedEth(lockedEthReserve, lockedTokensReserve)) + _lockedEthCorrection;
        assert(lockedEthCorrected >= 0);
        return uint256(lockedEthCorrected);
    }

    /// @notice see {IPiSwapMarket-nftValueAccumulated}
    function nftValueAccumulated() public view returns (uint256) {
        uint256 length = _oracle.length;
        uint256 requiredLength = _registry.oracleLength();
        require(length >= requiredLength, _errMsg("oracle", "NOT_INITIALIZED"));
        return nftValueAvg(requiredLength);
    }

    /// @notice see {IPiSwapMarket-swapEnabled}
    function swapEnabled() public view returns (bool) {
        return _sufficientLiquidityForSwap(nftValueAccumulated(), 1);
    }

    /// @notice see {IPiSwapMarket-nftValueAvg}
    function nftValueAvg(uint256 amount) public view returns (uint256) {
        return _oracle.avgPrice(amount);
    }

    /// @notice see {IPiSwapMarket-nftValue}
    function nftValue() external view returns (uint256) {
        uint256 length = _oracle.length;
        return length > 0 ? _oracle[length - 1].price : _nftValue();
    }

    /// @notice see {IPiSwapMarket-oracle}
    function getOracleEntry(uint256 index) external view returns (uint256 price, uint256 timestamp) {
        PriceSnapshot memory snapshot = _oracle[index];
        price = snapshot.price;
        timestamp = snapshot.timestamp;
    }

    /// @notice see {IPiSwapMarket-oracleLength}
    function oracleLength() external view returns (uint256) {
        return _oracle.length;
    }

    function _nftValue() private view returns (uint256) {
        uint256 bullReserve = getReserve(TokenType.BULL);
        assert(bullReserve > 0);
        return ((getReserve(TokenType.BEAR) * 1 ether) / bullReserve)**2 / 1 ether;
    }

    /// @param nftValueAcc accumulated nft value passed as parameter for gas savings, so it does not have to be recalculated during swap
    /// @param amountNfts  amount of nfts to swap
    /// @return whether there is sufficient liquidity for swap
    function _sufficientLiquidityForSwap(uint256 nftValueAcc, uint256 amountNfts) private view returns (bool) {
        return lockedEth() >= (nftValueAcc * amountNfts);
    }

    /// @dev if ETH is swapped, adjust the reserve to the BULL/BEAR ratio
    function _getSwapReserves(TokenType tokenIn, TokenType tokenOut) private view returns (uint256 reserveIn, uint256 reserveOut) {
        reserveIn = getReserve(tokenIn);
        reserveOut = getReserve(tokenOut);
        require(reserveIn > 0 && reserveOut > 0, _errMsg("swap", "NOT_INITIALIZED"));
        if (tokenIn.isEth()) {
            uint256 otherReserve = getReserve(tokenOut.invert());
            reserveIn = (reserveIn * otherReserve) / (reserveOut + otherReserve);
        } else if (tokenOut.isEth()) {
            uint256 otherReserve = getReserve(tokenIn.invert());
            reserveOut = (reserveOut * otherReserve) / (reserveIn + otherReserve);
        }
    }

    function _deposit(
        TokenType tokenType,
        uint256 amount,
        bool deposit
    ) private {
        if (tokenType.isEth() && deposit) {
            IWETH WETH = IWETH(_registry.WETH());
            WETH.safeTransferFrom(_msgSender(), address(this), amount);
            _registry.deposit(amount);
        } else {
            _registry.safeTransferFrom(_msgSender(), address(this), tokenType.id(), amount, "");
        }
    }

    function _withdraw(
        TokenType tokenType,
        uint256 amount,
        bool withdraw,
        address to
    ) private {
        if (tokenType.isEth() && withdraw) {
            _registry.withdraw(amount, to);
        } else {
            _registry.safeTransferFrom(address(this), to, tokenType.id(), amount, "");
        }
    }

    /// @notice register the current NFT price
    /// @dev called before any trade is executed in a block, this way flash loans can't manipulate the price within a single transaction
    function _registerPrice() private {
        uint256 length = _oracle.length;
        if (length == 0 || _oracle[length - 1].timestamp < block.timestamp) {
            uint256 price = _nftValue();
            _oracle.registerPrice(price);
            emit PriceRegistered(price, block.timestamp);
        }
    }

    /// @dev check whether an NFT contract implements the ERC-2981 interface
    /// @return false if ERC165 returns false or contract does not implement the ERC165 standard
    function _checkRoyaltyInterface(address contract_) private view returns (bool) {
        try IERC165(contract_).supportsInterface(0x2a55205a) returns (bool support) {
            return support;
        } catch (
            bytes memory /*lowLevelData*/
        ) {
            // should not be reached because ERC721 and ERC1155 standards are required to implement the ERC165 standard
            return false;
        }
    }

    function _errMsg(string memory method, string memory message) private pure returns (string memory) {
        return string(abi.encodePacked("PiSwapMarket#", method, ": ", message));
    }

    /**
        Override received functions to only accept 
            - ETH, BULL, BEAR, LIQUIDITY tokens of this market
            - The underlying NFT
     */

    function onERC1155Received(
        address,
        address,
        uint256 tokenId,
        uint256 value,
        bytes memory
    ) public virtual override returns (bytes4) {
        if (msg.sender == registry()) {
            require(
                tokenId == TokenType.ETH.id() ||
                    tokenId == TokenType.BULL.id() ||
                    tokenId == TokenType.BEAR.id() ||
                    tokenId == TokenType.LIQUIDITY.id(),
                _errMsg("onERC1155Received", "INVALID_TOKEN")
            );
            require(value != 0, _errMsg("onERC1155Received", "AMOUNT_ZERO"));
        } else {
            require(_nftData.nftType == NFTType.ERC1155, _errMsg("onERC1155Received", "INVALID_NFT_TYPE"));
            require(msg.sender == _nftData.tokenAddress, _errMsg("onERC1155Received", "INVALID_NFT_CONTRACT"));
            require(tokenId == _nftData.tokenId, _errMsg("onERC1155Received", "INVALID_TOKEN_ID"));
        }
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual override returns (bytes4) {
        revert(_errMsg("onERC1155BatchReceived", "BATCH_TRANSFER_DISALLOWED"));
    }

    function onERC721Received(
        address,
        address,
        uint256 tokenId,
        bytes memory
    ) public virtual override returns (bytes4) {
        require(_nftData.nftType == NFTType.ERC721, _errMsg("onERC721Received", "INVALID_NFT_TYPE"));
        require(msg.sender == _nftData.tokenAddress, _errMsg("onERC721Received", "INVALID_NFT_CONTRACT"));
        require(tokenId == _nftData.tokenId, _errMsg("onERC721Received", "INVALID_TOKEN_ID"));
        return this.onERC721Received.selector;
    }

    uint256[50] private __gap;
}
