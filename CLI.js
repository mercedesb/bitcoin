var firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "AIzaSyD6V2x_61X1qWxBuQJJh6VpgrocReek6Bk",
    authDomain: "bitcoin-2-e029a.firebaseapp.com",
    databaseURL: "https://bitcoin-2-e029a.firebaseio.com",
    projectId: "bitcoin-2-e029a",
    storageBucket: "",
    messagingSenderId: "195092768796"
});

var diff = require('deep-diff').diff; //finding differences between objects
//-------------------------------------------------------CUT FROM BELOW
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));



//--------------------------------------------------------------------------CUT FROM BELOW

//var stream = require('stream');
//var es = require('event-stream')
//require("dotenv").config();
//var fs = require('fs') // gonna write some of this shit down
//var request = require('request');
//create an API route that reads the scratch file and sends it through an API route to client whenever it makes a request. Then you can access it in local storage.
const request = require('request');
const shapeshift = require('shapeshift');
const coincap = require('coincap-lib');
var Combinatorics = require('js-combinatorics');
var getJSON = require('get-json');
var keys = require("./keys.js");
require("dotenv").config();
//var coinigy = new Coinigy(keys.coinigy);
const database = firebase.database();
var firebasePromise = [];

//these arrays should have arrays as items, [coin, price, exchange]. Price needs to be grabbed first, maybe new API?




//----------------------------Coinigy contains private key data that I would like to keep secure, but it also contains all the data needed for the major exchanges in one place. I would like to use it if possible.



request({
    method: 'POST',
    url: 'https://api.coinigy.com/api/v1/userWatchList',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': keys.coinigy_key,
        'X-API-SECRET': keys.coinigy_secret
    }
}, function (error, response, body) {
    if (error) throw error;
    //------------NEW CODE------------GRABBING FIRST SET OF DATA

    JSON.parse(body).data.forEach(function (element) {
        database.ref("/coinigy/" + element.mkt_name + "/" + element.exch_code).set({
            "mkt_name": element.mkt_name,
            "exch_code": element.exch_code,
            "exch_name": element.exch_name,
            "primary_currency_name": element.primary_currency_name,
            "secondary_currency_name": element.secondary_currency_name,
            "last_price": element.last_price
        });
    });
    //good data. needs additions from coincap

});


shapeshift.getCoins()
    .then(data => {
        const coins = data.body;


        var shapeshiftCoins = Object.keys(coins);
        for (var i = 0; i < shapeshiftCoins.length; i++) {
            database.ref("/shapeshift/miner/" + coins[shapeshiftCoins[i]].symbol).set(
                {
                    "symbol": coins[shapeshiftCoins[i]].symbol,
                    "status": coins[shapeshiftCoins[i]].status,
                    "minerFee": coins[shapeshiftCoins[i]].minerFee
                }
            );
        }
        var pair = [];
        var pairPrice = [];
        var pairLimit = [];
        cmb = Combinatorics.combination(shapeshiftCoins, 2);
        while (a = cmb.next()) {
            pair.push(a[0].toLowerCase() + "_" + a[1].toLowerCase());
        }
        for (var j = 0; j < pair.length; j++) {
            shapeshift.getRate(pair[j])
                .then(function (data) {
                    if (data.body.error) { } else {
                        database.ref("/shapeshift/rate/" + data.body.pair).set(
                            {
                                "pair": data.body.pair,
                                "rate": data.body.rate,
                            }
                        );

                    }
                }).catch((err) => { return err });
        }


        var keyMap = Object.keys(data.body);
        for (var k = 0; k < pair.length; k++) {
            shapeshift.getLimit(pair[k])
                .then(function (data) {
                    if (data.body.error) { } else {
                        setTimeout(function () { return }, 25);
                        pairLimit.push({
                            "pair": data.body.pair,
                            "min": data.body.min,
                            "limit": data.body.limit
                        });
                        database.ref("/shapeshift/min/" + data.body.pair).set(
                            {
                                "pair": data.body.pair,
                                "min": data.body.min,
                                "limit": data.body.limit
                            }
                        );

                    }
                }).catch((err) => { return });
        }
    }).catch((err) => { console.log(err); });


