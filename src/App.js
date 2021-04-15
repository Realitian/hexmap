import './App.css';
import React from "react";
import Scene from './Scene';
import HexGrid from './HexGrid';
import * as MOUSE from "./MouseCaster";
import Board from './Board';
import BlockUtils from "./MapBlockUtils";
var mapsize = 33;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

var scene;

class App extends React.Component {
  componentDidMount() {
    //let scene = new Scene(this.mount);
    scene = new Scene({
			element: this.mount,
			cameraPosition: {x:207.5, y:250, z:360}
		}, true);

	    var grid = new HexGrid();
		// var mouse = new vg.MouseCaster(scene.container, scene.camera);
		var board = new Board(grid);
		var mouse = new MOUSE.MouseCaster(scene.container, scene.camera);
		grid.load('./hex-map.json', function() {
			board.generateTilemap();
		}, this);

		scene.add(board.group);
		scene.focusOn(board.group);
		console.log(board.group);

		mouse.signal.add(function(evt, tile) {
			if (evt === MOUSE.MouseCaster.CLICK) {
				tile.toggle();
				console.log(tile.cell, tile.position);
				console.log(tile.cell.userData);
			}
		}, this);

		// this.explore();
		// update();

		// function update() {
		// 	mouse.update();
		// 	scene.render();
		// 	requestAnimationFrame(update);
		// }
    var idle = function () {
      requestAnimationFrame(idle);
      scene.animate();
	  mouse.update();
    };

    idle();
  }

  explore() {
	var version = "1.2";
	if (getUrlParameter("version") === "1.1")
		version = "1.1";

	var esk = 9000000000; // 9 billion
	if (getUrlParameter("esk") && (typeof (getUrlParameter("esk") * 1) === "number")) {
		esk = getUrlParameter("esk") * 1;
		if (9000000000 > esk && esk > 450000) {
			// ok, within acceptable range
		}
		else {
			esk = 9000000000; // it wasn't in an acceptable range, use default value
		}
	}
	if (getUrlParameter("blockNumber") && (typeof (getUrlParameter("blockNumber") * 1) === "number")) {
		esk = getUrlParameter("blockNumber") * 1;
		if (9000000000 > esk && esk > 450000) {
			// ok, within acceptable range
		}
		else {
			esk = 9000000000; // it wasn't in an acceptable range, use default value
		}
	}

	var xhr = new XMLHttpRequest();
	var uri = "https://f2225lzinf.execute-api.us-east-1.amazonaws.com/changes/list?version=" + version + "&limit=1&state=true&esk=" + esk;
	xhr.onreadystatechange = function() {
		if (this.status === 200) {
			var data = JSON.parse(this.responseText);
			var tiles = JSON.parse(data.Items[0].state);
			var blockUtils = new BlockUtils(scene, tiles, mapsize);
			for (var col = 0; col < mapsize; col++) {
				for (var row = 0; row < mapsize; row++) {

					//	    				if(NORMALIZE_ELEVATIONS)
					//	    					tiles[x][y].elevation = (tiles[x][y].elevation - min) * tiles[x][y].normalization_factor;
					blockUtils.drawMap(col, row);
					var index = col * mapsize + row;
					if (tiles[index].blocks) {
						for (var b = 0; b < tiles[index].blocks.length; b++) {
							if (tiles[index].blocks[b][3] >= 0) // z below 0 doesn't get drawn
							{
								console.log("drawing block col=" + col + " row=" + row + " " + JSON.stringify(tiles[index].blocks[b]));
								console.log("calling writeBlock " + col + "," + row +
									" which=" + tiles[index].blocks[b][0] +
									" x=" + tiles[index].blocks[b][1] +
									" y=" + tiles[index].blocks[b][2] +
									" z=" + tiles[index].blocks[b][3] +
									" color=" + tiles[index].blocks[b][4]);
								blockUtils.writeBlock(col, row, b,
									[tiles[index].blocks[b][0] * 1, // which
									tiles[index].blocks[b][1] * 1, // x
									tiles[index].blocks[b][2] * 1,  // y
									tiles[index].blocks[b][3] * 1,  // z
									tiles[index].blocks[b][4] * 1] // 256 color possibilities (0-255) each times 65536 will produce numbers in the range hex color range 0-16777216
								);
							}
						}
					}
				}
			}
		}
	};
	
	xhr.open('GET', uri, true);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send('');
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default App;
