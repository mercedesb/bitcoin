const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const diff = require('deep-diff').diff; //finding differences between objects

const request = require('request');
const shapeshift = require('shapeshift');
const coincap = require('coincap-lib');
var Combinatorics = require('js-combinatorics');
var getJSON = require('get-json'); //change this to AXIOS
var keys = require("./keys.js");
require("dotenv").config();
//var coinigy = new Coinigy(keys.coinigy);

const firebasePromise = [];

// Serve up static assets (usually on heroku)

const firebase = require('firebase');
const fb = firebase.initializeApp({
    apiKey: "AIzaSyD6V2x_61X1qWxBuQJJh6VpgrocReek6Bk",
    authDomain: "bitcoin-2-e029a.firebaseapp.com",
    databaseURL: "https://bitcoin-2-e029a.firebaseio.com",
    projectId: "bitcoin-2-e029a",
    storageBucket: "",
    messagingSenderId: "195092768796"
});
const database = firebase.database();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

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


    var mystery2 = values[2].val();
    mystery2 = flattenObject(mystery2);
    //console.log(mystery2);
    //console.log(Object.keys(mystery2));
    mysteryKeys = Object.keys(mystery2);
    mysteryValues = Object.values(mystery2);
    //console.log(mysteryValues);

    var binance = {};
    var hitb = {};
    var bittrex = {};
    var kraken = {};
    var cryptopia = {};
    var liqui = {};

    mysteryValues.forEach((val, i, container) => {
        if (val === "BINA") {
            binance[container[i + 3]] = container[i + 2];
        }
        if (val === "HITB") {
            hitb[container[i + 3]] = container[i + 2];
        }
        if (val === "KRKN") {
            kraken[container[i + 3]] = container[i + 2];
        }
        if (val === "BTRX") {
            bittrex[container[i + 3]] = container[i + 2];
        }
        if (val === "LIQU") {
            liqui[container[i + 3]] = container[i + 2];
        }
        if (val === "CPIA") {
            cryptopia[container[i + 3]] = container[i + 2];
        }
    });

    var binanceKeys = Object.keys(binance);
    var binanceValues = Object.values(binance);

    for (var i = 0; i < binanceKeys.length; i++) {
        var lc;
        if (binanceKeys[i].slice(0, 3).toLowerCase() === "ste") {
            lc = binanceKeys[i].slice(0, 5).toLowerCase() + "_" + binanceKeys[i].slice(6).toLowerCase();
        } else {
            lc = binanceKeys[i].slice(0, 3).toLowerCase() + "_" + binanceKeys[i].slice(4).toLowerCase();
        }
        binanceKeys[i] = lc;
    }
    binance = {}
    for (var i = 0; i < binanceKeys.length; i++) {
        binance[binanceKeys[i]] = binanceValues[i];
    }

    binance = toLowerCase(binance);
    //binance is ready to go
    console.log(binance);

    hitb = toLowerCase(hitb);
    console.log(hitb);

    bittrex = toLowerCase(bittrex);
    kraken = toLowerCase(kraken);
    cryptopia = toLowerCase(cryptopia);
    liqui = toLowerCase(liqui);




    // binanceKeys.forEach(function (xy, index) {
    //     var yx = xy.toLowerCase();
    //     yx = yx.substr(0, 3) + "_" + yx.substr(4);
    //     binance[xy] = binancyKeys[yx];
    //     binance[yx] = binanceValues[xy];
    // });



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
    //app.get('/shapeshift', function (req, res) {
    //console.log(JSON.stringify(coinObj));
    //  res.send(JSON.stringify(coinObj));
    //});
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
        biboxObj[yx] = biboxob[xy].last;
    });


    //console.log(bittrex);
    //console.log(kraken);
    //console.log(cryptopia);
    //console.log(liqui);
    //console.log(binance);

    //Shapeshift Differences
    var diffchk1 = diff(coinObj, changellyObj);
    var diffchk2 = diff(coinObj, bitzObj);
    var diffchk3 = diff(coinObj, bitsqObj);
    var diffchk4 = diff(coinObj, biboxObj);
    var diffchk51 = diff(coinObj, bittrex);
    var diffchk52 = diff(coinObj, kraken);
    var diffchk53 = diff(coinObj, cryptopia);
    var diffchk54 = diff(coinObj, liqui);
    var diffchk55 = diff(coinObj, binance);
    //   var diffchk5 = diff(coinObj, kucoinObj);

    //Changelly Differences
    var diffchk6 = diff(changellyObj, bitzObj);
    var diffchk7 = diff(changellyObj, bitsqObj);
    var diffchk8 = diff(changellyObj, biboxObj);
    var diffchk91 = diff(changellyObj, bittrex);
    var diffchk92 = diff(changellyObj, kraken);
    var diffchk93 = diff(changellyObj, cryptopia);
    var diffchk94 = diff(changellyObj, binance);
    var diffchk95 = diff(changellyObj, liqui);
    //    var diffchk9 = diff(changellyObj, kucoinObj);

    //bitz Differences
    var diffchk10 = diff(bitzObj, bitsqObj);
    var diffchk11 = diff(bitzObj, biboxObj);
    var diffchk121 = diff(bitzObj, bittrex);
    var diffchk122 = diff(bitzObj, cryptopia);
    var diffchk123 = diff(bitzObj, liqui);
    var diffchk124 = diff(bitzObj, binance);
    var diffchk125 = diff(bitzObj, kraken);
    //    var diffchk12 = diff(bitzObj, kucoinObj);

    //bitsq diff
    var diffchk13 = diff(bitsqObj, biboxObj);
    var diffchk141 = diff(bitsqObj, bittrex);
    var diffchk142 = diff(bitsqObj, kraken);
    var diffchk143 = diff(bitsqObj, cryptopia);
    var diffchk144 = diff(bitsqObj, liqui);
    var diffchk145 = diff(bitsqObj, binance);
    //var diffchk14 = diff(bitsqObj, kucoinObj);

    //new intercomparisons
    var diffchk151 = diff(binance, bittrex);
    var diffchk152 = diff(binance, kraken);
    var diffchk153 = diff(binance, cryptopia);
    var diffchk154 = diff(binance, liqui);

    var diffchk161 = diff(bittrex, kraken);
    var diffchk162 = diff(bittrex, cryptopia);
    var diffchk163 = diff(bittrex, liqui);

    var diffchk171 = diff(kraken, cryptopia);
    var diffchk172 = diff(kraken, liqui);

    var diffchk181 = diff(cryptopia, liqui);

    var binanceBittrex = []
    var binanceKraken = []
    var binanceCryptopia = []
    var binanceLiqui = []
    var bittrexCryptopia = []
    var bittrexLiqui = []
    var bittrexKraken = []
    var krakenCryptopia = []
    var krakenLiqui = []
    var cryptopiaLiqui = []

    dif(diffchk151, binanceBittrex);
    dif(diffchk152, binanceKraken);
    dif(diffchk153, binanceCryptopia);
    dif(diffchk154, binanceLiqui);
    dif(diffchk161, bittrexCryptopia);
    dif(diffchk162, bittrexLiqui);
    dif(diffchk163, bittrexKraken);
    dif(diffchk171, krakenCryptopia);
    dif(diffchk172, krakenLiqui);
    dif(diffchk181, cryptopiaLiqui);

    var shapeshiftChangellyDiff = [];
    var shapeshiftBiboxDiff = [];
    var shapeshiftBitsqDiff = [];
    var changellyBiboxDiff = [];
    var bitzBiboxDiff = [];
    var bitsqBiboxDiff = [];
    var shapeshiftBitzDiff = [];
    var changellyBitzDiff = [];
    var changellyBitsqDiff = [];
    var bitzBitsqDiff = [];

    //-------------------------------------------------------------NEW
    var shapeshiftBittrex = [];
    var shapeshiftKraken = [];
    var shapeshiftCryptopia = [];
    var shapeshiftLiqui = [];
    var shapeshiftBinance = [];
    var changellyBittrex = [];
    var changellyKraken = [];
    var changellyCryptopia = [];
    var changellyLiqui = [];
    var changellyBinance = [];
    var bitzBittrex = [];
    var bitzKraken = [];
    var bitzCryptopia = [];
    var bitzLiqui = [];
    var bitzBinance = [];
    var bitsqBittrex = [];
    var bitsqKraken = [];
    var bitsqCryptopia = [];
    var bitsqLiqui = [];
    var bitsqBinance = [];

    dif(diffchk145, bitsqBinance);
    dif(diffchk144, bitsqLiqui);
    dif(diffchk143, bitsqCryptopia);
    dif(diffchk142, bitsqKraken);
    dif(diffchk141,bitsqBittrex);
    dif(diffchk124, bitzBinance);
    dif(diffchk123, bitzLiqui);
    dif(diffchk122,bitzCryptopia);
    dif(diffchk125, bitzKraken);
    dif(diffchk121, bitzBittrex);
    dif(diffchk94, changellyBinance);
    dif(diffchk95, changellyLiqui);
    dif(diffchk93,changellyCryptopia);
    dif(diffchk92,changellyKraken);
    dif(diffchk91, changellyBittrex);
    dif(diffchk51,shapeshiftBittrex);
    dif(diffchk52,shapeshiftKraken);
    dif(diffchk53,shapeshiftCryptopia);
    dif(diffchk54, shapeshiftLiqui);
    dif(diffchk55,shapeshiftBinance);


    //------------------------------------------------------------------------OLD
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

    for (var i = 0; i < diffchk4.length; i++) {
        if (diffchk4[i].kind === 'E') {
            // console.log(diffchk1[i]);
            shapeshiftBiboxDiff.push(diffchk4[i]);
        }
    }
    for (var i = 0; i < diffchk8.length; i++) {
        if (diffchk8[i].kind === 'E') {
            // console.log(diffchk1[i]);
            changellyBiboxDiff.push(diffchk8[i]);
        }
    }
    for (var i = 0; i < diffchk11.length; i++) {
        if (diffchk11[i].kind === 'E') {
            // console.log(diffchk1[i]);
            bitzBiboxDiff.push(diffchk11[i]);
        }
    }
    for (var i = 0; i < diffchk13.length; i++) {
        if (diffchk13[i].kind === 'E') {
            // console.log(diffchk1[i]);
            bitsqBiboxDiff.push(diffchk13[i]);
        }
    }




    var arbitrage = {};


    arbitrage["Binance-Bittrex"] = binanceBittrex;
    arbitrage["Binance-Kraken"] = binanceKraken;
    arbitrage["Binance-Cryptopia"] = binanceCryptopia;
    arbitrage["Binance-Liqui"] = binanceLiqui;
    arbitrage["Bittrex-Cryptopia"] = bittrexCryptopia;
    arbitrage["Bittrex-Liqui"] = bittrexLiqui;
    arbitrage["bittrex-Kraken"] = bittrexKraken;
    arbitrage["Kraken-Cryptopia"] = krakenCryptopia;
    arbitrage["Kraken-Liqui"] = krakenLiqui;
    arbitrage["Cryptopia-Liqui"] = cryptopiaLiqui;




    arbitrage["Bitsquare-Kraken"] = bitsqKraken;
    arbitrage["Bitsquare-Cryptopia"] = bitsqCryptopia;
    arbitrage["Bitsquare-Liqui"] = bitsqLiqui;
    arbitrage["Bitsquare-Binance"] = bitsqBinance;
    arbitrage["Bitsquare-Bittrex"] = bitsqBittrex;
    arbitrage["Bitz-Binance"] = bitzBinance;
    arbitrage["Bitz-Liqui"] = bitzLiqui;
    arbitrage["Bitz-Cryptopia"] = bitzCryptopia;
    arbitrage["Bitz-Kraken"] = bitzKraken;
    arbitrage["Bitz-Bittrex"] = bitzBittrex;
    arbitrage["Changelly-Bittrex"] = changellyBittrex;
    arbitrage["Changelly-Kraken"] = changellyKraken;
    arbitrage["Changelly-Cryptopia"] = changellyCryptopia;
    arbitrage["Changelly-Liqui"] = changellyLiqui;
    arbitrage["Changelly-Binance"] = changellyBinance;
    arbitrage["Shapeshift-Bittrex"] = shapeshiftBittrex;
    arbitrage["Shapeshift-Kraken"] = shapeshiftKraken;
    arbitrage["Shapeshift-Cryptopia"] = shapeshiftCryptopia;
    arbitrage["Shapeshift-Liqui"] = shapeshiftLiqui;
    arbitrage["Shapeshift-Binance"] = shapeshiftBinance;
    arbitrage["BitZ-BitSquare"] = bitzBitsqDiff;
    arbitrage["Changelly-BitSquare"] = changellyBitsqDiff;
    arbitrage["Changelly-BitZ"] = changellyBitzDiff;
    arbitrage["Shapeshift-BitsSquare"] = shapeshiftBitsqDiff;
    arbitrage["Shapeshift-BitZ"] = shapeshiftBitzDiff;
    arbitrage["Shapeshift-Changelly"] = shapeshiftChangellyDiff;
    arbitrage["Shapeshift-Bibox"] = shapeshiftBiboxDiff;
    arbitrage["Changelly-Bibox"] = changellyBiboxDiff;
    arbitrage["BitZ-Bibox"] = bitzBiboxDiff;
    arbitrage["BitSquare-Bibox"] = bitsqBiboxDiff;

    console.log(arbitrage);
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

    //console.log(arbitrage);

});

