const { ethers } = require("hardhat");

async function main() {
  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const nft = await NFTCollection.deploy();
  await nft.deployed();

  console.log("✅ Contract deployed at:", nft.address);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