var Changelly = require('./lib.js');

var changelly = new Changelly(
    keys.changelly_key,
    keys.changelly_secret
);

changelly.getCurrencies(function (err, data) {
    if (err) {
        console.log('Error!', err);
    } else {
        // console.log(data.result);
        //double
        var changellyPairs = [];
        cmb = Combinatorics.combination(data.result, 2);
        while (a = cmb.next()) {
            changellyPairs.push([a[0].toLowerCase(), a[1].toLowerCase()]);
            //database.ref("/changelly/pairs/").push([a[0].toLowerCase(), a[1].toLowerCase()]);
        }
        changellyPairs.forEach(function (dat) {
            setTimeout(function () { return }, 50);
            changelly.getExchangeAmount(dat[0], dat[1], 1, function (err, data) {
                if (err) {
                    console.log('Error!', dat[0], dat[1]);
                } else {
                    database.ref("/changelly/" + dat[0] + "_" + dat[1]).set({
                        "coin": dat[0],
                        "currency": dat[1],
                        "price": data.result
                    });
                }
            })
        });
    }
});







var get2 = new getJSON('https://www.bit-z.com/api_v1/tickerall', function (error, response) {
    if (error) throw error;

    database.ref("/bitz/eth_btc").set(
        {
            "symbol": "eth_btc",
            "last": response.data.eth_btc.last,
            "taker": "0.1%",
            "withdraw": "0.01"
        }
    );
    database.ref("/bitz/bch_btc").set(
        {
            "symbol": "bch_btc",
            "last": response.data.bch_btc.last,
            "taker": "0.1%",
            "withdraw": "0.0001"
        }
    );
    database.ref("/bitz/dash_btc").set(
        {
            "symbol": "dash_btc",
            "last": response.data.dash_btc.last,
            "taker": "0.1%",
            "withdraw": "0.002"
        }
    );
    database.ref("/bitz/ltc_btc").set(
        {
            "symbol": "ltc_btc",
            "last": response.data.ltc_btc.last,
            "taker": "0.1%",
            "withdraw": "0.01"
        }
    );
    database.ref("/bitz/zec_btc").set(
        {
            "symbol": "zec_btc",
            "last": response.data.zec_btc.last,
            "taker": "0.1%",
            "withdraw": "0.005"
        }
    );
    //good data
});

var get3 = new getJSON('https://api.kucoin.com/v1/open/tick', function (error, response) {
    if (error) throw error;


    response.data.find(function (element) {
        if (element.symbol === "ETH-BTC") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": "0.01"
                }
            );
        }
    });
    response.data.find(function (element) {
        if (element.symbol === "BCH-BTC") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": "0.0005"
                }
            );
        }
    });
    response.data.find(function (element) {
        if (element.symbol === "BCH-ETH") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": "0.01"
                }
            );
        }
    });
    response.data.find(function (element) {
        if (element.symbol === "DASH-BTC") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": false
                }
            );
        }
    });
    response.data.find(function (element) {
        if (element.symbol === "DASH-ETH") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": false
                }
            );
        }
    });
    response.data.find(function (element) {
        if (element.symbol === "LTC-BTC") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": "0.001"
                }
            );
        }
    });
    response.data.find(function (element) {
        if (element.symbol === "LTC-ETH") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": "0.001"
                }
            );
        }
    });
    response.data.find(function (element) {
        if (element.symbol === "NEO-BTC") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": "0.0"
                }
            );
        }
    });
    response.data.find(function (element) {
        if (element.symbol === "NEO-ETH") {
            database.ref("/kucoin/" + element.symbol).set(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate,
                    "taker": "0.1%",
                    "withdraw": "0.0"
                }
            );
        }
    });

});

