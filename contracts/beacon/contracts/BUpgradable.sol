// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract BUpgradable is UpgradeableBeacon {
    // just to get the UpgradeableBeacon abi locally
    constructor(address _implementation) UpgradeableBeacon(_implementation) {}

}
