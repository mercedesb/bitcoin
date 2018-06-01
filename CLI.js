var firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "AIzaSyD6V2x_61X1qWxBuQJJh6VpgrocReek6Bk",
    authDomain: "bitcoin-2-e029a.firebaseapp.com",
    databaseURL: "https://bitcoin-2-e029a.firebaseio.com",
    projectId: "bitcoin-2-e029a",
    storageBucket: "",
    messagingSenderId: "195092768796"
});

var stream = require('stream');
var es = require('event-stream')
//require("dotenv").config();
var fs = require('fs') // gonna write some of this shit down
//var request = require('request');

const shapeshift = require('shapeshift');
const coincap = require('coincap-lib');
const Combinatorics = require('js-combinatorics');
var getJSON = require('get-json');
//var keys = require("./keys.js");
//var coinigy = new Coinigy(keys.coinigy);
var database = firebase.database();
var coinigyData = [];
var coincapData = [];
var biboxData = [];
var kucoinData = [];
var bitzData = [];
var shapeshiftData = [];
var changellyPairs = [];
//----------------------------Coinigy contains private key data that I would like to keep secure, but it also contains all the data needed for the major exchanges in one place. I would like to use it if possible.
var request = require('request');


request({
    method: 'POST',
    url: 'https://api.coinigy.com/api/v1/userWatchList',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': '2f1198cd7540ad52b584cfcc21a1e476',
        'X-API-SECRET': 'f021026e7281dfcb05220dfe299e38b6'
    }
}, function (error, response, body) {
    if (error) throw error;
    fs.writeFile("./data/coinigy.txt", body, function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }




    });
    //------------NEW CODE------------GRABBING FIRST SET OF DATA

    JSON.parse(body).data.forEach(function (element) {
        coinigyData.push({
            "mkt_name": element.mkt_name,
            "exch_code": element.exch_code,
            "exch_name": element.exch_name,
            "primary_currency_name": element.primary_currency_name,
            "secondary_currency_name": element.secondary_currency_name,
            "last_price": element.last_price
        });
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
    fs.writeFile("./data/coinigyData.txt", JSON.stringify(coinigyData), function (err) {
        if (err) throw err;

    });
});


//This is the basic averages.

coincap.front().then(function (response) {
    fs.writeFile("./data/coincap.txt", JSON.stringify(response), function (err) {

        if (err) {
            return console.log(err);
        }



    });
    response.find(function (element) {
        if (element.short === "BTC") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/BTC").set({
                "cap24hrChange": element.cap24hrChange,
                "short": element.short,
                "price": element.price
            }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "ETH") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/ETH").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "BCH") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/BCH").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "DASH") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/DASH").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "LTC") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/LTC").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "NEO") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/NEO").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "STEEM") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/STEEM").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "XLM") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/XLM").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "XMR") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/XMR").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "XRP") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/XRP").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function (element) {
        if (element.short === "ZEC") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
            database.ref("/coincap/ZEC").set(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    fs.writeFile("./data/coincapData.txt", JSON.stringify(coincapData), function (err) {
        if (err) throw err;

    });
    //good data
});



shapeshift.getCoins()
    .then(data => {
        const coins = data.body;
        fs.writeFile("./data/shapeshift.txt", JSON.stringify(coins), function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "movies.txt was updated!"

            //Provides miners fees for all coins. Have to pull coin trade data individually
        });


        var shapeshiftCoins = Object.keys(coins);
        for (var i = 0; i < shapeshiftCoins.length; i++) {
            shapeshiftData.push({
                "symbol": coins[shapeshiftCoins[i]].symbol,
                "status": coins[shapeshiftCoins[i]].status,
                "minerFee": coins[shapeshiftCoins[i]].minerFee
            });
            database.ref("/shapeshift/miner/" + coins[shapeshiftCoins[i]].symbol).set(
                {
                    "symbol": coins[shapeshiftCoins[i]].symbol,
                    "status": coins[shapeshiftCoins[i]].status,
                    "minerFee": coins[shapeshiftCoins[i]].minerFee
                }
            );
        }
        fs.appendFile("./data/shapeshiftMinerFeeData.txt", JSON.stringify(shapeshiftData), function (err) {
            if (err) throw err;
        });
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
                        // pairPrice.push({
                        //     "pair": data.body.pair,
                        //     "rate": data.body.rate,
                        // });
                        database.ref("/shapeshift/rate/" + data.body.pair).set(
                            {
                                "pair": data.body.pair,
                                "rate": data.body.rate,
                            }
                        );

                    }
                    fs.appendFile("./data/shapeshiftPairPriceData.txt", JSON.stringify(pairPrice), function (err) {
                        if (err) throw err;
                    });
                    //this one works (pairPrice)
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
                    fs.appendFile("./data/shapeshiftPairLimitData.txt", JSON.stringify(pairLimit), function (err) {
                        if (err) throw err;
                    });
                }).catch((err) => { return });
        }
    }).catch((err) => { console.log(err); });


