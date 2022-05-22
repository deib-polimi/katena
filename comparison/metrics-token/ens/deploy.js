const hre = require("hardhat");
const ethers = hre.ethers;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
async function main() {
    const ENSRegistry = await ethers.getContractFactory("ENSRegistry")
    const FIFSRegistrar = await ethers.getContractFactory("FIFSRegistrar")
    const ReverseRegistrar = await ethers.getContractFactory("ReverseRegistrar")
    const PublicResolver = await ethers.getContractFactory("PublicResolver")

    const ens = await ENSRegistry.deploy()
    await ens.deployed()
    const resolver = await PublicResolver.deploy(ens.address, ZERO_ADDRESS);
    await resolver.deployed()
    const registrar = await FIFSRegistrar.deploy(ens.address, namehash.hash(tld));
    await registrar.deployed()
    const reverseRegistrar = await ReverseRegistrar.deploy(ens.address, resolver.address);
    await reverseRegistrar.deployed()
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });