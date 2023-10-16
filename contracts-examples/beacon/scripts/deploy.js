const hre = require("hardhat");
const ethers = hre.ethers;


async function main() {
    const BeaconProxy = await ethers.getContractFactory("BeaconProxy");
    const Logic1 = await ethers.getContractFactory("Implementation1");
    const Logic2 = await ethers.getContractFactory("Implementation2");
    const UpgradeableBeacon = await ethers.getContractFactory("UpgradeableBeacon");

    const beacon1 = await Logic1.deploy()
    await beacon1.waitForDeployment()
    const beaconAddress = await beacon1.getAddress()

    const beacon2 = await Logic2.deploy()
    await beacon2.waitForDeployment()

    const upgradeableBeacon = await UpgradeableBeacon.deploy(beaconAddress)
    await upgradeableBeacon.waitForDeployment()

    const utf8EncodeText = new TextEncoder();
    const str = '';
    const byteArray = utf8EncodeText.encode(str);


    let ABI = [ 'function initialize(uint256 initial_count)' ];
    let iface = new ethers.Interface(ABI);
    const calldata = iface.encodeFunctionData("initialize", [ 43 ])

    const proxy1 = await BeaconProxy.deploy(beaconAddress,b)
    await proxy1.waitForDeployment()
    const proxy2 = await BeaconProxy.deploy(beaconAddress,b)
    await proxy2.waitForDeployment()
    const proxy3 = await BeaconProxy.deploy(beaconAddress,b)
    await proxy3.waitForDeployment()
    const proxy4 = await BeaconProxy.deploy(beaconAddress,b)
    await proxy4.waitForDeployment()

};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });