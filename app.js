

/*
* Endpoints to invoke Smart Contract.
* @Author : Md Abid Khan
*/

var express = require('express');
var bodyParser = require('body-parser');
let cors = require('cors');

// //Ethereum Setup
// var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
// var productContractJson = require("./build/contracts/ProductContract.json");

// let contractAddress = config.CONTRACT_ADDRESS;
// let accountAddress = config.ACCOUNT_ADDRESS;

//other imports
let config = require('./config/config');

//setting app
var app = express();
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


//=======================================================================================================
// setting up a middleware to authenticate the request with a token 
//=======================================================================================================
app.use(async (req, res, next) => {
  console.info('New req for %s', req.originalUrl);
  return next();
});

let productRoute = require('./routes/product');

app.use('/api/product', productRoute);

//=======================================================================================================
// server setup
//=======================================================================================================
app.listen(8080, () => {
  console.info("*** - ETH-PMS server running - ***");
});











// app.post("/addname", (req, res) => {
//   res.send(req.body);

// });

// async function sendObject() {
//   customerData = [];
//   var x = 0;
//   var y = await contract.x.call().toNumber();
//   for (var i = 0; i < y; i++) {
//     const da = await contract.get(x);
//     customerData.push(da);
//     x = x + 1;
//   }
//   app.get('/test', function (req, res, next) {
//     res.json(customerData);
//   })
// }

// sendObject();










// async function myApp() {

//   let productContract = new web3.eth.Contract(productContractJson.abi, contractAddress);

//   console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`)

//   console.log(`my Name : ${await productContract.methods.myName().call()}`);
//   // await productContract.methods.values().call();

//   await productContract.methods.addProduct('PROD1001', 'Car', 'Black').send({ from: accountAddress, gas: "1000000" });
//   console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);

//   let product = await productContract.methods.getProductById('PROD1001').call();
//   console.info(`Product Details: ${JSON.stringify(product)}`);

//   let product1 = await productContract.methods.getProductById('PROD1001').call();
//   console.info(`Product1 Details: ${JSON.stringify(product1)}`);

//   let prodCount = await productContract.methods.getProductCounts().call();
//   console.log(`product count : ${prodCount}`);
// }

// myApp();
