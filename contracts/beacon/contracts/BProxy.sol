// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

contract BProxy is BeaconProxy {
    // just to get the BeaconProxy abi locally

    constructor(address _beacon, bytes memory _data) BeaconProxy(_beacon, _data) {}
}