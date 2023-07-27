// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract Upgradable is UpgradeableBeacon {

    constructor(address _implementation) UpgradeableBeacon(_implementation) {}

}
