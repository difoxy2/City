/*
  Can change how many tables in a row / column (numberOfRowsInPlan / numberOfColsInPlan)
  
  Cannot change how many rows / columns in a table (numberOfRowsInTable / numberOfColsInTable), fixed at 11 & 12
  
  making of indexs:
        //indexOfTableIDvsHKCECplan: Remember tables are arranged as snake biscuit(s shape): for 3x7= 21 tables, 8th table is under 7th table, not under 1st table (number of items in index = How many Tables are there)
        
        //indexOfrowvsHKCErow: simplest, just [A, ... ,Z,AA, ... ,ZZ, ... ,the last one] (number of items in index = number of global rows)
        
        //indexOfcolvsHKCEcol: 1.Remember tables are arranged as snake biscuit(s shape) 
                               2. A = 1st item / B = 2nd item / C = 12th item / D = 13th item / E = 14th item / F = last item (i.e. 24th)
                               
                               ABo  ooo  ooo  ooC
                               ABo  ooo  ooo  ooC
                               ABo  ooo  ooo  ooC
                               
                               ooF  ooo  ooo  DEo
                               ooF  ooo  ooo  DEo
                               ooF  ooo  ooo  DEo   (number of items in index = number of global columns X how many tables in a column)
                               
                               
*/
//----------------------------Scripts starting from here----------------------------\\
//----------------------------Scripts starting from here----------------------------\\

//constant variables
var x = 0;
var y = 0;
var cursor = 0;
//var tableid = 1;
var tableid = 0;

var labels = [];
var lengths = [];
var colors = [];

var horizontalSpaceBetweenTabble = 370;
var verticalSpaceBetweenTabble = 390;

//var numberOfRowsInTable = 11; //not useful because table position is fixed
//var numberOfColsInTable = 12; //not useful because table position is fixed
var numberOfRowsInPlan = 3;
var numberOfColsInPlan = 7;

function pushArrayIntoArrays(big,small1,small2){
console.log(big);
//small1 & small2 = []
do {
    small1.shift();
}
    while(small1.length > 0);
do {
    small2.shift();
}
    while(small2.length > 0);

//actual pushing
do {
small1.push(big[0]);
big.shift();
small2.push(big[0]);
big.shift();
}
while (big.length > 0);

}

//not needed in this version
function Undo(){
//not needed in this version
resetresultArea();
    
    labels.pop();
    lengths.pop();
    colors.pop();
    console.log(labels);
    console.log(lengths);
    console.log(colors);

    
    for(var i=0; i<colors.length; i++){
        arcteryx(labels[i],lengths[i],colors[i]);
    }
    cursor = 0;
}


function myFunction(){
    resetresultArea();
    
    var x = document.getElementById("lablen").value.split(/\s+|\n+/g);
    
    //pushing textarea to labels & lengths
    pushArrayIntoArrays(x,labels,lengths);

    
    //pushing corresponding colors
    do {
    colors.shift();
}
    while(colors.length > 0);
    
    for(var i=0; i<labels.length; i++){
        if(labels[i] == 0){colors.push("black");}
        else{
            if(Math.floor(labels[i] % 2) == 0){colors.push("#99bbff");}else{colors.push("#0055ff");}
        }
    }
    
       
    
    console.log(labels);
    console.log(lengths);
    console.log(colors);
    

    
    for(var i=0; i<colors.length; i++){
        arcteryx(labels[i],lengths[i],colors[i]);
    }
    cursor = 0;

}


function arcteryx(lab,len,col) {
    
    //fill color
    var cursorInstant = cursor;
    for(var i=cursorInstant; i<(+len+cursorInstant); i++){
        
        x = Math.floor((i%132) / 12);
        y = i%12;
        
        //if(Math.floor((i+1)/132)==tableid){
        //    createTable11x12();
        //}
        
        var a = "myTable" + Math.floor(i/132);
        //document.getElementById(a).rows[x].cells[y].style.backgroundColor =  col;
        //document.getElementById(a).rows[x].cells[y].innerHTML =  lab;
        fillCell(x,y,a,col,lab);
        cursor = i+1;
    }
}



