
const hre = require("hardhat");

async function main() {
  // Get a Flipper contract on already deployed address
  const flipperAddress = (process.env.FLIPPER_ADDRESS) ? process.env.FLIPPER_ADDRESS :  "0x0230135fDeD668a3F7894966b14F42E65Da322e4";
  
  const alice = await hre.reef.getSignerByName("alice")
  const flipper = await hre.reef.getContractAt("Flipper", flipperAddress, alice);

  // Call flip()
  console.log("Current value:", await flipper.get());
  await flipper.flip();
  console.log("New value after flip():", await flipper.get());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
