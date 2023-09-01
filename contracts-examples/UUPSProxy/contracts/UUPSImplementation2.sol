// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "./UUPSImplementation1.sol";

contract UUPSImplementation2 is UUPSImplementation1 {
    
    function getContractVersion() pure external override returns(uint){
        return 2;
    }

    function substract(uint factor) external {
        count = count - factor;
    }
}

