require("dotenv").config();
var request = require('request');
var Coinigy = require('node-coinigy');
const shapeshift = require('shapeshift');
var keys = require("./keys.js");
var coinigy = new Coinigy(keys.coinigy);

coinigy.activity()
.then(function (body) {
  console.log(body.data);
  console.log(body.notifications);
})
.catch(function (err) {
  console.log(err);
});

//----------------------------npm install node-coinigy --save

const coincap = require('coincap-lib')
 
//coincap.coins().then(console.log) // ["300", "611", "888", ...]
//coincap.coinHistory('BTC', 1).then(console.log) // { market_cap: [...], ... }

//coincap will provide USD data as a constant point of evaluation. It will be compared to other tether type coins.
//1h global % increase and decrease are also useful. As well as average
//---------------------node npm install coincap-lib


//---------------------node npm install --save shapeshift
// const pair = 'btc_ltc';

// shapeshift.getRate(pair)
// 	.then(function(data){
// 		//do something w/ data
// 	});
// shapeshift.getLimit(pair)
// 	.then(function(data){
// 		const body = data.body;

// 		//{"pair":"btc_ltc","limit":"1.98046131"}
// 	});

// shapeshift.getCoins()
// 	.then(data => {
// 		const coins = data.body;
// 		//{"pair":"btc_ltc","limit":"1.98046131"}
// 	});
















//this is the main engine for doing the math and finding the pairs. I will write prototypes and include them here, as well as any node NPM


//The first system will not be tether based. Instead it will find the lowest and highest price ratios between coin trading pairs across markets.

//Big obstacle: populate firebase with market data input from Node.js
//Obstacle 2: Pull a snapshot of that data and calculate the best pairs: jQuery to screen.

//Expansion notes: It is easier to add more exchanges than coins. The exchanges picked so far all have working phone trading apps.

//Second Expansion: Legit websites without phone apps (better deals) -- need to note this somehow on the print.

//Say something about the $ tether ideas USDT, the Circle tether, the other overpriced tether. Provide a graph against the actual USD.