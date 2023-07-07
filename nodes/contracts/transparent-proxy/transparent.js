

const { ethers, upgrades } = require("hardhat");


async function main() {
    const TransparentProxyPatternV1 = await ethers.getContractFactory("TransparentProxyPatternV1");
    const transparentProxyPatternV1 = await upgrades.deployProxy(
        TransparentProxyPatternV1, [], {kind: 'transparent', unsafeAllow: ['constructor']}
    );
    
    await transparentProxyPatternV1.deployed();
    console.log(`Transparent Proxy Pattern V1 is deployed to proxy address: ${transparentProxyPatternV1.address}`);
    
    let versionAwareContractName = await transparentProxyPatternV1.getContractNameWithVersion();
    
    console.log(`Proxy Pattern and Version: ${versionAwareContractName}`);
    
    const TransparentProxyPatternV2 = await ethers.getContractFactory("TransparentProxyPatternV2");
    
    const upgraded = await upgrades.upgradeProxy(
        transparentProxyPatternV1.address, 
        TransparentProxyPatternV2, 
        {kind: 'transparent', unsafeAllow: ['constructor'], call: 'initialize'}
    );
    
    console.log(`Transparent Proxy Pattern V2 is upgraded in proxy address: ${upgraded.address}`);
    versionAwareContractName = await upgraded.getContractNameWithVersion();
    console.log(`Proxy Pattern and Version: ${versionAwareContractName}`);
}

main().catch(
    (error) => {console.error(error);process.exitCode = 1;}
    );