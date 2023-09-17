//SPDX-License-Identifier:AGPL-3.0-only
pragma solidity 0.8.11;

import "./Arguments.sol";
import "./IPiSwapRegistry.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IRegistry is IPiSwapRegistry, IERC1155 {
    function totalSupply(uint256 id) external view returns (uint256);
}

struct NFTData {
    uint256 tokenId;
    address tokenAddress;
    NFTType nftType;
}

interface IPiSwapMarket is Arguments {
    event Minted(address indexed sender, address indexed to, uint256 amountIn, uint256 amountOut);
    event Burned(address indexed sender, address indexed to, uint256 amountIn, uint256 amountOut);
    event LiquidityAdded(
        address indexed sender,
        address indexed to,
        uint256 liquidityMinted,
        uint256 amountEth,
        uint256 amountBull,
        uint256 amountBear
    );
    event LiquidityRemoved(
        address indexed sender,
        address indexed to,
        uint256 liquidityBurned,
        uint256 amountEth,
        uint256 amountBull,
        uint256 amountBear
    );
    event Swapped(address indexed sender, address indexed to, TokenType tokenIn, TokenType tokenOut, uint256 amountIn, uint256 amountOut);
    event PriceRegistered(uint256 price, uint256 timestamp);
    event NFTPurchased(address indexed sender, address indexed to, uint256 price, uint256 amount);
    event NFTSold(address indexed sender, address indexed to, uint256 price, uint256 amount);
    event RoyaltyPaid(address indexed receiver, uint256 amount);

    /// @notice returns address of the PiSwapRegistry contract
    function registry() external returns (address);

    /// @notice returns information about the underlying NFT
    /// @return tokenAddress contract address of the underlying NFT
    /// @return tokenId      token id of the underlying NFT
    /// @return nftType      ERC721 or ERC1155 standard
    function underlyingNFT()
        external
        view
        returns (
            address tokenAddress,
            uint256 tokenId,
            NFTType nftType
        );

    /// @notice mint bull and bear tokens
    /// @param args see {Arguments-Mint}
    /// @return amountIn amount of ETH deposited
    /// @return amountOut amount of Bull and Bear tokens out
    function mint(Arguments.Mint calldata args) external returns (uint256 amountIn, uint256 amountOut);

    /// @notice burn bull and bear tokens
    /// @param args see {Arguments-Burn}
    /// @return amountIn amount of Bull and Bear tokens burned
    /// @return amountOut amount of ETH out
    function burn(Arguments.Burn calldata args) external returns (uint256 amountIn, uint256 amountOut);

    /// @notice add liquidity to liquidity pool
    /// @param args see {Arguments-AddLiquidity}
    /// @return liquidityMinted amount of liquidity tokens minted
    /// @return amountBull amount of Bull tokens added to the pool
    /// @return amountBear amount of Bear tokens added to the pool
    function addLiquidity(Arguments.AddLiquidity calldata args)
        external
        returns (
            uint256 liquidityMinted,
            uint256 amountBull,
            uint256 amountBear
        );

    /// @notice remove liquidity from liquidity pool
    /// @param args see {Arguments-AddLiquidity}
    /// @return amountEth  amount of eth out
    /// @return amountBull amount of bull tokens out
    /// @return amountBear amount of bear tokens out
    function removeLiquidity(Arguments.RemoveLiquidity calldata args)
        external
        returns (
            uint256 amountEth,
            uint256 amountBull,
            uint256 amountBear
        );

    /// @notice swap tokens
    /// @param args see {Arguments-Swap}
    /// @return amountIn amount of tokens in
    /// @return amountOut amount of tokens out
    function swap(Arguments.Swap calldata args) external returns (uint256 amountIn, uint256 amountOut);

    /// @notice sell an NFT to the smart contract
    /// @dev pays out up to 10% royalty supporting the ERC-2981 standard
    /// @param args see {Arguments-NFTSwap}
    /// @return true on success
    function sellNFT(Arguments.NFTSwap calldata args) external returns (bool);

    /// @notice buy NFT from the smart contract
    /// @param args see {Arguments-NFTSwap}
    /// @return true on success
    function buyNFT(Arguments.NFTSwap calldata args) external returns (bool);

    /// @notice see {PiSwapLibrary-mintOutGivenIn}
    function mintOutGivenIn(uint256 amountIn) external view returns (uint256 amountOut);

    /// @notice see {PiSwapLibrary-mintInGivenOut}
    function mintInGivenOut(uint256 amountOut) external view returns (uint256 amountIn);

    /// @notice see {PiSwapLibrary-burnOutGivenIn}
    function burnOutGivenIn(uint256 amountIn) external view returns (uint256 amountOut);

    /// @notice see {PiSwapLibrary-burnInGivenOut}
    function burnInGivenOut(uint256 amountOut) external view returns (uint256 amountIn);

    /// @notice calculate amount out with fee for an amount in
    /// @notice see {PiSwapLibrary-swapOutGivenIn}
    function swapOutGivenIn(
        uint256 amountIn,
        TokenType tokenIn,
        TokenType tokenOut
    ) external view returns (uint256 amountOut);

    /// @notice calculate amount in with fee for an amount out
    /// @notice see {PiSwapLibrary-swapInGivenOut}
    function swapInGivenOut(
        uint256 amountOut,
        TokenType tokenIn,
        TokenType tokenOut
    ) external view returns (uint256 amountIn);

    /// @return amount of ETH locked that can be used for NFT swaps
    function lockedEth() external view returns (uint256);

    /// @return returns price that the NFT can be currently swapped for
    /// @dev oracle period is fetched from registry contract
    function nftValueAccumulated() external view returns (uint256);

    /// @notice returns whether an NFT can currently be sold to the contract
    function swapEnabled() external view returns (bool);

    /// @notice get the average NFT value for the last n snapshots
    /// @param amount of snapshots to average over
    /// @return average price
    function nftValueAvg(uint256 amount) external view returns (uint256);

    /// @return current nftValue
    /// @dev returns latest oracle entry, if oracle is initialized, else returns calculated value
    function nftValue() external view returns (uint256);

    /// @notice get an entry from the oracle array
    /// @param index      of the entry to be retreived
    /// @return price     value of the NFT
    /// @return timestamp at which the price was added to the oracle array
    function getOracleEntry(uint256 index) external returns (uint256 price, uint256 timestamp);

    /// @return amount of price snapshots taken
    function oracleLength() external view returns (uint256);
}

interface IERC721_ {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
}

interface IERC1155_ {
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;
}
