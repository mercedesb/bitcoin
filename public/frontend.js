  async function buildTable() {
      console.log("starting function: build table");
    var table = $("<table class='table table-hover table-sm table-responsive'>");
    var head = $("<thead id='shapeshift'>");
    var tr = $("<tr>");
    table.append(head);
    head.append(tr);
    
    const shapeshift = await fetchShapeshift();

    //var shapeshift = JSON.parse(localStorage.getItem("shapeshift"));
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
function addTH2(x,y) {
    var th = $("<th scope = row")
    th.text(y);
    x.append(th);
}
function makeRow(body, obj) {
    var tr = $("<tr>");
    var th = $("<th scope = 'row'>");
    
   //THIS IS WHERE I GET ASYNC SHAPESHIFT DATA
    //Here I put the first coin
    var keys = Object.keys(shapeshift);
    for (var i = 0; i < keys.length; i++) {
        addTH2(tr, keys[i]);
        addTD(tr, shapeshift[keys[i]])
    }
    body.append(tr);
}

buildTable();

//WORK UNDERNEATH HERE --------------------------------------- THIS IS MY TABLE!!!

// $('#myButton').click(function() {
//     //optionally remove the 500 (which is time in milliseconds) of the
//     //scrolling animation to remove the animation and make it instant
//     $.scrollTo($('#myDiv'), 500);
//  });

//need an on-click to refresh the serverr
//need an on-click run once 
// $("#button").on("click",function(){
//     database.ref("/coinigy/").once("value").then(function(response){
//         var COIN = [];
//         var CURR = [];
//         console.log(response);
        
//     });
// });