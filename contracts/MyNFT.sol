// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// // Remixで検証用
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/Counters.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
 
contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // set contract name and ticker.
    constructor() ERC721("Contract Name", "MNFT") {}

    //get the current supply of tokens
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // for opensea collection
    function contractURI() public pure returns (string memory) {
        return "https://ipfs.io/ipfs/QmYWF49H94cmqcsJvFTrywZFoytt5ovtqNRu3hhenVWhtt";
    }

    function mintItem(address player, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 myNFTId = _tokenIds.current();
        _mint(player, myNFTId);
        _setTokenURI(myNFTId, tokenURI);
        return myNFTId;
    }

}