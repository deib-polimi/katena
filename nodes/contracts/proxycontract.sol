contract MyContractProxy {
    address public targetContract;

    constructor(address _targetContract) {
        targetContract = _targetContract;
    }

    function upgrade(address _newTargetContract) public {
        targetContract = _newTargetContract;
    }

    fallback() external payable {
        // Forward all calls to the target contract
        address _impl = targetContract;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), _impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
                case 0 { revert(0, returndatasize()) }
                default { return(0, returndatasize()) }
        }
    }
}

// Target contract
contract MyContract {
    uint256 public counter;

    function incrementCounter() public {
        counter++;
    }
}

// Usage example
contract MyUsageContract {
    MyContractProxy public myContractProxy;

    constructor(MyContract _myContract) {
        myContractProxy = new MyContractProxy(address(_myContract));
    }

    function upgradeMyContract(MyContract _newMyContract) public {
        myContractProxy.upgrade(address(_newMyContract));
    }

    function incrementMyCounter() public {
        myContractProxy.incrementCounter();
    }

    function getMyCounter() public view returns (uint256) {
        return MyContract(address(myContractProxy.targetContract)).counter();
    }
}