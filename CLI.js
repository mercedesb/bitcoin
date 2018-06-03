var firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "AIzaSyD6V2x_61X1qWxBuQJJh6VpgrocReek6Bk",
    authDomain: "bitcoin-2-e029a.firebaseapp.com",
    databaseURL: "https://bitcoin-2-e029a.firebaseio.com",
    projectId: "bitcoin-2-e029a",
    storageBucket: "",
    messagingSenderId: "195092768796"
});

//var stream = require('stream');
//var es = require('event-stream')
//require("dotenv").config();
//var fs = require('fs') // gonna write some of this shit down
//var request = require('request');

const shapeshift = require('shapeshift');
const coincap = require('coincap-lib');
var Combinatorics = require('js-combinatorics');
var getJSON = require('get-json');
//var keys = require("./keys.js");
//var coinigy = new Coinigy(keys.coinigy);
const database = firebase.database();
var firebasePromise = [];

//these arrays should have arrays as items, [coin, price, exchange]. Price needs to be grabbed first, maybe new API?




//----------------------------Coinigy contains private key data that I would like to keep secure, but it also contains all the data needed for the major exchanges in one place. I would like to use it if possible.
const request = require('request');


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


//This is the basic averages.

coincap.front().then(function (response) {
    response.find(function (element) {
        if (element.short === "BTC") {
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
            database.ref("/coincap/ZEC").set(
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





//-----------------------------------------------------------------------------------------------------
//get-Json 



// var get1 = new getJSON('https://api.bibox.com/v1/mdata?cmd=marketAll', function (response) {
//     response.result.find(function (element) {
//         if (element.coin_symbol === "BCH" && element.currency_symbol === "BTC") {
//             database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
//                 {
//                     "coin_symbol": element.coin_symbol,
//                     "currency_symbol": element.currency_symbol,
//                     "last": element.last,
//                     "taker": "0.1%",
//                     "withdraw": "0.005"
//                 }
//             );

//         }
//     });
//     response.result.find(function (element) {
//         if (element.coin_symbol === "BCH" && element.currency_symbol === "ETH") {
//             database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
//                 {
//                     "coin_symbol": element.coin_symbol,
//                     "currency_symbol": element.currency_symbol,
//                     "last": element.last,
//                     "taker": "0.1%",
//                     "withdraw": "0.005"
//                 }
//             );
//         }
//     });
//     response.result.find(function (element) {
//         if (element.coin_symbol === "DASH" && element.currency_symbol === "BTC") {
//             database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
//                 {
//                     "coin_symbol": element.coin_symbol,
//                     "currency_symbol": element.currency_symbol,
//                     "last": element.last,
//                     "taker": "0.1%",
//                     "withdraw": "0.001"
//                 }
//             );
//         }
//     });
//     response.result.find(function (element) {
//         if (element.coin_symbol === "DASH" && element.currency_symbol === "ETH") {
//             database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
//                 {
//                     "coin_symbol": element.coin_symbol,
//                     "currency_symbol": element.currency_symbol,
//                     "last": element.last,
//                     "taker": "0.1%",
//                     "withdraw": "0.001"
//                 }
//             );
//         }
//     });
//     response.result.find(function (element) {
//         if (element.coin_symbol === "LTC" && element.currency_symbol === "BTC") {
//             database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
//                 {
//                     "coin_symbol": element.coin_symbol,
//                     "currency_symbol": element.currency_symbol,
//                     "last": element.last,
//                     "taker": "0.1%",
//                     "withdraw": "0.005"
//                 }
//             );
//         }
//     });
//     response.result.find(function (element) {
//         if (element.coin_symbol === "LTC" && element.currency_symbol === "ETH") {
//             database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
//                 {
//                     "coin_symbol": element.coin_symbol,
//                     "currency_symbol": element.currency_symbol,
//                     "last": element.last,
//                     "taker": "0.1%",
//                     "withdraw": "0.005"
//                 }
//             );
//         }
//     });
//     response.result.find(function (element) {
//         if (element.coin_symbol === "NEO" && element.currency_symbol === "BTC") {
//             database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
//                 {
//                     "coin_symbol": element.coin_symbol,
//                     "currency_symbol": element.currency_symbol,
//                     "last": element.last,
//                     "taker": "0.1%",
//                     "withdraw": false
//                 }
//             );
//         }
//     });
//     response.result.find(function (element) {
//         if (element.coin_symbol === "NEO" && element.currency_symbol === "ETH") {
//             database.ref("/bibox/" + element.coin_symbol + "_" + element.currency_symbol).set(
//                 {
//                     "coin_symbol": element.coin_symbol,
//                     "currency_symbol": element.currency_symbol,
//                     "last": element.last,
//                     "taker": "0.1%",
//                     "withdraw": false
//                 }
//             );
//         }
//     });
//     //good data
// });


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


// app.get('/blockchain',function(req,res){ //outputs

//     res.json(blockchain);

//   });


firebasePromise.push(database.ref("/shapeshift/").once("value"));

// app.get('/kucoin/', function (req, res) {
firebasePromise.push(database.ref("/kucoin/").once("value"));
// PROMISE 0
// then(function (response) {
//     var coins = [];
//     coins = Object.keys(response.val());
//     res.json(coins);
// });
// });

// app.get('/kucoin/:coin', function (req, res) {

// firebasePromise.push(database.ref("/kucoin/").once("value"));

// PROMISE 1
// then(function (response) {
//      var coins = [];
//      coins = Object.keys(response.val());
//      coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
// });
// }); 


// app.get('/coinigy/', function (req, res) {
firebasePromise.push(database.ref("/coinigy/").once("value"));

// PROMISE 2
// .then(function (response) {
//     var coins = [];
//     coins = Object.keys(response.val());
//     res.json(coins);
// });
// });

// app.get('/coinigy/:coin', function (req, res) {
// firebasePromise.push(database.ref("/coinigy/").once("value"));

// PROMISE 3
// .then(function (response) {
//      var coins = [];
//      coins = Object.keys(response.val());
//      coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
// });
// }); 

// app.get('/coincap/', function (req, res) {
//firebasePromise.push(database.ref("/coincap/").once("value"));

// PROMISE 4
// .then(function (response) {
//     var coins = [];
//     coins = Object.keys(response.val());
//     res.json(coins);
// });
// });

// app.get('/coincap/:coin', function (req, res) {
// firebasePromise.push(database.ref("/coincap/").once("value"));

// PROMISE 5
// .then(function (response) {
//      var coins = [];
//      coins = Object.keys(response.val());
//      coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
// });
// }); 

// app.get('/changelly/', function (req, res) {
firebasePromise.push(database.ref("/changelly/").once("value"));

// PROMISE 6
// .then(function (response) {
//     var coins = [];
//     coins = Object.keys(response.val());
//     res.json(coins);
// });
// });

// app.get('/changelly/:coin', function (req, res) {
// firebasePromise.push(database.ref("/changelly/").once("value"));

// PROMISE 7
// .then(function (response) {
//      var coins = [];
//      coins = Object.keys(response.val());
//      coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
// });
// }); 


// app.get('/bitz/', function (req, res) {
firebasePromise.push(database.ref("/bitz/").once("value"))

// PROMISE 8
// .then(function (response) {
//     var coins = [];
//     coins = Object.keys(response.val());
//     res.json(coins);
// });
// });

// app.get('/bitz/:coin', function (req, res) {
// firebasePromise.push(database.ref("/bitz/").once("value"));

// PROMISE 9
// .then(function (response) {
//      var coins = [];
//      coins = Object.keys(response.val());
//      coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
// });
// }); 

// app.get('/bisq/', function (req, res) {
firebasePromise.push(database.ref("/bisq/").once("value"));

// PROMISE 10
// .then(function (response) {
//     var coins = [];
//     coins = Object.keys(response.val());
//     res.json(coins);
// });
// });

// app.get('/bisq/:coin', function (req, res) {

firebasePromise.push(database.ref("/bisq/").once("value"))

// PROMISE 11
// .then(function (response) {
//      var coins = [];
//      coins = Object.keys(response.val());
//      coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
// });
// }); 

// app.get('/bibox/', function (req, res) {
firebasePromise.push(database.ref("/bibox/").once("value"));

// PROMISE 12
// .then(function (response) {
//     var coins = [];
//     coins = Object.keys(response.val());
//     res.json(coins);
// });
// });

// app.get('/bibox/:coin', function (req, res) {


// firebasePromise.push(database.ref("/bibox/").once("value"));

// PROMISE 12
// .then(function (response) {
//      var coins = [];
//      coins = Object.keys(response.val());
//      coins.forEach(function(value){console.log(value.toLowerCase()); console.log(req.params.coin); if(value.toLowerCase() === req.params.coin.toLowerCase()){res.json(response.child(value).val())}});
// });
// }); 

Promise.all(firebasePromise).then(function (values) {
    var coins = [];
    for (var i = 3; i < values.length; i++) {
        coins.push(Object.keys(values[i].val()));
    }
    var mergedCoins = [].concat.apply([], coins);
    mergedCoins = uniq(mergedCoins);
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
    console.log(shapeshiftTrading);
    console.log(shapeshiftMinerFee);

});

function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

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
