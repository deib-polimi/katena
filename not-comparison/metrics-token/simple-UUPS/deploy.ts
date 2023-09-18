import { ethers, upgrades } from "hardhat";

async function main() {
  // the logic contracts are UUPSUpgradeable
  const Logic1 = await ethers.getContractFactory("UUPSImplementation1");
  const Logic2 = await ethers.getContractFactory("UUPSImplementation2");
  
  // ERC1967Proxy
  const imp = await upgrades.deployProxy(Logic1,[42],{initializer:'initialize'});
  await imp.waitForDeployment();


  const imp_upgraded = await upgrades.upgradeProxy(await imp.getAddress(), Logic2)
  await imp_upgraded.waitForDeployment();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
