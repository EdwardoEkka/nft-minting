// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721URIStorage, Ownable {
    uint256 public tokenCounter = 0;

    // Constructor sets the NFT name and symbol, and makes deployer the owner
    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    // Mint a new NFT to 'recipient' with metadata URI 'tokenURI'
    // Only owner can call this function
    // Returns the minted token ID
    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newItemId = tokenCounter;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter++;
        return newItemId;
    }
}
