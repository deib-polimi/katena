// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

contract IBeaconProxy  is BeaconProxy {
    constructor(address _beacon, bytes memory _data) BeaconProxy(_beacon, _data) {}
}