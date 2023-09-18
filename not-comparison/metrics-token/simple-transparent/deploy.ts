import { ethers, upgrades } from "hardhat";

async function main() {
  // WITH OPENZZEPELING HARDHAT PLUGINS 

  const Logic1 = await ethers.getContractFactory("Implementation1");
  const Logic2 = await ethers.getContractFactory("Implementation2");
  

  const imp = await upgrades.deployProxy(Logic1,[42],{initializer:'initialize'});
  await imp.waitForDeployment();

  const imp_upgraded = await upgrades.upgradeProxy(await imp.getAddress(), Logic2)
  await imp_upgraded.waitForDeployment();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1; 
});
