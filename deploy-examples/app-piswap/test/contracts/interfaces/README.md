# Interfaces

## Arguments

Arguments for the PiSwap market interactions, namely `mint`, `burn`, `addLiqudity`, `removeLiquidity`, `swap`, `sellNFT`, `buyNFT` are passed to the according functions using structs.

### Shared Arguments

- kind (`SwapKind`): see [SwapKind](../lib/market/README.md)
- useWeth (`bool`): if true, deposit or withdraw WETH, else use WETH1155
- to (`address`): recipient of the tokens received from a function
- slippage (`uint256`): depending on `SwapKind`, if `GIVEN_IN`, defines the minimum amount of tokens out, if `GIVEN_OUT`, defines the maximum amount of tokens given in
- deadline (`uint256`): if the transaction is mined after the deadline, the transaction is reverted
- userData (`bytes`): for maximum flexibility, allows to pass any additional data that might be required in the future. Empty in current implementation. 

### Mint

```solidity
struct Mint {
    uint256 amount;
    SwapKind kind;
    bool useWeth;
    address to;
    uint256 slippage;
    uint256 deadline;
    bytes userData;
}
```

- amount (`uint256`): amount of ETH in if `kind` is `GIVEN_IN`, amount of Bull and Bear tokens minted if `kind` is `GIVEN_OUT`

### Burn

```solidity
struct Burn {
    uint256 amount;
    SwapKind kind;
    bool useWeth;
    address to;
    uint256 slippage;
    uint256 deadline;
    bytes userData;
}
```
- amount (`uint256`): amount of Bull and Bear tokens burned if `kind` is `GIVEN_IN`, amount of ETH given out if `kind` is `GIVEN_OUT`

### Add Liquidity

```solidity
struct AddLiquidity {
    uint256 amountEth;
    uint256 minLiquidity;
    uint256 maxBull;
    uint256 maxBear;
    bool useWeth;
    address to;
    uint256 deadline;
    bytes userData;
}
```
- amountEth (`uint256`): amount of ETH to add to the liquidity pool
- minLiquidity (`uint256`): minimum amount of liquidity tokens to be minted
- maxBull (`uint256`): maximum amount of Bull tokens to add to the liquidity pool
- maxBear (`uint256`): maximum amount of Bear tokens to add to the liquidity pool

### Remove Liquidity

```solidity
struct RemoveLiquidity {
    uint256 amountLiquidity;
    uint256 minEth;
    uint256 minBull;
    uint256 minBear;
    bool useWeth;
    address to;
    uint256 deadline;
    bytes userData;
}
```
- amountLiquidity (`uint256`): amount of liquidity tokens to burn
- minEth (`uint256`): minimum amount of ETH to withdraw from the liquidity pool
- minBull (`uint256`): minimum amount of Bull tokens to withdraw from the liquidity pool
- minBear (`uint256`): minimum amount of Bear tokens to withdraw from the liquidity pool


### Swap

```solidity
struct Swap {
    uint256 amount;
    TokenType tokenIn;
    TokenType tokenOut;
    SwapKind kind;
    bool useWeth;
    address to;
    uint256 slippage;
    uint256 deadline;
    bytes userData;
}
```
- amount (`uint256`): amount of `tokenIn` in if `kind` is `GIVEN_IN`, amount of `tokenOut` out if `kind` is `GIVEN_OUT`
- tokenIn (`TokenType`): token sold for `tokenOut`, can be `ETH`, `BULL`, `BEAR`
- tokenOut (`TokenType`): token bought with `tokenIn`, can be `ETH`, `BULL`, `BEAR`

### NFTSwap

```solidity
struct NFTSwap {
    uint256 amount;
    bool useWeth;
    address to;
    uint256 slippage;
    uint256 deadline;
    bytes userData;
}
```
- amount (`uint256`): amount of NFTs to buy/sell. Has to be greater than zero. For ERC721 tokens, `amount` has to equal `1`