const RetailContract = artifacts.require("RetailContract");

module.exports = async function (deployer) {
  await deployer.deploy(RetailContract);
  const retailContract=await RetailContract.deployed();
};
