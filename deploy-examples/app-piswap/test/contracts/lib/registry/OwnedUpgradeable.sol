//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

contract OwnedUpgradeable is Initializable, ContextUpgradeable {
    address private _owner;
    address private _proposedOwner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event OwnershipProposed(address indexed currentOwner, address indexed proposedOwner);

    /**
     * @dev Initializes the contract setting the initial owner.
     */
    function __Owned_init(address _initialOwner) internal onlyInitializing {
        __Context_init_unchained();
        __Owned_init_unchained(_initialOwner);
    }

    function __Owned_init_unchained(address _initialOwner) private onlyInitializing {
        _owner = _initialOwner;
        emit OwnershipTransferred(address(0), _initialOwner);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() virtual {
        require(_msgSender() == _owner, "Owned: ONLY_OWNER");
        _;
    }

    /**
     * @dev propeses a new owner
     * Can only be called by the current owner.
     */
    function proposeOwner(address payable _newOwner) external onlyOwner {
        _proposedOwner = _newOwner;
        emit OwnershipProposed(_owner, _proposedOwner);
    }

    /**
     * @dev claims ownership of the contract
     * Can only be called by the new proposed owner.
     */
    function claimOwnership() external {
        require(_msgSender() == _proposedOwner, "Owned: not proposed owner");
        emit OwnershipTransferred(_owner, _proposedOwner);
        _owner = _proposedOwner;
    }

    uint256[50] private __gap;
}
