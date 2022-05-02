// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Destroy {
    function increment(int num) external pure returns(int result){
        return 1 + num;
    }

    function destroySmartContract(address payable _to) public {
        selfdestruct(_to);
    }
}