var get4 = new getJSON('https://markets.bisq.network/api/ticker', function (error, response) {
    var keys = [];
    var goodKeys = [];
    //console.log(response);
    Object.keys(response).forEach(function (dat) {
        //console.log(dat);
        //console.log(response);
        //console.log(JSON.parse(call));
        keys.push(dat);

    });
    for (var i = 0; i < keys.length; i++) {
        if (response[keys[i]] !== null) {
            goodKeys.push(keys[i]);
        }
    }
    //console.log(goodKeys);
    goodKeys.forEach(function (dat) {
        database.ref("/bisq/" + dat).set({
            "pair": dat,
            "last": response[dat].last
        });
    });
});


//-----------------------NEED TO DO EXPRESS STUFF ----------------------------

firebasePromise.push(database.ref("/shapeshift/").once("value"));

firebasePromise.push(database.ref("/kucoin/").once("value"));

// app.get('/kucoin/:coin', function (req, res) {



// app.get('/coinigy/', function (req, res) {

firebasePromise.push(database.ref("/coinigy/").once("value"));

// app.get('/coinigy/:coin', function (req, res) {

// app.get('/coincap/', function (req, res) {

// app.get('/coincap/:coin', function (req, res) {
// app.get('/changelly/', function (req, res) {
firebasePromise.push(database.ref("/changelly/").once("value"));
// app.get('/changelly/:coin', function (req, res) {


// app.get('/bitz/', function (req, res) {
firebasePromise.push(database.ref("/bitz/").once("value"));

// app.get('/bitz/:coin', function (req, res) {
firebasePromise.push(database.ref("/bisq/").once("value"));

firebasePromise.push(database.ref("/bibox/").once("value"));