var Changelly = require('./lib.js');

var changelly = new Changelly(
    'ed7f576df31d4bcab7742641d37f935b',
    '4fb2405ff40d0e7874baae70687ff7e28b3ffec8f9303aed5bb205b2da871bbe'
);

changelly.getCurrencies(function (err, data) {
    if (err) {
        console.log('Error!', err);
    } else {
        // console.log(data.result);
        //double

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





//-----------------------------------------------------------------------------------------------------
//get-Json 



var get1 = new getJSON('https://api.bibox.com/v1/mdata?cmd=marketAll', function (error, response) {
    if (error) throw error;

    fs.writeFile("./data/bibox.txt", JSON.stringify(response.result), function (err) {

        if (err) {
            return console.log(err);
        }

        //good data

    });
    response.result.find(function (element) {
        if (element.coin_symbol === "BCH" && element.currency_symbol === "BTC") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
            database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last,
                    "taker": "0.1%",
                    "withdraw": "0.005"
                }
            );

        }
    });
    response.result.find(function (element) {
        if (element.coin_symbol === "BCH" && element.currency_symbol === "ETH") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
            database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last,
                    "taker": "0.1%",
                    "withdraw": "0.005"
                }
            );
        }
    });
    response.result.find(function (element) {
        if (element.coin_symbol === "DASH" && element.currency_symbol === "BTC") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
            database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last,
                    "taker": "0.1%",
                    "withdraw": "0.001"
                }
            );
        }
    });
    response.result.find(function (element) {
        if (element.coin_symbol === "DASH" && element.currency_symbol === "ETH") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
            database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last,
                    "taker": "0.1%",
                    "withdraw": "0.001"
                }
            );
        }
    });
    response.result.find(function (element) {
        if (element.coin_symbol === "LTC" && element.currency_symbol === "BTC") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
            database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last,
                    "taker": "0.1%",
                    "withdraw": "0.005"
                }
            );
        }
    });
    response.result.find(function (element) {
        if (element.coin_symbol === "LTC" && element.currency_symbol === "ETH") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
            database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last,
                    "taker": "0.1%",
                    "withdraw": "0.005"
                }
            );
        }
    });
    response.result.find(function (element) {
        if (element.coin_symbol === "NEO" && element.currency_symbol === "BTC") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
            database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last,
                    "taker": "0.1%",
                    "withdraw": false
                }
            );
        }
    });
    response.result.find(function (element) {
        if (element.coin_symbol === "NEO" && element.currency_symbol === "ETH") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
            database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last,
                    "taker": "0.1%",
                    "withdraw": false
                }
            );
        }
    });
    fs.writeFile("./data/biboxData.txt", JSON.stringify(biboxData), function (err) {
        if (err) throw err;
    });
    //good data
});


var get2 = new getJSON('https://www.bit-z.com/api_v1/tickerall', function (error, response) {
    if (error) throw error;

    fs.writeFile("./data/bitz.txt", JSON.stringify(response), function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        //good data

    });


    bitzData.push({
        "symbol": "eth_btc",
        "last": response.data.eth_btc.last
    });
    database.ref("/bitz/eth_btc").set(
        {
            "symbol": "eth_btc",
            "last": response.data.eth_btc.last,
            "taker": "0.1%",
            "withdraw": "0.01"
        }
    );
    bitzData.push({
        "symbol": "bch_btc",
        "last": response.data.bch_btc.last
    });
    database.ref("/bitz/bch_btc").set(
        {
            "symbol": "bch_btc",
            "last": response.data.bch_btc.last,
            "taker": "0.1%",
            "withdraw": "0.0001"
        }
    );
    bitzData.push({
        "symbol": "dash_btc",
        "last": response.data.dash_btc.last
    });
    database.ref("/bitz/dash_btc").set(
        {
            "symbol": "dash_btc",
            "last": response.data.dash_btc.last,
            "taker": "0.1%",
            "withdraw": "0.002"
        }
    );
    bitzData.push({
        "symbol": "ltc_btc",
        "last": response.data.ltc_btc.last
    });
    database.ref("/bitz/ltc_btc").set(
        {
            "symbol": "ltc_btc",
            "last": response.data.ltc_btc.last,
            "taker": "0.1%",
            "withdraw": "0.01"
        }
    );
    bitzData.push({
        "symbol": "zec_btc",
        "last": response.data.zec_btc.last
    });
    database.ref("/bitz/zec_btc").set(
        {
            "symbol": "zec_btc",
            "last": response.data.zec_btc.last,
            "taker": "0.1%",
            "withdraw": "0.005"
        }
    );
    //good data
    fs.writeFile("./data/bitzData.txt", JSON.stringify(bitzData), function (err) {
        if (err) throw err;

    });
});

