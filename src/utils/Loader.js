vg.Loader = {
	manager: null,
	imageLoader: null,
	crossOrigin: false,

	init: function(crossOrigin) {
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

		var loader = new THREE.TextureLoader();
		var tundra = loader.load('./image/tundra.jpg');
		var ice = loader.load('./image/ice.jpg');
		var sea = loader.load('./image/water.jpg');
		var sand = loader.load('./image/sand.jpg');
		var grassland = loader.load('./image/grassland.jpg');
		var hills = loader.load('./image/hills.jpg');
		var mountain = loader.load('./image/mountains.jpg');
	},

	loadTexture: function(url, mapping, onLoad, onError) {
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
};
