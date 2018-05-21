//here I will write some functions I will need to use in the database manipulations

//First, we define two fixed arrays. These are our coins. They provide coin/currency trade values. Like the exchanges, these coins have been selected in advance.

const coins = [
    "BTC",
    "ETH",
    "BCC",
    "DASH",
    "LTC",
    "NEO",
    "STEEM",
    "XLM",
    "XMR",
    "XRP",
    "ZEC"
];
//BCC aka BCH
//BTC aka XBT
const tradingPairs = [
    "BCCBTC",
    "BCCETH",
    "DASHBTC",
    "DASHETH",
    "ETHBTC",
    "LTCBTC",
    "LTCETH",
    "NEOBTC",
    "NEOETH",
    "STEEMBTC",
    "STEEMETH",
    "XLMBTC",
    "XLMETH",
    "XMRBTC",
    "XMRETH",
    "XRPBTC",
    "XRPETH",
    "ZECBTC",
    "ZECETH"
];

function coincapAvg(jsonobj) {
    var prices = coins.map((x) => jsonobj.search(x).price);

    var result = Object.assign.apply({}, coins.map((v, i) => ({ [v]: prices[i] })));

    return result;
}

//ok now get shapeshift miner fees into the object in the same way

function shapeshiftMinerFees(jsonobj) {
    var fees = coins.map((x) => jsonobj.search(x).minerFee);

    var result = Object.assign.apply({}, coins.map((v, i) => ({ [v]: fees[i] })));

    return result;
}

function currencyReduction(jsonobj) {
    return coins.map((x) => jsonobj.search(x).key);
}

function pairGenerator(array) {
    var possTradingPairs = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[i] !== array[j]) {
                possTradingPairs.push(array[i].toString() + array[j].toString());
            }
        }
    }
    return possTradingPairs;    
}
//bibox will have to find currency pairs directly
//changelly needs indavidual calls for currency pairs
//coincap is good, just needs function refinement.
//shapeshift should grab fees, but need indavidual currency pair calls.

//maybe do shapeshift and changelly on their own chart, since their pairs could be different
//need a combination maker for our changelly and shapeshift functions.