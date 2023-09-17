# PiSwap core contracts

The PiSwap core contracts consist of the Registry and Market contract. The contracts are EVM agnostic, so the protocol can be deployed on Ethereum L1, side/commit chains like Polygon, other blockchains implementing the EVM like Avalanche and EVM compliant L2 solutions like optimistic rollups and zkEVM. The ERC20 wrapped version of ETH also known as WETH, was chosen as the base token that is used to evaluate the value of NFTs, providing liquidity or trading on markets for the following reasons:

1. ETH is the most decentralized token on the Ethereum blockchain making WETH as decentralized as possible
2. WETH is available on basically all other EVM-compliant chains using bridges, whereas ETH isn't
3. WETH is the most widely used token to buy and sell NFTs on traditional NFT marketplaces like OpenSea
\
&nbsp;

## PiSwapRegistry

---

The registry contract implements the [ERC1155 multi token standard](https://eips.ethereum.org/EIPS/eip-1155) and has 2 primary functions:

1. Deploying new markets for NFTs
2. Managing the Bull, Bear and Liquidity tokens for all markets represented by an ERC1155 token id

Additionally the registry contract is upgradeable to allow protocol upgrades in the future.
\
&nbsp;

### Deploying new markets

When creating a market for a new NFT, the registry contract deploys a new PiSwap market contract. The deployed contract is a [beacon proxy](https://docs.openzeppelin.com/contracts/3.x/api/proxy#BeaconProxy). The registry contract holds the address to the implementation of the PiSwapMarket enabling the upgradeability of all market contracts.

## <img src="../img/architecture.png" alt="PiSwap architecture">

### Bull, Bear and Liquidity tokens

Each market has their own Bull, Bear and Liquidity tokens. Instead of deploying 3 ERC20 tokens per market, all tokens are managed by the registry contract. All tokens have 18 decimals. The token id is determined by the hash of the chain id, market address and token type (Bull, Bear, Liquidity).

```solidity
keccak256(chainId, marketAddress, TokenType)
```

This avoids collisions between all markets and tokens even if the protocol is deployed on a different chain.

### WETH1155

To make WETH, the base token the Bull and Bear tokens are traded against, integrate more easily with the market contract, WETH is wrapped in the registry contract into an ERC1155 token called WETH1155. The token id `0` is reserved for WETH1155. The market contracts use WETH1155 natively but can also wrap and unwrap WETH1155 into WETH automatically if required, improving user experience.

\
&nbsp;

# Specification

This section describes the publicly callable functions of the PiSwapRegistry and PiSwapMarket contracts.

## PiSwapRegistry

```solidity
function WETH() external view returns (address);
```
Returns the address of the WETH contract for the chain the protocol is deployed on.

```solidity
function createMarket(address tokenAddress, uint256 tokenId) external returns (address market);
```
Creates a new market for a specific NFT identified by the NFT contract address and token id. The function returns the address of the newly created market.

```solidity
function mint(address to, uint256 amount, TokenType tokenType) external;
```
Mints new bull, bear or liquidity tokens to a specific address. Only callable by markets.

```solidity
function burn(address from, uint256 amount, TokenType tokenType) external;
```
Burns bull, bear or liquidity tokens from a specific address. Only callable by markets.

```solidity
function deposit(uint256 amount) external;
```
Deposits WETH into the registry contract and returns an equal amount of WETH1155 to the sender.

```solidity
function withdraw(uint256 amount, address to) external;
```
Burns WETH1155 from the sender and returns an equal amount of WETH to the specified address.

```solidity
function beneficiary() external view returns (address);
```
Returns the address of the beneficiary for the protocol fee.

```solidity
function fee() external view returns (uint256);
```
Returns the protocol fee in myriad taken when Bull and Bear tokens are minted or burned.

```solidity
function oracleLength() external view returns (uint256);
```
Returns the amount of blocks taken into consideration for the NFT value oracle.

```solidity
function getMarketForNFT(address tokenAddress, uint256 tokenId) external view returns (address market);
```
Returns the market address for a specific NFT identified by the NFT contract address and token id. Reverts if market does not exist.

```solidity
function marketExists(address tokenAddress, uint256 tokenId) external view returns (bool);
```
Returns true if a market exists for a specific NFT identified by the NFT contract address and token id.

## PiSwapMarket

The specification of the arguments passed to the PiSwapMarket functions can be found [here](./interfaces/README.md).

```solidity
function registry() external returns (address);
```
Returns the contract address for the registry contract.

```solidity
function underlyingNFT() external view returns (address tokenAddress, uint256 tokenId, NFTType nftType);
```
Returns contract address, token id and NFT type (ERC721 | ERC1155) for the underlying NFT.

```solidity
function mint(Arguments.Mint calldata args) external returns (uint256 amountIn, uint256 amountOut);
```
Mints new Bull and Bear tokens according to the token formula as described in the whitepaper. Returns amount of ETH given in and amount of Bull and Bear tokens minted.

```solidity
function burn(Arguments.Burn calldata args) external returns (uint256 amountIn, uint256 amountOut);
```
Burns Bull and Bear tokens according to the token formula as described in the whitepaper. Returns amount of Bull and Bear given in to burn and amount of ETH returned.

```solidity
function addLiquidity(Arguments.AddLiquidity calldata args)
    external
    returns (
        uint256 liquidityMinted,
        uint256 amountBull,
        uint256 amountBear
    );
```
Adds liquidity to the liquidity pool. Returns the amount of liquidity tokens minted to the liquidity provider, and amount of bull and bear tokens provided to the liquidity pool. The amount of ETH provided to the liquidity pool is passed as an argument and does not change, therefore it's not returned. The initial liquidity provider sets the initial NFT value using the amount of Bull and Bear tokens provided. All subsequent liquidity providers provide bull and bear tokens according to the current ratio in the liquidity pool.

```solidity
function removeLiquidity(Arguments.RemoveLiquidity calldata args)
    external
    returns (
        uint256 amountEth,
        uint256 amountBull,
        uint256 amountBear
    );
```
Burns liquidity tokens from a liquidity provider and returns the proportionate amount of ETH, Bull and Bear tokens to the provider.

```solidity
function swap(Arguments.Swap calldata args) external returns (uint256 amountIn, uint256 amountOut);
```
Swaps one token into another. Liquidity tokens cannot be swapped with the liquidity pool. Bull and Bear tokens can be swapped with ETH and with each other. Returns amount in for the token in and amount out for the token out. Token in and token out are defined in the `args` struct.

```solidity
function sellNFT(Arguments.NFTSwap calldata args) external returns (bool);
```
Sells an NFT for ETH with the contract for the current value set by the market. Returns true on success.

```solidity
function buyNFT(Arguments.NFTSwap calldata args) external returns (bool);
```
Buys an NFT held by the contract for ETH for the current value set by the market. Returns true on success.

```solidity
function mintOutGivenIn(uint256 amountIn) external view returns (uint256 amountOut);
```
Returns the amount of Bull and Bear tokens minted given amount of ETH.

```solidity
function mintInGivenOut(uint256 amountOut) external view returns (uint256 amountIn);
```
Returns the amount of ETH in given the amount of Bull and Bear tokens to mint.

```solidity
function burnOutGivenIn(uint256 amountIn) external view returns (uint256 amountOut);
```
Returns the amount of ETH returned given an amount of Bull and Bear tokens to burn.

```solidity
function burnInGivenOut(uint256 amountOut) external view returns (uint256 amountIn);
```
Returns the amount of Bull and Bear tokens to burn given the desired amount of ETH to

```solidity
function swapOutGivenIn(
    uint256 amountIn,
    TokenType tokenIn,
    TokenType tokenOut
) external view returns (uint256 amountOut);
```
Returns the amount of `tokenOut` for a given amount of `tokenIn` when swapping tokens.

```solidity
function swapInGivenOut(
    uint256 amountOut,
    TokenType tokenIn,
    TokenType tokenOut
) external view returns (uint256 amountIn);
```
Returns the amount of `tokenIn` required to receive a given amount of `tokenOut` when swapping tokens.

```solidity
function lockedEth() external view returns (uint256);
```
Returns the amount of locked ETH available that can be used to swap NFTs.

```solidity
function nftValueAccumulated() external view returns (uint256);
```
Returns the current value of the NFT used by the contract when buying or selling NFTs. This value is accumulated over a period of time to make it more resilient to manipulation.

```solidity
function swapEnabled() external view returns (bool);
```
Returns true if the amount of locked ETH exceeds available to swap NFTs exceeds the current NFT value for a single NFT.

```solidity
function nftValueAvg(uint256 amount) external view returns (uint256);
```
Returns the average NFT value over the last `amount` of blocks. This function is meant to be used by other smart contracts integrating with the PiSwap protocol.

```solidity
function nftValue() external view returns (uint256);
```
Returns the most recent NFT price. This value is less resilient to manipulation.

```solidity
function getOracleEntry(uint256 index) external returns (uint256 price, uint256 timestamp);
```
Get an entry from the oracle array. Returns the price at the returned timestamp.

```solidity
function oracleLength() external view returns (uint256);
```
Returns the total amount of NFT value entries in the oracle.
