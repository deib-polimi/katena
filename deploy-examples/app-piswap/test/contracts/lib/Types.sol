// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

enum TokenType {
    ETH,
    BULL,
    BEAR,
    LIQUIDITY
}

enum NFTType {
    ERC721,
    ERC1155
}

library TokenTypeLib {
    /// @notice calculate tokenId of a given type
    /// @dev called by markets
    /// @param _type token type for market
    /// @return 0 if token type is ETH, else calculated token type based on address
    function id(TokenType _type) internal view returns (uint256) {
        return id(_type, address(this));
    }

    function id(TokenType _type, address _market) internal view returns (uint256) {
        if (_type == TokenType.ETH) {
            return 0;
        }
        return uint256(keccak256(abi.encodePacked(block.chainid, _market, _type)));
    }

    /// @notice check if token type is ETH
    function isEth(TokenType _type) internal pure returns (bool) {
        return _type == TokenType.ETH;
    }

    /// @notice if type is BULL, return BEAR and vice versa
    function invert(TokenType _type) internal pure returns (TokenType) {
        assert(_type == TokenType.BULL || _type == TokenType.BEAR);
        return _type == TokenType.BULL ? TokenType.BEAR : TokenType.BULL;
    }
}
