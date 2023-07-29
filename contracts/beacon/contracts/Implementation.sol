// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Implementation is Initializable {
    uint  public version;

    function initialize(uint _version) public initializer {
        version = _version;
    }
    
    function getContractNameWithVersion() view external returns(uint){
        return version;
    }
}

