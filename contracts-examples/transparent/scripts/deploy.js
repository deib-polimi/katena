const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
    const Logic1 = await ethers.getContractFactory("Implementation1");
    const Logic2 = await ethers.getContractFactory("Implementation2");
    const TransparentUpgradableProxy = await ethers.getContractFactory("TransparentUpgradableProxy");

    const proxadm = await ProxyAdmin.deploy()
    await proxadm.waitForDeployment()

    const imp1 = await Logic1.deploy()
    await imp1.waitForDeployment()

    const imp2 = await Logic2.deploy()
    await imp2.waitForDeployment()


    let ABI = [ "function initialize(uint256 initial_count)" ];
    let iface = new ethers.utils.Interface(ABI);
    const calldata = iface.encodeFunctionData("initialize", [ 43 ])

    const transparentProxy = await TransparentUpgradableProxy.deploy(
        await imp1.getAddress(),
        await proxadm.getAddress(),
        calldata
    )
    await transparentProxy.waitForDeployment()
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });