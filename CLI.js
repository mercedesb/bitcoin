//require("dotenv").config();
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


 coincap.coins().then(console.log);
//coincap.coins().then(console.log) // ["300", "611", "888", ...]
//coincap.coinHistory('BTC', 1).then(console.log) // { market_cap: [...], ... }

//coincap will provide USD data as a constant point of evaluation. It will be compared to other tether type coins.
//1h global % increase and decrease are also useful. As well as average
//---------------------node npm install coincap-lib


//---------------------node npm install --save shapeshift
 const pair = 'btc_ltc';

 shapeshift.getRate(pair)
 	.then(function(data){
        console.log(data);
 	});
 shapeshift.getLimit(pair)
 	.then(function(data){
 		const body = data.body;
        console.log(body);
 		//{"pair":"btc_ltc","limit":"1.98046131"}
 	});

 shapeshift.getCoins()
 	.then(data => {
         const coins = data.body;
         console.log(coins);
 		//{"pair":"btc_ltc","limit":"1.98046131"}
 	});







//-----------------------------------------------------------------------------------------------------------------------------------------------------
var http = require("http");

var options = {
  "method": "POST",
  "hostname": "api.changelly.com",
  "headers": {
    "Content-Type": "application/json",
    "api-key": "ed7f576df31d4bcab7742641d37f935b",
    "sign": "4fb2405ff40d0e7874baae70687ff7e28b3ffec8f9303aed5bb205b2da871bbe"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ id: 'test',
  jsonrpc: '2.0',
  method: 'getCurrenciesFull',
  params: {} }));
req.end();
//----------------------------------------------------------------------------------------








//this is the main engine for doing the math and finding the pairs. I will write prototypes and include them here, as well as any node NPM


//The first system will not be tether based. Instead it will find the lowest and highest price ratios between coin trading pairs across markets.

//Big obstacle: populate firebase with market data input from Node.js
//Obstacle 2: Pull a snapshot of that data and calculate the best pairs: jQuery to screen.

//Expansion notes: It is easier to add more exchanges than coins. The exchanges picked so far all have working phone trading apps.

//Second Expansion: Legit websites without phone apps (better deals) -- need to note this somehow on the print.

//Say something about the $ tether ideas USDT, the Circle tether, the other overpriced tether. Provide a graph against the actual USD.