var get3 = new getJSON('https://api.kucoin.com/v1/open/tick', function (error, response) {
    if (error) throw error;

    fs.writeFile("./data/kucoin.txt", JSON.stringify(response), function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        //good data

    });

    response.data.find(function (element) {
        if (element.symbol === "ETH-BTC") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
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
    fs.writeFile("./data/kucoinData.txt", JSON.stringify(kucoinData), function (err) {
        if (err) throw err;

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

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get('/blockchain',function(req,res){ //outputs

//     res.json(blockchain);

//   });




app.get('/kucoin/', function (req, res) {
    database.ref("/kucoin/").once("value").then(function (response) {
        var coins = [];
        coins = Object.keys(response.val());
        res.json(coins);
    });
});

app.get('/kucoin/:coin', function (req, res) {
    database.ref("/kucoin/").once("value").then(function (response) {
         var coins = [];
         coins = Object.keys(response.val());
         coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
    });
}); 


app.get('/coinigy/', function (req, res) {
    database.ref("/coinigy/").once("value").then(function (response) {
        var coins = [];
        coins = Object.keys(response.val());
        res.json(coins);
    });
});

app.get('/coinigy/:coin', function (req, res) {
    database.ref("/coinigy/").once("value").then(function (response) {
         var coins = [];
         coins = Object.keys(response.val());
         coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
    });
}); 

app.get('/coincap/', function (req, res) {
    database.ref("/coincap/").once("value").then(function (response) {
        var coins = [];
        coins = Object.keys(response.val());
        res.json(coins);
    });
});

app.get('/coincap/:coin', function (req, res) {
    database.ref("/coincap/").once("value").then(function (response) {
         var coins = [];
         coins = Object.keys(response.val());
         coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
    });
}); 

app.get('/changelly/', function (req, res) {
    database.ref("/changelly/").once("value").then(function (response) {
        var coins = [];
        coins = Object.keys(response.val());
        res.json(coins);
    });
});

app.get('/changelly/:coin', function (req, res) {
    database.ref("/changelly/").once("value").then(function (response) {
         var coins = [];
         coins = Object.keys(response.val());
         coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
    });
}); 


app.get('/bitz/', function (req, res) {
    database.ref("/bitz/").once("value").then(function (response) {
        var coins = [];
        coins = Object.keys(response.val());
        res.json(coins);
    });
});

app.get('/bitz/:coin', function (req, res) {
    database.ref("/bitz/").once("value").then(function (response) {
         var coins = [];
         coins = Object.keys(response.val());
         coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
    });
}); 

app.get('/bisq/', function (req, res) {
    database.ref("/bisq/").once("value").then(function (response) {
        var coins = [];
        coins = Object.keys(response.val());
        res.json(coins);
    });
});

app.get('/bisq/:coin', function (req, res) {
    database.ref("/bisq/").once("value").then(function (response) {
         var coins = [];
         coins = Object.keys(response.val());
         coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
    });
}); 

app.get('/bibox/', function (req, res) {
    database.ref("/bibox/").once("value").then(function (response) {
        var coins = [];
        coins = Object.keys(response.val());
        res.json(coins);
    });
});

app.get('/bibox/:coin', function (req, res) {
    database.ref("/bibox/").once("value").then(function (response) {
         var coins = [];
         coins = Object.keys(response.val());
         coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
    });
}); 


    app.listen(PORT, function () {
        console.log("localhost:" + PORT);
    });


    //I have a variable which is a promise type. But the response has been dealt with. Let me test.
    //this is the main engine for doing the math and finding the pairs. I will write prototypes and include them here, as well as any node NPM

    //The first system will not be tether based. Instead it will find the lowest and highest price ratios between coin trading pairs across markets.

    //Big obstacle: populate firebase with market data input from Node.js
    //Obstacle 2: Pull a snapshot of that data and calculate the best pairs: jQuery to screen.

    //Expansion notes: It is easier to add more exchanges than coins. The exchanges picked so far all have working phone trading apps.

    //Second Expansion: Legit websites without phone apps (better deals) -- need to note this somehow on the print.

    //Say something about the $ tether ideas USDT, the Circle tether, the other overpriced tether. Provide a graph against the actual USD.
