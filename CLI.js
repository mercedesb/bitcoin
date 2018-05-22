//require("dotenv").config();
var fs = require('fs'); // gonna write some of this shit down
//var request = require('request');
//var Coinigy = require('node-coinigy');
const shapeshift = require('shapeshift');
const coincap = require('coincap-lib');
//var keys = require("./keys.js");
//var coinigy = new Coinigy(keys.coinigy);


//----------------------------Coinigy contains private key data that I would like to keep secure, but it also contains all the data needed for the major exchanges in one place. I would like to use it if possible.
// coinigy.activity()
// .then(function (body) {
//   console.log(body.data);
//   console.log(body.notifications);
// })
// .catch(function (err) {
//   console.log(err);
// });

//----------------------------npm install node-coinigy --save


coincap.front().then(function (response) {
    fs.writeFile("coincap.txt", JSON.stringify(response), function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        console.log("coincap.txt was updated!");

    });
});
//coincap.coins().then(console.log) // ["300", "611", "888", ...]
//coincap.coinHistory('BTC', 1).then(console.log) // { market_cap: [...], ... }

//coincap will provide USD data as a constant point of evaluation. It will be compared to other tether type coins.
//1h global % increase and decrease are also useful. As well as average
//---------------------node npm install coincap-lib


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

//-----------------------------------------------------------------------------------------------------------------------------------------------------
// var http = require("http");

// var options = {
//   "method": "POST",
//   "hostname": "api.changelly.com",
//   "headers": {
//     "Content-Type": "application/json",
//     "api-key": "ed7f576df31d4bcab7742641d37f935b",
//     "sign": "4fb2405ff40d0e7874baae70687ff7e28b3ffec8f9303aed5bb205b2da871bbe"
//   }
// };

// var req = http.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     fs.writeFile("changelly.txt", JSON.stringify(body), function(err) {

//         // If the code experiences any errors it will log the error to the console.
//         if (err) {
//           return console.log(err);
//         }

//         // Otherwise, it will print: "movies.txt was updated!"
//         console.log("changelly.txt was updated!");
//      //Provides miners fees for all coins. Have to pull coin trade data individually.
//      });
//   });
// });

// req.write(JSON.stringify({ id: 'test',
//   jsonrpc: '2.0',
//   method: 'getCurrenciesFull',
//   params: {} }));
// req.end();
//----------------------------------------------------------------------------------------


var getJSON = require('get-json');



var get1 = new getJSON('https://api.bibox.com/v1/mdata?cmd=marketAll', function (error, response) {
    if (error) throw error;

    fs.writeFile("bibox.txt", JSON.stringify(response.result), function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        console.log("bibox.txt was updated!"); //good data

    });
});

//-----------------------PROBLEM (PROMISES??) -------------------- The first call of this NPM works, the second two return undefined. Works in postman.

var get2 = new getJSON('https://www.bit-z.com/api_v1/tickerall', function (error, response) {
    if (error) throw error;

    fs.writeFile("bitz.txt", JSON.stringify(response), function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        console.log("bitz.txt was updated!"); //good data

    });
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
});

//this is the main engine for doing the math and finding the pairs. I will write prototypes and include them here, as well as any node NPM


//The first system will not be tether based. Instead it will find the lowest and highest price ratios between coin trading pairs across markets.

//Big obstacle: populate firebase with market data input from Node.js
//Obstacle 2: Pull a snapshot of that data and calculate the best pairs: jQuery to screen.

//Expansion notes: It is easier to add more exchanges than coins. The exchanges picked so far all have working phone trading apps.

//Second Expansion: Legit websites without phone apps (better deals) -- need to note this somehow on the print.

//Say something about the $ tether ideas USDT, the Circle tether, the other overpriced tether. Provide a graph against the actual USD.