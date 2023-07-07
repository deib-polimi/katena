// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.18;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {VersionAware} from "./VersionAware.sol";


contract BeaconProxyPatternV1 is Initializable, VersionAware {
    
    constructor() {
        _disableInitializers();
    }
    
    function initialize() external initializer {
        versionAwareContractName = "Beacon Proxy Pattern: V1";
    }
    
    function getContractNameWithVersion() public pure override returns (string memory){
        return "Beacon Proxy Pattern: V1";
    }
}