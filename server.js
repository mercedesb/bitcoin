const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
var resolve = require("./logic.js");
var { Combo, Exchange, News, Usd } = require('./models');
const keys = require("./keys");
var VerifyToken = require('./auth/VerifyToken.js');
global.__root   = __dirname + '/';

const mongoose = require('mongoose');
var database = 'coindb';
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/" + database);

let promiseNews = resolve.news();
let promiseUsd = resolve.usd();
let promiseSlowest = resolve.coins();
recall();
setInterval(()=>recall(), 300000);
function recall() { Promise.all([promiseNews, promiseUsd]).then(([newsData, usdData]) => {


  promiseSlowest.then((lastData) => {
    //console.log(newsData);
    for (var i = 0; i < lastData.length; i++) {
      Exchange.create(lastData[i]).then((dbLast) => { }).catch((err) => console.log(err));
    }
    // console.log(News);
    for (var i = 0; i < newsData.length; i++) {
      News.create(newsData[i]).then((dbNews) => { }).catch((err) => console.log(err));
    }
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
          //console.log(container);
          for (let j = 0; j < container.length; j++) {
            Combo.create(container[j]).then((dbCombo) => {  }).catch((err) => console.log(err));
          }
        }
      }).catch((err) => console.log(err));
    });

  });


});
}



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("client/public"));
}

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

app.get("/api/news", (req,res)=>{
  News.find({}).sort({date:-1}).limit(20).then((data)=>{
    //console.log(data);
    res.json(data);
  });
});

app.get("/api/cards", VerifyToken, (req,res)=>{
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
