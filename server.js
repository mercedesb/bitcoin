const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
var resolve = require("./logic.js");
var { Combo, Exchange, News, Usd } = require('./models');

//is this the proper require??

//console.log(resolve.comboArray);

//LOGIC FOR AJAX CALLS AND CONATAINMENT

// const diff = require('deep-diff').diff; //finding differences between objects
// const axios = require('axios');
// const request = require('request');
// const shapeshift = require('shapeshift');
// const coincap = require('coincap-lib');
// var Combinatorics = require('js-combinatorics');
// var getJSON = require('get-json'); //change this to AXIOS
// var keys = require("./keys.js");
// require("dotenv").config();


//BOT AND MONGOOSE CONNECTION



const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
var database = 'coindb';
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/" + database);
// var db = mongoose.connection;
// db.once('open', () => console.log(`Now opening ${database} we've got signal!`))
//   .on('error', (error) => { console.warn('Warning:', error) });



//This promise resolution probably needs to be chained down below.

//connected to mongoose. Throw error on disconnect.
let promiseNews = resolve.news();
let promiseUsd = resolve.usd();
let promiseSlowest = resolve.coins();
Promise.all([promiseNews, promiseUsd]).then(([newsData, usdData]) => {


  promiseSlowest.then((lastData) => {
    //console.log(newsData);
    for (var i = 0; i < lastData.length; i++) {
      Exchange.create(lastData[i]).then((dbLast) => { }).catch((err) => console.log(err));
    }
    // console.log(News);
    for (var i = 0; i < newsData.length; i++) {
      News.create(newsData[i]).then((dbNews) => { }).catch((err) => console.log(err));
    }
    //console.log(usdData);
    //console.log(lastData);

    //rconsole.log(Model);
    // var priceArray = [];
    // for (var i = 0; i < lastData.length; i++) {
    //   var container = []
    //   container = Object.values(lastData[i].input)
    //   container.push(lastData[i].output);
    //   priceArray.push(container);
    // }
    //console.log(priceArray);

    // var first;
    // var last;
    // var exchangeArray = [];
    // var contain = [];
    // for (var i = 0; i < lastData.length; i++) {
    //   contain = Object.keys(lastData[i].input);
    // }
    // console.log(contain);
    // first = contain[0].match(/.*-/g);
    // last = contain[0].match(/-.*\./g);
    // console.log(first + " " + last);    
    //   for (var j = 0; j< contain.length; j+=3){
    //     var lhs = first[0];
    //     var rhs = last[0];
    //     var firstLast = []
    //     firstLast.push(lhs);
    //     firstLast.push(rhs);
    //     exchangeArray.push(firstLast);
    //   }
    // console.log(exchangeArray);
    //     var keys = Object.keys(lastData[i].input);
    //     console.log(keys);
    //     keys.forEach((val, i) => {
    //     first = val.match(/.*-/g);
    //     last = val.match(/-.*\./g);

    //     first = JSON.stringify(first);
    //     last = JSON.stringify(last);
    //     first = first.slice(2, -3);
    //     last = last.slice(3, -5);

    //     coin = JSON.stringify(vals[0].match(/.*_/g));
    //     currency = JSON.stringify(vals[0].match(/\_.*/g));
    //     coin = coin.slice(2, -3);
    //     currency = currency.slice(3, -2);
    //     //console.log(coin +" "+ currency);
    //   


    //---------------------------------------USD CONVERSION------------------------------------------------
    var usdArray = [];

    usdData.forEach((value) => {
      usdArray.push({
        coin: Object.values(value)[0],
        value: Object.values(value)[1]
      });
    });
    for (var i = 0; i < usdArray.length; i++) {
      Usd.create(usdArray[i]).then((dbUsd) => { }).catch((err) => console.log(err));
    }

    var comboObj = {
      lexchange: "",
      rexchange: "",
      coincurrency: "",
      lhs: "",
      rhs: "",
      diff: "",
      usddiff: 0,
      usdlhs: 0,
      usdrhs: 0
    }
    var comboArray = [];

    // console.log(lastData);
    lastData.forEach((value) => {
      let objVals = Object.values(value.input);
      let comboObj = {};
      comboObj.coincurrency = objVals[0];
      comboObj.lhs = objVals[1];
      comboObj.rhs = objVals[2];
      comboObj.diff = value.output;
      comboObj.lexchange = objVals[3]
      comboObj.rexchange = objVals[4]
      //console.log(comboObj);
      comboArray.push(comboObj);
    });

    //console.log(comboArray);

    comboArray.forEach((val, i, container) => {
      var currency = val.coincurrency.match(/_.*/g);
      //console.log(currency);
      var currency2 = currency[0];
      var currency2 = currency2.slice(1);


      Usd.findOne({ coin: currency2.toUpperCase() }).sort({ date: -1 }).then((resolve) => {
        var usddiff = +(+val.diff * resolve.value).toFixed(2);
        var usdlhs = +(+val.lhs * resolve.value).toFixed(2);
        var usdrhs = +(+val.rhs * resolve.value).toFixed(2);
        //console.log(comboArray);
        container[i].usddiff = usddiff;
        container[i].usdlhs = usdlhs;
        container[i].usdrhs = usdrhs;
        //console.log(usdiff);
        
        if (i === container.length - 1) {
          console.log(container);
          for (let j = 0; j < container.length; j++) {
            Combo.create(container[j]).then((dbCombo) => { console.log(dbCombo) }).catch((err) => console.log(err));
          }
        }
      }).catch((err) => console.log(err));
    });


    // lastData.forEach((val) => {
    //   var keys = Object.keys(val.input);
    //   //console.log(keys);
    //   keys.forEach((value, i) => {
    //     first = value.match(/.*-/g);
    //     last = value.match(/-.*?\./g);

    //     //console.log(typeof [1]);
    //     first = first[0];
    //     last = last[0];
    //     first = first.slice(0, -1);
    //     last = last.slice(1, -1);
    //     if (!lhsrhsEx.includes(first + " " + last)) {
    //       lhsrhsEx.push(first + " " + last);
    //     }
    //   });
    // });
    //console.log(lhsrhsEx);
  });

  // request contained the JSON of the new "todo" item to be saved
  // console.log(Model);
  //  const newUsdObj = Model.UsdModel.UsdModel(usdArray[0]);
  //  newUsdObj.save(err => {
  //    if (err) return res.status(500).send(err);
  //    return res.status(200).send(newTodoObj);
  //  });


});

