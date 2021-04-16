import './App.css';
import React from "react";
import Scene from './Scene';
import HexGrid from './HexGrid';
import * as MOUSE from "./MouseCaster";
import Board from './Board';

class App extends React.Component {
  componentDidMount() {
	var scene = new Scene({
		element: this.mount,
		cameraPosition: {x:207.5, y:250, z:360}
	}, true);

	var grid = new HexGrid();
	var board = new Board(grid);
	var mouse = new MOUSE.MouseCaster(scene.container, scene.camera);
	grid.load('./hex-map.json', function() {
		board.generateTilemap();
	}, this);

	scene.add(board.group);
	scene.focusOn(board.group);

	mouse.signal.add(function(evt, tile) {
		if (tile != null){
			if (evt === MOUSE.MouseCaster.CLICK) {
				tile.toggle();
			}
			else if (evt === MOUSE.MouseCaster.UP && tile) {
				tile.deselect();
			}	
		}
	}, this);

    var idle = function () {
      requestAnimationFrame(idle);
      scene.animate();
	  mouse.update();
    };

    idle();
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default App;
