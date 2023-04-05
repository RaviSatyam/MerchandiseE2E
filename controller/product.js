
//imports
let config = require('../config/config');
let constants = require('../constants/constants');

//Ethereum Setup
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var productContractJson = require("../../build/contracts/ProductContract.json")

let contractAddress = config.CONTRACT_ADDRESS;
let accountAddress = config.ACCOUNT_ADDRESS;

//=======================================================================================================
// add product
//=======================================================================================================
module.exports.addProduct = async function (req, res) {
    console.info(`================== addProduct() START ==================`);
    try {

        let productContract = new web3.eth.Contract(productContractJson.abi, contractAddress);

        let id = req.body.id;
        let name = req.body.name;
        let color = req.body.color;

        console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`)

        let result = await productContract.methods.addProduct(id, name, color).send({ from: accountAddress, gas: "1000000" });
        console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
        console.info(result);

        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.DETAILS_ADDED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// change owner
//=======================================================================================================
module.exports.changeOwner = async function (req, res) {
    console.info(`================== changeOwner() START ==================`);
    try {

        let productContract = new web3.eth.Contract(productContractJson.abi, contractAddress);

        let id = req.body.id;
        let ownerAddress = req.body.ownerAddress;

        console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`)

        let result = await productContract.methods.changeProductOwner(id, ownerAddress).send({ from: accountAddress, gas: "1000000" });
        console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
        console.log(`ownerAddress balance : ${await web3.eth.getBalance(ownerAddress)}`);
        console.info(result);

        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_UPDATED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// get product by id
//=======================================================================================================
module.exports.getProductById = async function (req, res) {
    console.info(`================== getProductById() START ==================`);
    try {

        let productContract = new web3.eth.Contract(productContractJson.abi, contractAddress);

        let product = await productContract.methods.getProductById('PROD1001').call();
        console.info(`Product Details: ${JSON.stringify(product)}`);
        console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
        console.info(product.Owner);

        let productDetails = {
            Owner : product.Owner,
            Id : product.Id,
            Name : product.Name,
            Color : product.Color,
            Status : product.Status
        }

        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_FETCHED_SUCCESSFULLY_MESSAGE, data: productDetails });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// get all product
//=======================================================================================================
module.exports.getAllProduct = async function (req, res) {
    console.info(`================== getAllProduct() START ==================`);
    try {

        let productContract = new web3.eth.Contract(productContractJson.abi, contractAddress);

        let productDetails = await productContract.methods.getAllProduct().call();
        console.info(`Product Details: ${JSON.stringify(productDetails)}`);
        console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);

        // let productDetails = {
        //     Owner : product.Owner,
        //     Id : product.Id,
        //     Name : product.Name,
        //     color : product.color,
        //     Status : product.Status
        // }

        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_FETCHED_SUCCESSFULLY_MESSAGE, data: productDetails });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// get product count
//=======================================================================================================
module.exports.getProductCount = async function (req, res) {
    console.info(`================== getProductCount() START ==================`);
    try {

        let productContract = new web3.eth.Contract(productContractJson.abi, contractAddress);

        let productCount = await productContract.methods.getProductCounts().call();

        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_FETCHED_SUCCESSFULLY_MESSAGE, ProductCount: productCount });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}
