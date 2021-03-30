import * as THREE from "three";

class Loader {
	constructor() {
		this.manager = null;
		this.imageLoader = null;
		this.crossOrigin = false;
	}

	static init(crossOrigin) {
		this.crossOrigin = crossOrigin || false;

		this.manager = new THREE.LoadingManager(function() {
			// called when all images are loaded, so call your state manager or something
		}, function() {
			// noop
		}, function() {
			console.warn('Error loading images');
		});

		this.imageLoader = new THREE.ImageLoader(this.manager);
		this.imageLoader.crossOrigin = crossOrigin;
	}

	static loadTexture (url, mapping, onLoad, onError) {
		var texture = new THREE.Texture(null, mapping);
		this.imageLoader.load(url, function(image) { // on load
				texture.image = image;
				texture.needsUpdate = true;
				if (onLoad) onLoad(texture);
			},
			null, // on progress
			function (evt) { // on error
				if (onError) onError(evt);
			});
		texture.sourceFile = url;

		return texture;
	}

}

export default Loader;
