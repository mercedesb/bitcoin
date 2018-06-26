const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
var resolve = require("./logic.js");

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
mongoose.Promise = global.Promise;


//This promise resolution probably needs to be chained down below.
var database1 = 'coindb';
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/" + database1);
var db = mongoose.connection;
db.once('open', () => console.log(`Now opening ${database1} we've got signal!`))
    .on('error', (error) => { console.warn('Warning:', error) });

//connected to mongoose. Throw error on disconnect.
var newsArray = [];
let promiseNews = resolve.news();
let promiseSlowest = resolve.coins();
Promise.all([promiseNews]).then(([newsData]) => {

          
          promiseSlowest.then((lastData) => {
            console.log(newsData);
            console.log(lastData);
            // data1, data2, data3, lastData all will be defined here
         })
      
    });

    console.log(newsArray);
//console.log(promiseNews +" "+ promiseCoins);

 
//  Promise.all([ promiseOther1, promiseOther2, promiseOther3 ]).then([data1, 
//  data2, data3] => {
//     promiseSlowest.then(lastData => {
//        // data1, data2, data3, lastData all will be defined here
//     })
//  })

// let news = resolve.news;
// console.log(news);
// let coins = resolve.coins;
// console.log(coins);


// const firebasePromise = [];

// // Serve up static assets (usually on heroku)



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



// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });



app.listen(PORT, function () {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});