function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}


var flattenObject = function (ob) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};

function toLowerCase(obj) {
    var binanceKeys = Object.keys(obj);
    var objValues = Object.values(obj);
    for (var i = 0; i < binanceKeys.length; i++) {
        var lc;
        if (binanceKeys[i].slice(0, 3).toLowerCase() === "ste") {
            lc = binanceKeys[i].slice(0, 5).toLowerCase() + "_" + binanceKeys[i].slice(6).toLowerCase();
        } else if (binanceKeys[i].slice(0, 3).toLowerCase() === "das") {
            lc = binanceKeys[i].slice(0, 4).toLowerCase() + "_" + binanceKeys[i].slice(5).toLowerCase();
        } else {
            lc = binanceKeys[i].slice(0, 3).toLowerCase() + "_" + binanceKeys[i].slice(4).toLowerCase();
        }
        binanceKeys[i] = lc;
    }
    obj = {};
    for (var i = 0; i < binanceKeys.length; i++) {
        obj[binanceKeys[i]] = objValues[i];
    }
    return obj;
}

function dif(diffcheck, array) {
    for (var i = 0; i < diffcheck.length; i++) {
        if (diffcheck[i].kind === 'E') {
            // console.log(diffchk1[i]);
            array.push(diffcheck[i]);
        }
    }
}


//-------------------------------------------------------CUT FROM BELOW

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, function () {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});
