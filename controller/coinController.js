const router = require("express").Router();
const db = require("../models");


module.exports = {
    somefunction: (data)=>{db.Coin.create(data).then(function(newCoin){return console.log(newCoin)}).catch(function(err){ console.error(err)})}
}




