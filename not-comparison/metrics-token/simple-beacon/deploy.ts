import {  ethers, upgrades } from "hardhat";

async function main() {
  const Logic1 = await ethers.getContractFactory("Implementation1");
  const Logic2 = await ethers.getContractFactory("Implementation2");
  
  const beacon = await upgrades.deployBeacon(Logic1);
  await beacon.waitForDeployment();
  const adrr = await beacon.getAddress();

  // WITH OPENZZEPELING HARDHAT PLUGINS 
  
  const init = [40]

  const beaconProxy1 = await upgrades.deployBeaconProxy(adrr, Logic1, init);
  await beaconProxy1.waitForDeployment();
  const beaconProxy2 = await upgrades.deployBeaconProxy(adrr, Logic1, init);
  await beaconProxy2.waitForDeployment();
  const beaconProxy3 = await upgrades.deployBeaconProxy(adrr, Logic1, init);
  await beaconProxy3.waitForDeployment();
  const beaconProxy4 = await upgrades.deployBeaconProxy(adrr, Logic1, init);
  await beaconProxy4.waitForDeployment();

  const upgradedBeacon = await upgrades.upgradeBeacon(adrr, Logic2);

}
    
    
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});