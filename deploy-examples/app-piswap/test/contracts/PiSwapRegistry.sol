// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

// interfaces
import "./interfaces/IPiSwapRegistry.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// libraries
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "./lib/registry/BeaconProxyOptimized.sol";
// base contracts
import "./lib/registry/BeaconUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";

interface IMarket {
    function initialize(
        address tokenAddress,
        uint256 tokenId,
        NFTType nftType
    ) external;
}

struct NFT {
    address tokenAddress;
    uint256 tokenId;
}

contract PiSwapRegistry is IPiSwapRegistry, BeaconUpgradeable, ERC1155SupplyUpgradeable {
    using TokenTypeLib for TokenType;
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using AddressUpgradeable for address;

    address public WETH;
    address public beneficiary;

    // market address => token data
    mapping(address => NFT) private _nftInfo;
    // nft contract address => token id => market address
    mapping(address => mapping(uint256 => address)) private _markets;

    uint256 public fee;
    uint256 public oracleLength;

    uint8 public constant decimals = 18;

    modifier onlyMarket() {
        require(_isMarket(_msgSender()), _errMsg("mint/burn", "ONLY_MARKET"));
        _;
    }

    function initialize(
        address _owner,
        address _beneficiary,
        address _marketImplementation,
        address _weth,
        string calldata _uri
    ) external initializer {
        __Owned_init(_owner);
        __Beacon_init(_marketImplementation); 
        __ERC1155_init(_uri);
        __ERC1155Supply_init();
        beneficiary = _beneficiary;
        fee = 50;
        oracleLength = 60;
        WETH = _weth;
    }

    /// @notice see {IPiSwapRegistry-createMarket}
    function createMarket(address tokenAddress, uint256 tokenId) external returns (address market) {
        require(!marketExists(tokenAddress, tokenId), _errMsg("createMarket", "MARKET_EXISTS"));
        require(tokenAddress != address(this), _errMsg("createMarket", "INVALID"));
        NFT memory data = NFT({tokenAddress: tokenAddress, tokenId: tokenId});

        // deploy market contract
        NFTType nftType = _getNFTType(tokenAddress);
        if (nftType == NFTType.ERC721) {
            // usually the ownerOf query for a nonexistent NFT reverts, in case it returns address(0), revert
            assert(IERC721(tokenAddress).ownerOf(tokenId) != address(0));
        } else {
            require(_nftExistsERC1155(tokenAddress, tokenId), _errMsg("createMarket", "NON_EXISTENT_NFT"));
        }

        bytes32 salt = keccak256(abi.encodePacked(tokenAddress, tokenId, block.chainid));
        market = address(new BeaconProxyOptimized{salt: salt}());
        _markets[tokenAddress][tokenId] = market;

        IMarket(market).initialize(tokenAddress, tokenId, nftType);

        // register token
        _nftInfo[market] = data;

        emit MarketCreated(market, tokenAddress, tokenId);
    }

    /// @notice see {IPiSwapRegistry-mint}
    /// @dev only callable by markets
    function mint(
        address to,
        uint256 amount,
        TokenType tokenType
    ) external onlyMarket {
        assert(amount > 0);
        uint256 tokenId = tokenType.id(_msgSender());
        _mint(to, tokenId, amount, "");
    }

    /// @notice see {IPiSwapRegistry-burn}
    /// @dev only callable by markets
    function burn(
        address from,
        uint256 amount,
        TokenType tokenType
    ) external onlyMarket {
        require(amount > 0, _errMsg("burn", "AMOUNT_ZERO"));
        uint256 tokenId = tokenType.id(_msgSender());
        _burn(from, tokenId, amount);
    }

    /// @notice see {IPiSwapRegistry-deposit}
    function deposit(uint256 amount) external {
        IERC20Upgradeable(WETH).safeTransferFrom(_msgSender(), address(this), amount);
        _mint(_msgSender(), 0, amount, "");
        emit Deposit(_msgSender(), amount);
    }

    /// @notice see {IPiSwapRegistry-withdraw}
    function withdraw(uint256 amount, address to) external {
        _burn(_msgSender(), 0, amount);
        IERC20Upgradeable(WETH).safeTransfer(to, amount);
        emit Withdrawal(_msgSender(), to, amount);
    }

    /// @notice see {IPiSwapRegistry-setBeneficiary}
    /// @dev fee cannot exceed 2%
    function setBeneficiary(address newBeneficiary) external onlyOwner {
        emit BeneficiaryUpdated(beneficiary, newBeneficiary);
        beneficiary = newBeneficiary;
    }

    /// @notice see {IPiSwapRegistry-setFee}
    function setFee(uint256 newFee) external onlyOwner {
        require(newFee <= 200);
        emit FeeUpdated(fee, newFee);
        fee = newFee;
    }

    /// @notice see {IPiSwapRegistry-setOracleLength}
    /// @dev minimum is 5 blocks
    function setOracleLength(uint256 newOracleLength) external onlyOwner {
        require(newOracleLength >= 5);
        emit OracleLengthUpdated(oracleLength, newOracleLength);
        oracleLength = newOracleLength;
    }

    /// @dev see {IERC1155-_setURI}.
    function setURI(string calldata newUri) external onlyOwner {
        _setURI(newUri);
    }

    /// @notice see {IPiSwapRegistry-getMarketForNFT}
    function getMarketForNFT(address tokenAddress, uint256 tokenId) external view returns (address market) {
        require(marketExists(tokenAddress, tokenId), _errMsg("getMarketForNFT", "MARKET_DOES_NOT_EXIST"));
        market = _markets[tokenAddress][tokenId];
    }

    /// @notice see {IPiSwapRegistry-marketExists}
    function marketExists(address tokenAddress, uint256 tokenId) public view returns (bool) {
        address market = _markets[tokenAddress][tokenId];
        return market != address(0);
    }

    /// @dev See {IERC1155-isApprovedForAll}.
    function isApprovedForAll(address account, address operator) public view virtual override returns (bool) {
        if (_isMarket(operator)) {
            return true;
        }
        return super.isApprovedForAll(account, operator);
    }

    function _isMarket(address market) private view returns (bool) {
        return _nftInfo[market].tokenAddress != address(0);
    }

    function _getNFTType(address tokenAddress) private view returns (NFTType) {
        IERC165Upgradeable token = IERC165Upgradeable(tokenAddress);
        if (token.supportsInterface(0x80ac58cd)) {
            return NFTType.ERC721;
        } else if (token.supportsInterface(0xd9b67a26)) {
            return NFTType.ERC1155;
        } else {
            revert(_errMsg("createMarket", "UNSUPPORTED_CONTRACT"));
        }
    }

    /// @dev some ERC1155 contracts implement a function to fetch the total supply
    /// @dev if they do, return if total supply is > 0
    function _nftExistsERC1155(address tokenAddress, uint256 tokenId) private view returns (bool) {
        try ERC1155SupplyUpgradeable(tokenAddress).totalSupply(tokenId) returns (uint256 _totalSupply) {
            return _totalSupply > 0;
        } catch (
            bytes memory /*lowLevelData*/
        ) {
            // if total supply getter is not implemented, assume NFT exists
            return true;
        }
    }

    function _errMsg(string memory method, string memory message) private pure returns (string memory) {
        return string(abi.encodePacked("PiSwapRegistry#", method, ": ", message));
    }

    uint256[50] private __gap;
}
