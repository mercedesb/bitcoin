var config = {
    apiKey: "AIzaSyD6V2x_61X1qWxBuQJJh6VpgrocReek6Bk",
    authDomain: "bitcoin-2-e029a.firebaseapp.com",
    databaseURL: "https://bitcoin-2-e029a.firebaseio.com",
    projectId: "bitcoin-2-e029a",
    storageBucket: "bitcoin-2-e029a.appspot.com",
    messagingSenderId: "195092768796"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  function buildTable() {
    var table = $("<table class='table table-striped table-responsive'>");
    var head = $("<thead id='exch'>");
    var tr = $("<tr>");
    table.append(head);
    head.append(tr);
    addTH(tr, "Exchange");
    addTH(tr, "Binance");
    addTH(tr, "Bittrex");
    addTH(tr, "Cryptopia");
    addTH(tr, "GDAX");
    addTH(tr, "CEXIO");
    addTH(tr, "Kraken");
    addTH(tr, "HitBTC");
    addTH(tr, "CCEX");
    addTH(tr, "LIQUI");
    addTH(tr, "VaultORO");
    var tbody = $("<tbody>");

    table.append(tbody);
    makeRow(tbody, BCCBNB);
    makeRow(tbody, BCCBTC);
    makeRow(tbody, BCCETH);
    makeRow(tbody, BCHBTC);
    makeRow(tbody, BCHETH);
    makeRow(tbody, BTCGOLD);
    makeRow(tbody, BTCUSDT);
    makeRow(tbody, DASHBTC);
    makeRow(tbody, DASHETH);
    makeRow(tbody, DASHUSDT);
    makeRow(tbody, DASHXBT);
    makeRow(tbody, ETHBTC);
    makeRow(tbody, ETHUSDT);
    makeRow(tbody, ETHXBT);
    makeRow(tbody, LTCBNB);
    makeRow(tbody, LTCBTC);
    makeRow(tbody, LTCETH);
    makeRow(tbody, LTCUSDT);
    makeRow(tbody, LTCXBT);
    makeRow(tbody, NEOBNB);
    makeRow(tbody, NEOBTC);
    makeRow(tbody, NEOETH);
    makeRow(tbody, NEOUSDT);
    makeRow(tbody, STEEMBNB);
    makeRow(tbody, STEEMBTC);
    makeRow(tbody, STEEMETH);
    makeRow(tbody, XLMBNB);
    makeRow(tbody, XLMBTC);
    makeRow(tbody, XLMETH);
    makeRow(tbody, XLMXBT);
    makeRow(tbody, XMRXBT);
    makeRow(tbody, XMRBTC);
    makeRow(tbody, XMRETH);
    makeRow(tbody, XMRUSDT);
    makeRow(tbody, XMRXBT);
    makeRow(tbody, XRPBTC);
    makeRow(tbody, XRPETH);
    makeRow(tbody, XRPUSDT);
    makeRow(tbody, XRPXBT);
    makeRow(tbody, ZECBTC);
    makeRow(tbody, ZECETH);
    makeRow(tbody, ZECUSDT);
    makeRow(tbody, ZECXBT);
    $(".arbitrage").append(table);
}

function addTH(x, y) {
    var th = $("<th scope='col'>");
    th.text(y);
    x.append(th);
}
function addTD(x, y) {
    var td = $("<td>");
    td.text(y);
    x.append(td);
}
function makeRow(body, obj) {
    var tr = $("<tr>");
    var th = $("<th scope = 'row'>");
    th.text(obj.name);
    tr.append(th);
    addTD(tr, obj.capPrice);
    addTD(tr, obj.change1h);
    addTD(tr, obj.change24h);
    addTD(tr, obj.binance);
    addTD(tr, obj.bitsquare);
    addTD(tr, obj.bittrex);
    addTD(tr, obj.cryptopia);
    addTD(tr, obj.gateio);
    addTD(tr, obj.gdax);
    addTD(tr, obj.gemini);
    addTD(tr, obj.poloniex);
    addTD(tr, obj.shapeshift);
    addTD(tr, obj.whale);
    addTD(tr, obj.yobit);
    body.append(tr);
}

//need an on-click to refresh the serverr
//need an on-click run once 
$("#button").on("click",function(){
    database.ref("/coinigy/").once("value").then(function(response){
        var COIN = [];
        var CURR = [];
        console.log(response);
        
    });
});