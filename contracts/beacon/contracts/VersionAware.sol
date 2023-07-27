// SPDX-License-Identifier: Unlicense

import "@openzeppelin/contracts/proxy/beacon/IBeacon.sol";

pragma solidity ^0.8.0;

interface IVersionAware {
    function getContractNameWithVersion() external view returns(uint);
}
    
contract Beacon is IBeacon, IVersionAware {
    uint  public versionAwareContract;

    constructor() IBeacon() {
        versionAwareContract = 1;
    }
    
    function implementation() view external returns (address adrr)  {
        return address(this);
    }

    function getContractNameWithVersion() external view returns(uint){
        return versionAwareContract;
    }
}

