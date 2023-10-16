// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;


import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract UUPSImplementation1 is Initializable, UUPSUpgradeable, OwnableUpgradeable  {
    uint public count;

    ///@dev required by the OZ Initializable module
    function initialize(uint initial_count) public initializer {
        count = initial_count;

        /**
        * @dev Initializes the contract setting the deployer as the initial owner.
        */
        __Ownable_init();
    }

    /**
     * @dev The auth method for thid contract will be the ownership of the imp
     * onlyOwner is a modifier thath  throws an error
     * if called by any account other than the owner.
     * 
     */

    ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {} 

    function getOwner() public view virtual  returns (address) {
        return owner();
    }

    function getContractVersion() virtual external pure returns(uint){
        return 1;
    }

    function getCount() external view returns(uint){
        return count;
    }

    function add(uint factor) external {
        count = count + factor;
    }
}

