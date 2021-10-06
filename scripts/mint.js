const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");
require('dotenv').config()

const MNEMONIC = process.env.MNEMONIC
const API_KEY = process.env.NODE_KEY

//* Remember to write the nft address in manually after deploying the contract
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`;
// const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`

//*Parse the contract artifact for ABI reference.
let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/MyNFT.json"));
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi;

async function main() {
    try {
        //*define web3, contract and wallet instances
        const provider = new HDWalletProvider(
            MNEMONIC,
            MUMBAI,
        )

        const web3Instance = new web3(provider);

        const nftContract = new web3Instance.eth.Contract(
            NFT_ABI,
            NFT_CONTRACT_ADDRESS,
        );

        // just mint
        await nftContract.methods
            .mintItem(OWNER_ADDRESS, process.env.TOKEN_URI )
            .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));
    } catch (e) {
        console.log(e)
    }
}

//invoke
main().then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });