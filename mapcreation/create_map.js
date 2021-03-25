fs = require('fs');

var txtFile = "./test.txt";

var size = 10; // length of one tile segment
var EXTRUSION_FACTOR = size / 75;
var tileheight = size * 2;
var tilevert = tileheight * 3 / 4;
var tilewidth = Math.sqrt(3) / 2 * tileheight;
console.log(tilevert);
console.log(tilewidth);


var hex = {};
hex.col = 17;
hex.row = 19;
var index;
var cells = [];
for (index = 0; index <= 1088; index++) {
  let [col, row] = [Math.floor(index / 33),index % 33];
  evenr_to_cube(col,row);
}
console.log(cells)
fs.writeFile('helloworld.txt', JSON.stringify(cells), function (err) {
  if (err) return console.log(err);
  console.log('Cells > ${txtFile}');
});

/*
		{
			"q": 0,
			"r": 0,
			"s": 0,
			"h": 12.7,
			"walkable": true,
			"userData": {}
    }
    */

function evenr_to_cube(col,row){
    var x = (col - (row + (row&1)) / 2)
    var z = row;
    var y = -x-z
	//var x = (col - (33 - 1) / 2) * tilewidth;
	//var y = (row - (33 - 1) / 2) * tilevert;
    
    cells.push({
        "q":x,
        "r":y,
        "s":z,
			  "h": 12.7,
			  "walkable": true,
		  	"userData": {}
    });
  }