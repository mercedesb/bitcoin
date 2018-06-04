console.log('this is loaded');
require("dotenv").config();

module.exports = {
    key: process.env.COINIGY_KEY,
    secret: process.env.COINIGY_SECRET
  };

  