function fillCell(x,y,w,a,b) {
    document.getElementById(w).rows[x].cells[y].style.backgroundColor =  a;
    document.getElementById(w).rows[x].cells[y].innerHTML =  b;
    //document.getElementById(w).rows[x].cells[y].innerHTML = document.getElementById(w).rows[x].cells[y].cellIndex +1;
}


function resetresultArea(){
    document.getElementById("resultArea").innerHTML = "";
    tableid = "0";
    for(var i=0; i< numberOfRowsInPlan * numberOfColsInPlan; i++){
        createTable11x12();
    }
    
    document.getElementById("myTable0").style.border = "3px solid red";
    document.getElementById("myTable1").style.border = "3px solid red";
    document.getElementById("myTable2").style.border = "3px solid red";
    document.getElementById("myTable3").style.border = "3px solid red";
    document.getElementById("myTable6").style.border = "3px solid red";
    document.getElementById("myTable14").style.border = "3px solid red";
    document.getElementById("myTable20").style.border = "3px solid red";
        

}

function createTable11x12() {
  document.getElementById("resultArea").style.width = 371*numberOfColsInPlan + "px";
  document.getElementById("resultArea").style.height = 393*numberOfRowsInPlan + "px";  
    
  var x = document.createElement("TABLE");
//id
  var a = "myTable" + tableid;
  x.setAttribute("id", a);
  x.setAttribute("onclick", "printCellLocation(event)");
  console.log("Table created, id = " + a);
    
//position
  //vertical
      var vspace = (Math.floor(tableid / numberOfColsInPlan)) * verticalSpaceBetweenTabble;
    
  //horizontal
    if( Math.floor(tableid / numberOfColsInPlan) % (numberOfRowsInPlan-1) == 0){
        var hspace = (tableid % numberOfColsInPlan) * horizontalSpaceBetweenTabble;
        var b = "position: absolute; left: " + hspace + "px;top: "+ vspace + "px;";
       }else{
        var hspace = (tableid % numberOfColsInPlan) * horizontalSpaceBetweenTabble +11;
        var b = "position: absolute; right: " + hspace + "px;top: "+ vspace + "px;";
       }

      x.setAttribute("style", b);


//number of row & col
  document.getElementById("resultArea").appendChild(x);

for (i=0; i<11; i++){
	var row = x.insertRow(-1);
	for (j=0; j<12;j++){
        var cell1 = row.insertCell(-1);
        var a = "00";
        cell1.innerHTML = a;
    }
}
    
    tableid++;
}



//-------------Functions of Cell Detail Printing starting from here-------------\\
//-------------Functions of Cell Detail Printing starting from here-------------\\
//-------------Functions of Cell Detail Printing starting from here-------------\\

//constant variables
//var relativeTableID = 0;
//var relativeRowNumber = 0;
//var relativeColNumber = 0;
var indexOfTableIDvsHKCECplan = [12,13,14,15,16,17,18,28,27,26,25,24,23,22,32,33,34,35,36,37,38];
var indexOfrowvsHKCErow = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "BB", "CC", "DD", "EE", "FF", "GG"];
var indexOfcolvsHKCEcol = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94"];



function printCellLocation(event) { 
var t = event.target.parentNode.parentNode.parentNode.id.replace("myTable", ""); //t = TableId(0-20)
    
var relRow = event.target.parentNode.rowIndex+1;
var absRow = +relRow + Math.floor(t/numberOfColsInPlan)*11;
    
var relCol = event.target.cellIndex +1;
    if( Math.floor(t / numberOfColsInPlan) % (numberOfRowsInPlan-1) == 0){
        var absCol = +relCol + (t%numberOfColsInPlan) * 12;
       }else{
        var absCol = +relCol + ((t%numberOfColsInPlan) * -1 + (numberOfColsInPlan-1)) * 12;
       }

document.getElementById("printDetailOfClickedCell").innerHTML += "<br>" + event.target.innerHTML + " " + indexOfTableIDvsHKCECplan[t] + " " + indexOfrowvsHKCErow[absRow-1] + " " + indexOfcolvsHKCEcol[absCol-1];
    
}

function removeLastLine() {
    var str = document.getElementById("printDetailOfClickedCell").innerHTML;
    var res = str.substr(0, str.lastIndexOf("<br>"));
    document.getElementById("printDetailOfClickedCell").innerHTML = res;
}