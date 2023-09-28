var ethers = require('ethers');

async function main() {
    const BeaconProxy = await ethers.getContractFactory("BeaconProxy");
    const Logic1 = await ethers.getContractFactory("Implementation1");
    const Logic2 = await ethers.getContractFactory("Implementation2");
    const UpgradeableBeacon = await ethers.getContractFactory("UpgradeableBeacon");


    const beacon1 = await ethers.deployContract("Implementation1");
    await beacon1.waitForDeployment()
    const beaconAddress = await beacon1.getAddress()

    const beacon2 = await ethers.deployContract("Implementation2");
    await beacon2.waitForDeployment()

    const upgradeableBeacon = await UpgradeableBeacon.deploy(beaconAddress)
    await upgradeableBeacon.waitForDeployment()


    console.log(beacon1.functions.getContractVersion())

    let ABI = [ "function initialize(uint256 initial_count)" ];
    let iface = new ethers.Interface(ABI);
    const calldata = iface.encodeFunctionData("initialize", [ 43 ]);

    const proxy1 = await BeaconProxy.deploy(beaconAddress,null)
    await proxy1.waitForDeployment()
    const proxy2 = await BeaconProxy.deploy(beaconAddress,null)
    await proxy2.waitForDeployment()
    const proxy3 = await BeaconProxy.deploy(beaconAddress,null)
    await proxy3.waitForDeployment()
    const proxy4 = await BeaconProxy.deploy(beaconAddress,null)
    await proxy4.waitForDeployment()

};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });