const nft = artifacts.require("MyNFT");

module.exports = async function (deployer) {
  await deployer.deploy(nft);
};