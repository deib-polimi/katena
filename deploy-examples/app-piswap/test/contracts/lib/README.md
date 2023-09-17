# Libraries

This directory contains libraries shared by the registry and market contract. Libraries only used by the respective contract are found in the [market](./market/README.md) and [registry](./registry/README.md)

## NFT Type

PiSwap supports two types of tokens, the non-fungible token standard [ERC-721](https://eips.ethereum.org/EIPS/eip-721) and the multi token standard [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155). In case of an ERC1155 market, the market contract can buy or sell multiple tokens of a specific token id, as long as there is sufficient liquidity. 

Internally, both types are represented using an enum
```solidity
enum NFTType {
    ERC721,
    ERC1155
}
```

## Token Type

There are 4 token types used with PiSwap markets which are represented using an enum

```solidity
enum TokenType {
    ETH,
    BULL,
    BEAR,
    LIQUIDITY
}
```
Each market has their own `BULL`, `BEAR` and `LIQUIDITY` tokens. Only the `ETH` token is shared across all markets.

### TokenTypeLib

This library makes using the token type enum more convenient to use. The token ids (except `ETH`) for are calculated as followed

```solidity
keccak256(chainId, marketAddress, TokenType)
```

`ETH` uses the token id `0`.

To get the id of a token within a market contract the helper function `.id()` can be used.
```solidity
uint256 bullId = TokenType.BULL.id();
```

To get the token id for another market contract the helper function `.id(address market)` can be used.
```solidity
uint256 bullId = TokenType.BULL.id(address(otherMarket));
```

Both functions return `0` if `TokenType.ETH` is passed as an argument.

To easily check whether a token type is ETH the function `.isEth()` is included in the library
```solidity
if (tokenIn.isEth()) {
    // ...
}
```

Lastly, when handling reserves of the liquidity pool, it's sometimes necessary to swap token types between the `BULL` and `BEAR` token type. The `.invert()` helper function is included to make this more convenient to use.

```
TokenType otherToken = tokenIn.invert();
```
The helper function can only swap Bull and Bear tokens and reverts when passing the `ETH` or `LIQUIDITY` token type.