//SPDX-License-Identifier:AGPL-3.0-only
pragma solidity 0.8.11;

struct PriceSnapshot {
    uint216 price;
    uint40 timestamp;
}

library OracleLib {
    /// @dev register a new price and append to price snapshot array
    function registerPrice(PriceSnapshot[] storage oracle, uint256 price) internal {
        oracle.push(PriceSnapshot({price: uint216(price), timestamp: uint40(block.timestamp)}));
    }

    /// @dev average price over the last n amount of entries
    function avgPrice(PriceSnapshot[] storage oracle, uint256 amount) internal view returns (uint256) {
        uint256 length = oracle.length;
        require(length >= amount, "Oracle#avgPrice: INSUFFICIENT_DATA");
        uint256 total = 0;
        for (uint256 i = length - amount; i < length; i++) {
            total += oracle[i].price;
        }
        return total / amount;
    }
}
