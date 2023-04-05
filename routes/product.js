let express = require('express');
let router = express.Router();
let product = require('../controller/product');


router.post("/add", product.addProduct);
router.get("/get", product.getProductById);
router.get("/count", product.getProductCount);
router.get("/getall", product.getAllProduct);
router.post("/changeowner",product.changeOwner)

module.exports = router;