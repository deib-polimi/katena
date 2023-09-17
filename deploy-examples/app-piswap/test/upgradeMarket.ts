
import { ethers, network } from 'hardhat';

let registryAddress: string;
if (network.name === 'localhost') {
  registryAddress = '0x8adb8e9dddae48eddceb47a459869c84202f71e0';
} else {
  throw new Error('unsupported network');
}

async function main(): Promise<void> {
  const [deployer] = await ethers.getSigners();
  console.log('Upgrading contract with account:', deployer.address);
  const market = await (await ethers.getContractFactory('PiSwapMarket')).deploy();
  const registry = await ethers.getContractAt('PiSwapRegistry', registryAddress, deployer);
  const tx = await registry.upgradeTo(market.address);
  console.log(tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
