// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

import "../lib/Types.sol";

interface IUpgradeTest {
    function test() external pure returns (uint256);
}

abstract contract UpgradeTest is IUpgradeTest {
    function initialize(
        address,
        uint256,
        NFTType
    ) external {}
}

contract UpgradeTestA is UpgradeTest {
    function test() public pure returns (uint256) {
        return 1;
    }
}

contract UpgradeTestB is UpgradeTest {
    function test() public pure returns (uint256) {
        return 2;
    }
}
