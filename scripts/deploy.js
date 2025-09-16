require("dotenv").config();
const { ethers } = require("hardhat");
const admin = require("firebase-admin");
const path = require("path");

// Load service account JSON for Firebase Admin
const serviceAccount = require(path.resolve(process.env.SERVICE_ACCOUNT_JSON_PATH));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function main() {
  // Deploy the NFT contract
  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const nft = await NFTCollection.deploy();
  await nft.deployed();

  console.log("✅ Contract deployed at:", nft.address);

  // Save contract address in Firestore
  await db.collection("contracts").doc("NFTCollection").set({
    contractAddress: nft.address,
    deployedAt: new Date(),
  });

  console.log("✅ Contract saved in Firestore");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
