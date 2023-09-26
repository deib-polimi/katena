import { ethers } from "hardhat";
import "hardhat";


async function main () {

  // mainnet addresses
  const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" 
  const approvedMarket = "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
  // local addresses 
  const deployer: string = "0xfA7404986878899719AD1bfB406C8a170A03479E"
  const vaultUpgrader: string = "0x13cdBCDEED68F7C6396084101bC07B706252a275"
  const callsUpgrader: string =  "0xDF5fE7C793607C9Fd2f3b8207EA11A40Caf7C963"
  const pauserRole: string = "0x86Fe37fd17AabBB6E258F6DC3E31CF962F28B922"
  const marketConf: string = "0x0E38B2e431F98e805DF738bd493bfE351Ec0d221"
  const collectionConf: string = "0x4c325307ef14B49e3c560Ab25Bf987eA2C9783b1"
  const allowlister: string = "0xcc69d844D875EC91efDF9f7A66C2Fb068C659DcA"

  const VAULT_UPGRADER = ethers.id("VAULT_UPGRADER");
  console.log("VAULT_UPGRADER",VAULT_UPGRADER)
  
  const CALL_UPGRADER = ethers.id("CALL_UPGRADER");
  console.log("CALL_UPGRADER",CALL_UPGRADER)

  console.log("Deploying from", deployer);

  console.log("Deploying with these args:", [
    allowlister,
    pauserRole,
    vaultUpgrader,
    callsUpgrader,
    marketConf,
    collectionConf,
    weth,
  ]);

  const PK = "0x6864F076608d4b11aF4F505D489734b56D8dD216"
  console.log("balance of account", await ethers.provider.getBalance(PK))
  const ProtocolFac = await ethers.getContractFactory("HookProtocol")
  const protocol = await ProtocolFac.deploy(
      allowlister,
      pauserRole,
      vaultUpgrader,
      callsUpgrader,
      marketConf,
      collectionConf,
      weth,
      {from: deployer}
    );
  await protocol.waitForDeployment()
  console.log("..:: PROTOCOL CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))

  const protocolImpl = await ethers.getContractAt(
    "HookProtocol",
    await protocol.getAddress()
  );

  const SoloVaultFac = await ethers.getContractFactory("HookERC721VaultImplV1")
  const soloVault = await SoloVaultFac.deploy({from: deployer});
  await soloVault.waitForDeployment();
  console.log("..:: SOLOVAULT CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))

  const HookERC721MultiVaultImplV1Fac = await ethers.getContractFactory("HookERC721MultiVaultImplV1")
  const multiVault = await HookERC721MultiVaultImplV1Fac.deploy({from: deployer});
  await multiVault.waitForDeployment();
  console.log("..:: MULTIVAULT CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))

  const HookUpgradeableBeaconFac = await ethers.getContractFactory("HookUpgradeableBeacon")
  const multiVaultBeacon = await HookUpgradeableBeaconFac.deploy(
      await multiVault.getAddress(),
      await protocol.getAddress(),
      VAULT_UPGRADER,
      {from: deployer});
  await multiVaultBeacon.waitForDeployment();
  console.log("..:: MULTIVAULTBEACON CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))


  const soloVaultBeacon = await HookUpgradeableBeaconFac.deploy(
      await soloVault.getAddress(),
      await protocol.getAddress(),
      VAULT_UPGRADER,
      {from: deployer});
  await soloVaultBeacon.waitForDeployment();
  console.log("..:: SOLOVAULTBEACON CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))

  const HookERC721VaultFactoryFac = await ethers.getContractFactory("HookERC721VaultFactory")
  const vaultFactory = await HookERC721VaultFactoryFac.deploy(
    await protocol.getAddress(),
    await soloVaultBeacon.getAddress(),
    await multiVaultBeacon.getAddress(),
    {from: deployer});
  await vaultFactory.waitForDeployment();
  console.log("..:: VAULTFACTORY CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))

  if (vaultUpgrader === deployer) {
    const vfSet = await protocolImpl.setVaultFactory(await vaultFactory.getAddress());
    console.log("Set vault factory onto protocol with hash: ", vfSet.hash);
  }

  // const font1 = ethers.deployContract("Font1", {
  //   from: deployer,
  //   args: [],
  //   log: true,
  //   // maxPriorityFeePerGas: "2000000000",
  //   // maxFeePerGas: "50000000000",
  //   autoMine: true,
  // });
  // const font2 = ethers.deployContract("Font2", {
  //   from: deployer,
  //   args: [],
  //   log: true,
  //   // maxPriorityFeePerGas: "2000000000",
  //   // maxFeePerGas: "50000000000",
  //   autoMine: true,
  // });
  // const font3 = ethers.deployContract("Font3", {
  //   from: deployer,
  //   args: [],
  //   log: true,
  //   // maxPriorityFeePerGas: "2000000000",
  //   // maxFeePerGas: "50000000000",
  //   autoMine: true,
  // });
  const Font1Fac = await ethers.getContractFactory("Font1")
  const font1 = await Font1Fac.deploy();
  font1.waitForDeployment()

  const Font2Fac = await ethers.getContractFactory("Font2")
  const font2 = await Font2Fac.deploy();
  font2.waitForDeployment()

  const Font3Fac = await ethers.getContractFactory("Font3")
  const font3 = await Font3Fac.deploy();
  font3.waitForDeployment()

 
  const TokenURIFac = await ethers.getContractFactory(
      "TokenURI",
      { libraries: {
        Font1: await font1.getAddress(),//"0x1Ac06Ef3cda4dC2CB30A866090041D3266c33d45",
        Font2: await font2.getAddress(),//"0xfa10218700bFd179DE800a461C98357b39525f38",
        Font3: await font3.getAddress(), //"0x4C6eDA9CBb9B31152f3f002CAe5E3eF805Ad19f9",
      }
    }
  )
  const tokenURI = await TokenURIFac.deploy({
    from: deployer,  
  });
  await tokenURI.waitForDeployment()
  console.log("..:: TOKENURI CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))

  const HookCoveredCallImplV1Fac = await ethers.getContractFactory(
    "HookCoveredCallImplV1",
    {
      libraries: {
          TokenURI: await tokenURI.getAddress(),
      }
    }
    )
  const callV1 = await HookCoveredCallImplV1Fac.deploy({
    from: deployer, 
  });
  await callV1.waitForDeployment()
  console.log("..:: callV1 CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))


  const HookUpgradeableBeacon1Fac = await ethers.getContractFactory("HookUpgradeableBeacon")
  const callBeacon = await HookUpgradeableBeacon1Fac.deploy(
    "0x3648080307faC2EE51A01463e47B9ca076DC14A1",
    await protocol.getAddress(),
    CALL_UPGRADER,
    { from: deployer }
  );
  await callBeacon.waitForDeployment()
  console.log("..:: callBeacon CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))

  const HookCoveredCallFactoryFac = await ethers.getContractFactory("HookCoveredCallFactory")
  const callFactory = await HookCoveredCallFactoryFac.deploy(
    await protocol.getAddress(),
    await callBeacon.getAddress(),
    approvedMarket,
    { from: deployer }
  );
  await callFactory.waitForDeployment()
  console.log("..:: callFactory CONTRACT DEPLOYED", await ethers.provider.getBalance(PK))

  if (deployer === callsUpgrader) {
    const cfSet = await protocolImpl.setCoveredCallFactory(await callFactory.getAddress());
    console.log("Set call factory onto protocol with hash: ", cfSet.hash);
  }

  if (deployer == pauserRole) {
    // Will need to pause outside of this context
    // for the process to work with mainnet deploys
    const Signer = await ethers.getSigner(deployer)
    protocolImpl.connect(Signer).pause();
  }

  console.log("..:: DEPLOY FINISHED")
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