//---------------------------------------------------HERE I MAKE THE $ VALUE TRANSLATIONS
// var first;
// var last;
// var coin;
// var currency;
// var combo = {};
// //console.log(lastData);
// lastData.forEach((val) => {
//   console.log(val);
//   var keys = Object.keys(val.input);
//   //console.log(keys);
//   keys.forEach((val, i) => {
// first = val.match(/.*-/g);
// last = val.match(/-.*?\./g);

//     first = JSON.stringify(first);
//     last = JSON.stringify(last);
//     first = first.slice(2, -3);
//     last = last.slice(3, -5);
//     combo["lexchange"] = first;
//     combo["rexchange"] = last;


//     var vals = Object.values(val.input);
//     //console.log(vals);
//     combo["lhs"] = vals[1];
//     combo["rhs"] = vals[2];
//     combo["diff"] = val.output;



//     coin = JSON.stringify(vals[0].match(/.*_/g));
//     currency = JSON.stringify(vals[0].match(/\_.*/g));
//     coin = coin.slice(2, -3);
//     currency = currency.slice(3, -2);
//     //console.log(coin +" "+ currency);
//     combo["coin"] = coin;
//     combo["currency"] = currency;

//   });
//   console.log(combo);
// });
//NEED TO FIND USD VALUES HERE 
// var valGamma = Object.values(usdData);
// var keyGamma = Object.keys(usdData);
// var usdArray = [];
// keyGamma.forEach((vals, i) => {
//   usdArray.push(vals + ' ' + valGamma[i])
// });
// console.log("HERE: "+ usdArray);
// for (var x in combo) {
//   if (x === "currency") {

//     //currencyPrice = currencyEvaluation(usdData, combo[x]);

//     var array = [];
//     usdData.forEach((val) => { array.push(Object.values(val)) });
//     //console.log(array);
//     array.forEach((val) => {
//       //console.log(val[0]);                        
//       if (val[0].toLowerCase() === currency) {
//         //console.log(val[1]);
//         for (var y in combo) {
//           if (y === "diff") {
//             var num = combo[y] * val[1];
//             //console.log(num);
//             combo["usddiff"] = num;
//             //console.log(combo[x].parseFloat);
//           }
//           if (y === "lhs") {
//             var num = combo[y] * val[1];
//             //console.log(num);
//             combo["usdlhs"] = num;

//             // console.log(combo[x]);
//             // console.log(num);
//           }
//           if (y === "rhs") {
//             var num = combo[y] * val[1];
//             //console.log(num);
//             combo["usdrhs"] = num;
//             //console.log(combo[x].parseFloat);
//           }
//         }
//         usdArray.push(combo);
//         //console.log(combo);
//       }
//     });


//   }
// }

// data1, data2, data3, lastData all will be defined here
// console.log(usdArray);
//Usd.find({}).then((dbUsd)=>console.log(dbUsd)).catch((err)=>console.log(err));


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("client/public"));
}
//routes file
//mongoose connection





//----------------------------------------------------------------------------------------------------------------------------------




//             // bot.on('message', (msg) => {
//             //     const chatId = msg.chat.id;

//             //     // send a message to the chat acknowledging receipt of their message

//             //     bot.sendMessage(chatId, comboArray[1]);
//             // });



//             //comboData.push(combo);
//             //console.log(comboData);
//             // bot.on('message', (msg) => {
//             //     const chatId = msg.chat.id;
//             //     comboData.forEach((value) => {
//             //         bot.sendMessage(chatId, JSON.stringify(value));
//             //     });
//             // });
//             //const combon = new ComboModel(combo);
//             //combon.save();

//             //This is where the telegram bot needs to send a message to all users.
//             //bot.sendMessage(chatId, JSON.stringify(combo));
//             // bot.on('message', (msg) => {
//             //     const chatId = msg.chat.id;

//             //     // send a message to the chat acknowledging receipt of their message
//             //     bot.sendMessage(chatId, 'Respond with card data');
//             //   });

//             //ComboModel.create(combo, function (err) {
//             //     if (err) throw err;
//             //     // saved!
//             //   });
//             // //console.log(combo);
//             //need to write to MONGODB HERE

//         // bot.on('message', (msg) => {
//         //     const chatId = msg.chat.id;
//         //     var charcount = 0;
//         //     var end = comboString.length;
//         //     for (var j = 0; charcount <= end; j+=4096) {
//         //         var one = charcount + j;
//         //         bot.sendMessage(chatId, comboString.slice(charcount, one));
//         //         charcount = charcount + j;
//         //     }
//         // });


//-------------------------------------------------------CUT FROM BELOW

// Send every request to the React app
// Define any API routes before this runs

//Do some express routing here to remove things from the server.js

//scrape route needed

app.get("/api/cards/", (req,res)=>{
  Combo.find({}).sort({date:-1}).limit(50).then((data)=>{
    res.json(data.filter(a=> +a.usddiff > 5.00 ? true : false).sort((a,b)=>b.usddiff-a.usddiff));
  })
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
