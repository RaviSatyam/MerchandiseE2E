let dotenv = require('dotenv');
dotenv.config();
module.exports = {
    ENV: process.env.SDK_ENV || "dev",
    PORT: process.env.PORT || 8080,

    CONTRACT_ADDRESS: "0x1826259E0Ac2f4FfF70229465F4395259D7d66F2",
    ACCOUNT_ADDRESS: "0x40fE557b13644F8e48bCb1A3ccF5c887091b5A49",


};