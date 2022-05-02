// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ICallee.sol";

contract CalleeLocalParams {
    int public a;
    string public b;
    address public c;

    constructor(address _c, int _a, string memory _b) {
        a = _a;
        b = _b;
        c = _c;
    }

    function increment(int num) external pure returns(int result){
        return 1 + num;
    }
}