Promise.all(firebasePromise).then(function (values) {
    var coins = [];
    for (var i = 3; i < values.length; i++) {
        coins.push(Object.keys(values[i].val()));
        //console.log(coins[i-3]);
    }
    //console.log(mergedCoins);
    //this block grabs all of my coin names and eliminates duplicates. Except for three problem cases.

    //reset coins
    var shapeshiftMinerFee = [];
    var keys = Object.keys(values[0].child("miner").val());
    for (var i = 0; i < keys.length; i++) {
        if (values[0].child("miner").child(keys[i]).child("status").val() === "available") {
            shapeshiftMinerFee.push(values[0].child("miner").child(keys[i]).val());
        }
    }
    var shapeshiftTrading = Object.keys(values[0].child("min").val());
    // console.log(shapeshiftMinerFee);
    //console.log(shapeshiftTrading);
    coins.push(shapeshiftTrading);
    //console.log(coins);
    var trading = Object.keys(values[1].val());
    for (var i = 0; i < trading.length; i++) {
        trading[i] = trading[i].toLowerCase();
    }
    coins.push(trading);

    var personal1 = Object.keys(values[2].val());
    var personal2 = [];
    var personal3 = [];
    for (var i = 0; i < personal1.length; i++) {
        personal2.push(Object.keys(values[2].child(personal1[i]).val()));
        cp = Combinatorics.cartesianProduct([personal1[i]], personal2[i]);
        personal3.push(cp.toArray());
    }
    //console.log(personal3);

    var personal4 = [];
    for (var i = 0; i < personal3.length; i++) {
        for (var j = 0; j < personal3[i].length; j++) {
            personal4.push(personal3[i][j][0] + "_" + personal3[i][j][1]);
        }
    }


    coins.push(personal4);
    var mergedCoins = [].concat.apply([], coins);
    mergedCoins = uniq(mergedCoins);
    ///console.log(mergedCoins);
    // console.log(mergedCoins);

    var coinObj = {};

    var alpha = Object.values(values[0].child("rate").val());
    var beta = Object.values(values[0].child("miner").val());
    //console.log(beta);
    for (var j = 0; j < alpha.length; j++) {
        if (mergedCoins.includes(alpha[j].pair)) {
            coinObj[alpha[j].pair] = alpha[j].rate;
            if (beta.includes(alpha[j].pair)) {
                for (var k = 0; k < beta.length; k++) {
                    if (beta[k].symbol === alpha[j].pair.slice(0, 3)) {
                        coinObj[alpha[j].pair] = alpha[j].rate - +beta[k].minerFee;
                    }
                }

            }
        }
    }
    ////////////THIS IS MY FIRST FINAL OBJECT. LOOKS GOOD FOR SHAPESHIFT. coinObj


    //    app.get("/shapeshift/", function(req,res){
    //        res.json(coinObj);
    //    });
    app.get('/shapeshift', function (req, res) {
        //console.log(JSON.stringify(coinObj));
        res.send(JSON.stringify(coinObj));
    });
    //console.log(coinObj);
    //listen HERE??
    //This is my shapeshift object in it's full glory. Now I can turn it into a graph.

    // console.log(values[1].val());
    var kucoinKeys = Object.keys(values[1].val());
    var delta = values[1].val();
    var kucoinObj = {}

    kucoinKeys.forEach(function (pair, index) {
        kucoinObj[pair] = delta[pair].lastDealPrice;
        //- (+delta[pair].lastDealPrice * +delta[pair].taker));
    });






    //console.log(values[3].val());

    var changellyKeys = Object.keys(values[3].val());
    var zeta = values[3].val();
    var changellyObj = {};
    changellyKeys.forEach(function (pair, index) {
        changellyObj[pair] = zeta[pair].price;
    });
    delete changellyObj["prices"];
    // console.log(epsilon);
    //This is changelly

    //bitz, bitsq, bibox

    //console.log(values[4].val());
    var bitzKeys = Object.keys(values[4].val());
    var bitzob = values[4].val();
    var bitzObj = {}

    bitzKeys.forEach(function (pair, index) {
        bitzObj[pair] = bitzob[pair].last;
    });
    // console.log(bitzObj);
    //bitz prices here

    // console.log(values[5].val());
    var bitsqKeys = Object.keys(values[5].val());
    var bitsqob = values[5].val();
    var bitsqObj = {}

    bitsqKeys.forEach(function (xy, index) {
        bitsqObj[xy] = bitsqob[xy].last;
    });
    //    console.log(bitsqObj);
    // bitsq prices here
    //   console.log(values[6].val());
    var biboxKeys = Object.keys(values[6].val());
    var biboxob = values[6].val();
    var biboxObj = {}

    biboxKeys.forEach(function (xy, index) {
        var yx = xy.toString().toLowerCase();
        yx = yx.substr(0, 3) + "_" + yx.substr(4);
        biboxObj[xy] = biboxob[xy].last;
    });

    // console.log(coinObj);
    // console.log(changellyObj);
    // console.log(bitzObj);
    // console.log(bitsqObj);
    // console.log(kucoinObj);

    //Shapeshift Differences
    var diffchk1 = diff(coinObj, changellyObj);
    var diffchk2 = diff(coinObj, bitzObj);
    var diffchk3 = diff(coinObj, bitsqObj);
    //   var diffchk4 = diff(coinObj, biboxObj);
    //   var diffchk5 = diff(coinObj, kucoinObj);

    //Changelly Differences
    var diffchk6 = diff(changellyObj, bitzObj);
    var diffchk7 = diff(changellyObj, bitsqObj);
    //    var diffchk8 = diff(changellyObj, biboxObj);
    //    var diffchk9 = diff(changellyObj, kucoinObj);

    //bitz Differences
    var diffchk10 = diff(bitzObj, bitsqObj);
    //    var diffchk11 = diff(bitzObj, biboxObj);
    //    var diffchk12 = diff(bitzObj, kucoinObj);

    //bitsq diff
    // var diffchk13 = diff(bitsqObj, biboxObj);
    //var diffchk14 = diff(bitsqObj, kucoinObj);
    var shapeshiftChangellyDiff = [];
    var shapeshiftBitzDiff = [];
    var shapeshiftBitsqDiff = [];
    var changellyBitzDiff = [];
    var changellyBitsqDiff = [];
    var bitzBitsqDiff = [];
    //var diffchk15 = diff(biboxObj, kucoinObj); 
    for (var i = 0; i < diffchk1.length; i++) {
        if (diffchk1[i].kind === 'E') {
            // console.log(diffchk1[i]);
            shapeshiftChangellyDiff.push(diffchk1[i]);
        }
    }
    for (var i = 0; i < diffchk2.length; i++) {
        if (diffchk2[i].kind === 'E') {
            //console.log(diffchk2[i]);
            shapeshiftBitzDiff.push(diffchk2[i]);
        }
    }
    for (var i = 0; i < diffchk3.length; i++) {
        if (diffchk3[i].kind === 'E') {
            // console.log(diffchk3[i]);
            shapeshiftBitsqDiff.push(diffchk3[i]);
        }
    }
    for (var i = 0; i < diffchk6.length; i++) {
        if (diffchk6[i].kind === 'E') {
            //console.log(diffchk6[i]);
            changellyBitzDiff.push(diffchk6[i]);
        }
    }
    for (var i = 0; i < diffchk7.length; i++) {
        if (diffchk7[i].kind === 'E') {
            //console.log(diffchk7[i]);
            changellyBitsqDiff.push(diffchk7[i]);
        }
    }
    for (var i = 0; i < diffchk10.length; i++) {
        if (diffchk10[i].kind === 'E') {
            //console.log(diffchk10[i]);
            bitzBitsqDiff.push(diffchk10[i]);
        }
    }
    var arbitrage = {};
    arbitrage["BitZ-BitSquare"] = bitzBitsqDiff;
    arbitrage["Changelly-BitSquare"] = changellyBitsqDiff;
    arbitrage["Changelly-BitZ"] = changellyBitzDiff;
    arbitrage["Shapeshift-BitsSquare"] = shapeshiftBitsqDiff;
    arbitrage["Shapeshift-BitZ"] = shapeshiftBitzDiff;
    arbitrage["Shapeshift-Changelly"] = shapeshiftChangellyDiff;

    
    // console.log(bitzBitsqDiff);
    // // //console.log(JSON.parse(diffchk1));
    // console.log(changellyBitsqDiff);
    // console.log(changellyBitzDiff);
    // console.log(shapeshiftBitsqDiff);
    // console.log(shapeshiftChangellyDiff);
    // console.log(shapeshiftBitzDiff);

   // module.exports.bitzBitsqDiff = bitzBitsqDiff;
    //module.exports.changellyBitsqDiff = changellyBitsqDiff;
    // module.exports.changellyBitzDiff = changellyBitzDiff;
    // module.exports.shapeshiftBitsqDiff = shapeshiftBitsqDiff;
    // module.exports.shapeshiftChangellyDiff = shapeshiftChangellyDiff;
    // module.exports.shapeshiftBitzDiff = shapeshiftBitsqDiff;

    //Cookies.set("bitzBitsq", bitzBitsqDiff);
    var exchanges = [
        "BitSquare",
        "BitZ",
        "Changelly",
        "Shapeshift"
    ]

    // app.get("/exchanges", function(req, res) {
    //     res.json(exchanges);
    //   });

    // app.get("/api/:exch", function(req, res) {
    //     //res.json exch prices
    // });
    // app.get("/:exch/:exch2", function(req, res){
    //     //get arbitrage at an exchange
    // });
    app.get("/api", function(req, res){
        res.json(arbitrage);
        //print all arbitrage opportunities
    });

    //Now let's do Coinigy, the second hardest compared to Shapeshift

    //console.log(values[2].val());

    var firstCoin = Object.keys(values[2].val());
    var secondCoin = values[2].val();
    var coinigyObj = {};

    var pairing = [];
    firstCoin.forEach(function (val, ind) { pairing.push(Object.keys(secondCoin[firstCoin[ind]])) });
    // console.log(pairing);
    //console.log(firstCoin);
    // console.log(secondCoin);
    var stringcoin = "";
    var cartesian = [];

    firstCoin.forEach(function (val, index) {
        firstCoin[index] = val.toString();
        //console.log(firstCoin);
    });


    firstCoin.forEach(function (val, index) {
        cp = Combinatorics.cartesianProduct([val], pairing[index]);
        cartesian.push(cp.toArray());
    });
    //console.log(cartesian);


    //app.use(express.static("public"));

    // app.get('/', function (req, res) {
    //     res.send();
    // }

});

function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

app.listen(PORT);


