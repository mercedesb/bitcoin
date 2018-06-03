var CLI = require("./CLI");

  function buildTable() {
    var table = $("<table class='table table-hover table-sm table-responsive'>");
    var head = $("<thead id='shapeshift'>");
    var tr = $("<tr>");
    table.append(head);
    head.append(tr);
    var shapeshift = JSON.parse(localstorage.getItem("shapeshift"));
    //Here I put the first coin
    var keys = Object.keys(shapeshift);
    for (var i = 0; i < keys.length; i++) {
        addTH(tr, keys[i].slice(0-4));
    }
    table.append(tbody);
   
    makeRow(tbody, shapeshift);

    console.log(success);
    $("#shapeshift").append(table);
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
function addTH(x,y) {
    var th = $("<th scope = row")
    th.text(y);
    x.append(th);
}
function makeRow(body, obj) {
    var tr = $("<tr>");
    var th = $("<th scope = 'row'>");
    
    var shapeshift = JSON.parse(localstorage.getItem("shapeshift"));
    //Here I put the first coin
    var keys = Object.keys(shapeshift);
    for (var i = 0; i < keys.length; i++) {
        addTR(tr, keys[i]);
        addTD(tr, shapeshift[keys[i]])
    }
    body.append(tr);
}

buildTable();

//need an on-click to refresh the serverr
//need an on-click run once 
// $("#button").on("click",function(){
//     database.ref("/coinigy/").once("value").then(function(response){
//         var COIN = [];
//         var CURR = [];
//         console.log(response);
        
//     });
// });