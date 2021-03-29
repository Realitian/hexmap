import './App.css';
import React from "react";
import Scene from './Scene';

class App extends React.Component {
  componentDidMount() {
    let scene = new Scene(this.mount);

    var idle = function () {
      requestAnimationFrame(idle);
      scene.animate();
    };

    idle();
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default App;
