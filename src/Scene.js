import * as THREE from "three";

class Scene {
    constructor(container) {
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this._renderer.domElement);

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        this._camera.position.z = 5;
    
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        
        this._cube = new THREE.Mesh(geometry, material);
        this._scene.add(this._cube);
    }

    animate() {  
        this._cube.rotation.x += 0.01;
        this._cube.rotation.y += 0.01;
  
        this._renderer.render(this._scene, this._camera);
    }
}

export default Scene;
