# PiSwapMarket Libraries

## Math

The [UniSwap Math library](https://github.com/Uniswap/v2-core/blob/master/contracts/libraries/Math.sol) is used to calculate the square root of a number. The `min(x,y)` function was removed.

## SwapKind

The swap kind defines whether the amount defined when `minting` or `burning` Bull and Bear tokens or when `swapping` tokens with the liquidity pool is the amount of tokens sent by the user (given in) or the amount of tokens received by the user (given out). The swap kind is defined using an enum:

```solidity
enum SwapKind {
    GIVEN_IN,
    GIVEN_OUT
}
```

## Oracle

To ensure that the NFT value is resilient to market manipulation, the market contract is utilizing an averaging oracle. In every block a trade happens that changes the value of the NFT, the current value of the NFT is appended to the oracle array of price entries. Using the library, the average price over the last n blocks where the price was registered can be calculated. The timestamp at which the price is registered is stored alongside the price. This allows for more flexibility in case the average price will be calculated in another way in the future (e.g., TWAP).

## PiSwap Library

The `PiSwapLibrary` contains all math formulas for the market contract:
1. token formula that calculates the total supply based on the deposited eth and vice versa
2. `mint`, `burn` and `swap` functions that calculate the amount of tokens minted, burned or swapped based on swap kind
3. amount of locked eth that can be used for the NFT swap