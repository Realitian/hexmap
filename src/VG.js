import * as THREE from "three";
var vg = { // eslint-disable-line
	VERSION: '0.1.1',

	PI: Math.PI,
	TAU: Math.PI * 2,
	DEG_TO_RAD: 0.0174532925,
	RAD_TO_DEG: 57.2957795,
	SQRT3: Math.sqrt(3), // used often in hex conversions

	// useful enums for type checking. change to whatever fits your game. these are just examples
	TILE: 'tile', // visual representation of a grid cell
	ENT: 'entity', // dynamic things
	STR: 'structure', // static things

	HEX: 'hex',
	SQR: 'square',
	ABS: 'abstract'
};

var loader = new THREE.TextureLoader();
var tundra = loader.load('./image/tundra.jpg');
var ice = loader.load('./image/ice.jpg');
var sea = loader.load('./image/water.jpg');
var sand = loader.load('./image/sand.jpg');
var grassland = loader.load('./image/grassland.jpg');
var hills = loader.load('./image/hills.jpg');
var mountain = loader.load('./image/mountains.jpg');

export {vg, tundra, ice, sea, sand, grassland, hills, mountain};

