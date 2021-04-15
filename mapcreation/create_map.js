fs = require('fs');
const sqlite3 = require('sqlite3').verbose();


let db = null;

let index;
let cells = [];
let stringToWrite;

main();

async function main() {
    db = await new sqlite3.Database('./dataEtheria.db', sqlite3.OPEN_READONLY, async (err) => {
    if (err) {
        console.error(err.message);
    }
    await console.log('Connected to the Etheria database.');
});
    for (index = 0; index <= 1088; index++) {
        let [col, row] = [Math.floor(index / 33),index % 33];
        await evenr_to_cube(col,row);
    }
    //let stringifycells = JSON.stringify(cells);
	let stringifycells = JSON.stringify(cells, (key, value) => {
	  if (value instanceof Array) {
		return [...value.values()];
	  }
	  return value;
	});
    stringToWrite = {
        "size": 5,
        "cellSize": 10,
        "extrudeSettings": {
            "amount": 1,
            "bevelEnabled": true,
            "bevelSegments": 1,
            "steps": 1,
            "bevelSize": 0.5,
            "bevelThickness": 0.5,
            "arrays": {
                "position": [],
                "uv": [],
                "index": []
            }
        },
        "autogenerated": false,
        "cells": cells
    };
    console.log(JSON.stringify(stringToWrite));

    // Write to File
        fs.writeFile('../hex-map.json', JSON.stringify(stringToWrite), function (err) {
            if (err) return console.log(err);
            console.log('Cells > ${txtFile}');
        });
}

async function evenr_to_cube(col,row){
    var x = (col - (row - (row&1)) / 2)-8;
    var z = row-10;
    var y = -x-z+10;
    let elevation = await getElevation(1.1,col,row);
    let blocks = await getBlocks(1.1,col,row);
	let blockobj = JSON.parse(blocks);
	console.log(blockobj);
    var colrow = {"col": col, "row": row, "type": getTypeOfTile(elevation,row), "blocks": blockobj };
    cells.push({
        "q":x,
        "r":y,
        "s":z,
        "h": (elevation)/10,
        "walkable": true,
        "userData": colrow
    });
  }
  
async function getElevation(version,col,row) {
let elev;
 const res = await new Promise((resolve, reject) => {
	 db.all(`SELECT elevation
				   FROM tile
				   WHERE version = ?
					 AND col_tile = ?
					 AND row_tile = ?`, [version, col, row], async (err, rows) => {
		 if (err) {
			 throw err;
		 }
		 rows.forEach((row) => {
			 resolve(row.elevation);
		 });
	 });
 });

 //console.log(res);
 return res;
}
  
async function getBlocks(version,col,row) {
 const res = await new Promise((resolve, reject) => {
	 db.all(`SELECT blocks
				   FROM tile
				   WHERE version = ?
					 AND col_tile = ?
					 AND row_tile = ?`, [version, col, row], async (err, rows) => {
		 if (err) {
			 throw err;
		 }
		 rows.forEach((row) => {
			 resolve(row.blocks);
		 });
	 });
 });

 //console.log(res);
 return res;
}

function getTypeOfTile(elevation,row) {
    let type;
    let TUNDRA_PERCENTAGE = 0.08;
    let ICE_PERCENTAGE = 0.04;
    let mapsize = 33;

    if (elevation >= 125 && 						// higher than ocean level AND
        (row < (TUNDRA_PERCENTAGE * mapsize) || 			// (south of tundra threshold OR
            row > ((1 - TUNDRA_PERCENTAGE) * (mapsize - 1)))) //  north of tundra threshold)
    {
        type = "Tundra";
        if (row < (ICE_PERCENTAGE * mapsize) || row > ((1 - ICE_PERCENTAGE) * (mapsize - 1))) {
            type = "Ice";
        }
    }
    else if (elevation < 125) {
        type = "Sea";
    } else if (elevation < 135) {
        type = "Sand";
    } else if (elevation < 170) {
        type = "Grassland";
    } else if (elevation < 200) {
        type = "Hills";
    } else if (elevation <= 256) {
        type = "Mountain";
    }
    return type;
}