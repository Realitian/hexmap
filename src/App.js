import './App.css';
import React from "react";
import Scene from './Scene';
import HexGrid from './HexGrid';
// import MouseCaster from './MouseCaster';
import Board from './Board';

class App extends React.Component {
  componentDidMount() {
    //let scene = new Scene(this.mount);
    let scene = new Scene({
			element: this.mount,
			cameraPosition: {x:207.5, y:250, z:360}
		}, true);

    var grid = new HexGrid();
		// var mouse = new vg.MouseCaster(scene.container, scene.camera);
		var board = new Board(grid);

		grid.load('./hex-map.json', function() {
			board.generateTilemap();
		}, this);
		scene.add(board.group);
		scene.focusOn(board.group);
		console.log(board.group);

		// mouse.signal.add(function(evt, tile) {
		// 	if (evt === vg.MouseCaster.CLICK) {
		// 		tile.toggle();
		// 		console.log(tile.cell, tile.position);
		// 		console.log(tile.cell.userData);
		// 	}
		// }, this);

    var idle = function () {
      requestAnimationFrame(idle);
      scene.animate();
			// mouse.update();
    };

    idle();
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default App;
