require("dotenv").config();

module.exports = {
    coinigy_key: process.env.COINIGY_KEY,
    coinigy_secret: process.env.COINIGY_SECRET,
    changelly_key: process.env.CHANGELLY_KEY,
    changelly_secret: process.env.CHANGELLY_SECRET, 
    firebase_api: process.env.FIREBASE_KEY,
    firebase_auth: process.env.FIREBASE_AUTH,
    firebase_url: process.env.FIREBASE_URL,
    firebase_id: process.env.FIREBASE_ID,
    firebase_bucket: process.env.FIREBASE_BUCKET,
    firebase_sender: process.env.FIREBASE_SENDER
  };

  