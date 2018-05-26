//require("dotenv").config();
var fs = require('fs'); // gonna write some of this shit down
//var request = require('request');
const shapeshift = require('shapeshift');
const coincap = require('coincap-lib');
//var keys = require("./keys.js");
//var coinigy = new Coinigy(keys.coinigy);

var coinigyData = [];
var coincapData = [];
var biboxData = [];
var kucoinData = [];
var bitzData = [];
//----------------------------Coinigy contains private key data that I would like to keep secure, but it also contains all the data needed for the major exchanges in one place. I would like to use it if possible.
var request = require('request');

request({
  method: 'POST',
  url: 'https://api.coinigy.com/api/v1/userWatchList',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': '2f1198cd7540ad52b584cfcc21a1e476',
    'X-API-SECRET': 'f021026e7281dfcb05220dfe299e38b6'
  }}, function (error, response, body) {
      if(error) throw error;
    fs.writeFile("coinigy.txt", body, function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        console.log("coinigy.txt was updated!");

    });
    //------------NEW CODE------------GRABBING FIRST SET OF DATA
     
    JSON.parse(body).data.forEach(function(element) {
        coinigyData.push({
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


coincap.front().then(function (response) {
    fs.writeFile("coincap.txt", JSON.stringify(response), function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("coincap.txt was updated!");

    });
    response.find(function(element){
        if(element.short === "BTC") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "ETH") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "BCH") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "DASH") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "LTC") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "NEO") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "STEEM") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "XLM") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "XMR") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "XRP") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    response.find(function(element){
        if(element.short === "ZEC") {
            coincapData.push(
                {
                    "cap24hrChange": element.cap24hrChange,
                    "short": element.short,
                    "price": element.price
                }
            );
        }
    });
    //good data
});


//---------------------node npm install --save shapeshift
//  const pair = 'btc_ltc';

//  shapeshift.getRate(pair)
//  	.then(function(data){
//         console.log(data);
//  	});
//  shapeshift.getLimit(pair)
//  	.then(function(data){
//  		const body = data.body;
//         console.log(body);
//  		//{"pair":"btc_ltc","limit":"1.98046131"}
//  	});

shapeshift.getCoins()
    .then(data => {
        const coins = data.body;
        fs.writeFile("shapeshift.txt", JSON.stringify(coins), function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "movies.txt was updated!"
            console.log("shapeshift.txt was updated!");
            //Provides miners fees for all coins. Have to pull coin trade data individually.
        });
    });





var Changelly = require('./lib.js');

var changelly = new Changelly(
    'ed7f576df31d4bcab7742641d37f935b',
    '4fb2405ff40d0e7874baae70687ff7e28b3ffec8f9303aed5bb205b2da871bbe'
);

//will have to call for each XXXYYY (correct data)
changelly.getExchangeAmount('btc', 'eth', 1, function (err, data) {
    if (err) {
        console.log('Error!', err);
    } else {
        fs.writeFile("changellyBTCETH.txt", JSON.stringify(data), function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            console.log("changellyBTCETH.txt was updated!"); //good data

        });
    }
});

changelly.getCurrencies(function (err, data) {
    if (err) {
        console.log('Error!', err);
    } else {
        fs.writeFile("changellycurrencies.txt", JSON.stringify(data), function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            console.log("changellyminerfee.txt was updated!"); //good data

        });
    }
});


var getJSON = require('get-json');



var get1 = new getJSON('https://api.bibox.com/v1/mdata?cmd=marketAll', function (error, response) {
    if (error) throw error;

    fs.writeFile("bibox.txt", JSON.stringify(response.result), function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("bibox.txt was updated!"); //good data

    });
    response.result.find(function(element){
        if(element.coin_symbol === "BCH" && element.currency_symbol === "BTC") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
        }
    });
    response.result.find(function(element){
        if(element.coin_symbol === "BCH" && element.currency_symbol === "ETH") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
        }
    });
    response.result.find(function(element){
        if(element.coin_symbol === "DASH" && element.currency_symbol === "BTC") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
        }
    });
    response.result.find(function(element){
        if(element.coin_symbol === "DASH" && element.currency_symbol === "ETH") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
        }
    });
    response.result.find(function(element){
        if(element.coin_symbol === "LTC" && element.currency_symbol === "BTC") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
        }
    });
    response.result.find(function(element){
        if(element.coin_symbol === "LTC" && element.currency_symbol === "ETH") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
        }
    });
    response.result.find(function(element){
        if(element.coin_symbol === "NEO" && element.currency_symbol === "BTC") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
        }
    });
    response.result.find(function(element){
        if(element.coin_symbol === "NEO" && element.currency_symbol === "ETH") {
            biboxData.push(
                {
                    "coin_symbol": element.coin_symbol,
                    "currency_symbol": element.currency_symbol,
                    "last": element.last
                }
            );
        }
    });
    //good data
});


var get2 = new getJSON('https://www.bit-z.com/api_v1/tickerall', function (error, response) {
    if (error) throw error;

    fs.writeFile("bitz.txt", JSON.stringify(response), function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        console.log("bitz.txt was updated!"); //good data

    });
    

    bitzData.push({
        "symbol": "eth_btc",
        "last": response.data.eth_btc.last
    });
    bitzData.push({
        "symbol": "bch_btc",
        "last": response.data.bch_btc.last
    });
    bitzData.push({
        "symbol": "dash_btc",
        "last": response.data.dash_btc.last
    });
    bitzData.push({
        "symbol": "ltc_btc",
        "last": response.data.ltc_btc.last
    });
    bitzData.push({
        "symbol": "zec_btc",
        "last": response.data.zec_btc.last
    });
    //good data
});

var get3 = new getJSON('https://api.kucoin.com/v1/open/tick', function (error, response) {
    if (error) throw error;

    fs.writeFile("kucoin.txt", JSON.stringify(response), function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        console.log("kucoin.txt was updated!"); //good data

    });

    response.data.find(function(element){
        if(element.symbol === "ETH-BTC") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    response.data.find(function(element){
        if(element.symbol === "BCH-BTC") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    response.data.find(function(element){
        if(element.symbol === "BCH-ETH") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    response.data.find(function(element){
        if(element.symbol === "DASH-BTC") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    response.data.find(function(element){
        if(element.symbol === "DASH-ETH") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    response.data.find(function(element){
        if(element.symbol === "LTC-BTC") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    response.data.find(function(element){
        if(element.symbol === "LTC-ETH") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    response.data.find(function(element){
        if(element.symbol === "NEO-BTC") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    response.data.find(function(element){
        if(element.symbol === "NEO-ETH") {
            kucoinData.push(
                {
                    "symbol": element.symbol,
                    "lastDealPrice": element.lastDealPrice,
                    "feeRate": element.feeRate
                }
            );
        }
    });
    //kucoin ok
});

//this is the main engine for doing the math and finding the pairs. I will write prototypes and include them here, as well as any node NPM


//The first system will not be tether based. Instead it will find the lowest and highest price ratios between coin trading pairs across markets.

//Big obstacle: populate firebase with market data input from Node.js
//Obstacle 2: Pull a snapshot of that data and calculate the best pairs: jQuery to screen.

//Expansion notes: It is easier to add more exchanges than coins. The exchanges picked so far all have working phone trading apps.

//Second Expansion: Legit websites without phone apps (better deals) -- need to note this somehow on the print.

//Say something about the $ tether ideas USDT, the Circle tether, the other overpriced tether. Provide a graph against the actual USD.