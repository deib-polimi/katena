// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ICallee.sol";

contract CallerConstructor {
    ICallee private callee;
    int counter;

    constructor(address _newCallee, int _counter) {
        callee = ICallee(_newCallee);   
        counter = _counter;
    }
    
    function getCallee() external view returns(address) {
        return address(callee);
    }

    function call(int _number) external view returns(int) {
        return callee.increment(_number);
    }

}