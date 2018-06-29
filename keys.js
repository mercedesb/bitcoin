require("dotenv").config();

module.exports = {
    coinigy_key: process.env.COINIGY_KEY,
    coinigy_secret: process.env.COINIGY_SECRET,
    changelly_key: process.env.CHANGELLY_KEY,
    changelly_secret: process.env.CHANGELLY_SECRET, 
    firebase_api: process.env.FIREBASE_KEY,
    firebase_auth: process.env.FIREBASE_AUTH
  };

  