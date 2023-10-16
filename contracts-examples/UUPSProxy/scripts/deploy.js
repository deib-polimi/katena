const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const Proxy = await ethers.getContractFactory("ERC1967");
    const Logic1 = await ethers.getContractFactory("UUPSImplementation1");
    const Logic2 = await ethers.getContractFactory("UUPSImplementation2");

    const imp1 = await Logic1.deploy()
    await imp1.waitForDeployment()

    const imp2 = await Logic2.deploy()
    await imp2.waitForDeployment()


    let ABI = [ "function initialize(uint256 initial_count)" ];
    let iface = new ethers.utils.Interface(ABI);
    const calldata = iface.encodeFunctionData("initialize", [ 43 ])

    const transparentProxy = await Proxy.deploy(
        await imp1.getAddress(),
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