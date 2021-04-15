import * as THREE from "three";
import {Point} from "./point";
import {vg, tundra, ice, sea, sand, grassland, hills, mountain} from './VG';

var size = 10; // length of one tile segment
var EXTRUSION_FACTOR = size / 75;

var tileheight = size * 2;
var tilevert = tileheight * 3 / 4;
var tilewidth = Math.sqrt(3) / 2 * tileheight;
var blocksize = size / 100; // length of one block segment
var blockheight = blocksize * 2;
var blockvert = blockheight * 3 / 4;
var blockwidth = Math.sqrt(3) / 2 * blockheight;
var blockextrude = blocksize;

var GRASSLAND_COLOR = 0x1b9100;
var MOUNTAINS_COLOR = 0x7b736a;
var HILLS_COLOR = 0xbaac80;
var WATER_COLOR = 0x4873ff;
var TUNDRA_COLOR = 0xc9c9c9;
var ICE_COLOR = 0x58ceff;
var SAND_COLOR = 0xffe1b5;//d7cf77;

var SEA_LEVEL = 125;
var SAND_LEVEL = 135;
var GRASSLAND_LEVEL = 170;
var HILLS_LEVEL = 200;
var TUNDRA_PERCENTAGE = 0.08;
var ICE_PERCENTAGE = 0.04;

var offset = 0;
var whathappened = 0;

var colors = ["000000","000033","000066","000099","0000CC","0000FF","003300","003333","003366","003399","0033CC","0033FF","006600","006633","006666","006699","0066CC","0066FF","009900","009933","009966","009999",
 "0099CC","0099FF","00CC00","00CC33","00CC66","00CC99","00CCCC","00CCFF","00FF00","00FF33","00FF66","00FF99","00FFCC","00FFFF","330000","330033","330066","330099","3300CC","3300FF","333300","333333",
 "333366","333399","3333CC","3333FF","336600","336633","336666","336699","3366CC","3366FF","339900","339933","339966","339999","3399CC","3399FF","33CC00","33CC33","33CC66","33CC99","33CCCC","33CCFF",
 "33FF00","33FF33","33FF66","33FF99","33FFCC","33FFFF","660000","660033","660066","660099","6600CC","6600FF","663300","663333","663366","663399","6633CC","6633FF","666600","666633","666666","666699",
 "6666CC","6666FF","669900","669933","669966","669999","6699CC","6699FF","66CC00","66CC33","66CC66","66CC99","66CCCC","66CCFF","66FF00","66FF33","66FF66","66FF99","66FFCC","66FFFF","990000","990033",
 "990066","990099","9900CC","9900FF","993300","993333","993366","993399","9933CC","9933FF","996600","996633","996666","996699","9966CC","9966FF","999900","999933","999966","999999","9999CC","9999FF",
 "99CC00","99CC33","99CC66","99CC99","99CCCC","99CCFF","99FF00","99FF33","99FF66","99FF99","99FFCC","99FFFF","CC0000","CC0033","CC0066","CC0099","CC00CC","CC00FF","CC3300","CC3333","CC3366","CC3399",
 "CC33CC","CC33FF","CC6600","CC6633","CC6666","CC6699","CC66CC","CC66FF","CC9900","CC9933","CC9966","CC9999","CC99CC","CC99FF","CCCC00","CCCC33","CCCC66","CCCC99","CCCCCC","CCCCFF","CCFF00","CCFF33",
 "CCFF66","CCFF99","CCFFCC","CCFFFF","FF0000","FF0033","FF0066","FF0099","FF00CC","FF00FF","FF3300","FF3333","FF3366","FF3399","FF33CC","FF33FF","FF6600","FF6633","FF6666","FF6699","FF66CC","FF66FF",
 "FF9900","FF9933","FF9966","FF9999","FF99CC","FF99FF","FFCC00","FFCC33","FFCC66","FFCC99","FFCCCC","FFCCFF","FFFF00","FFFF33","FFFF66","FFFF99","FFFFCC","FFFFFF"];

var blockdefs = [{
	'which': 0,
	'description': 'column',
	'occupies': [0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7],
	'attachesto': [0, 0, -1, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 1,
	'description': 'W-E horizontal beam',
	'occupies': [0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0],
	'attachesto': [0, 0, -1, 1, 0, -1, 2, 0, -1, 3, 0, -1, 4, 0, -1, 5, 0, -1, 6, 0, -1, 7, 0, -1, 0, 0, 1, 1, 0, 1, 2, 0, 1, 3, 0, 1, 4, 0, 1, 5, 0, 1, 6, 0, 1, 7, 0, 1],
}, {
	'which': 2,
	'description': 'SW-NE diagonal snake',
	'occupies': [0, 0, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 3, 2, 0, 4, 2, 0, 4, 3, 0, 5, 3, 0],
	'attachesto': [0, 0, -1, 1, 0, -1, 1, 1, -1, 2, 1, -1, 3, 2, -1, 4, 2, -1, 4, 3, -1, 5, 3, -1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 3, 2, 1, 4, 2, 1, 4, 3, 1, 5, 3, 1]
}, {
	'which': 3,
	'description': 'SE-NW diagonal snake',
	'occupies': [0, 0, 0, -1, 0, 0, -2, 1, 0, -3, 1, 0, -3, 2, 0, -4, 2, 0, -5, 3, 0, -6, 3, 0],
	'attachesto': [0, 0, -1, -1, 0, -1, -2, 1, -1, -3, 1, -1, -3, 2, -1, -4, 2, -1, -5, 3, -1, -6, 3, -1, 0, 0, 1, -1, 0, 1, -2, 1, 1, -3, 1, 1, -3, 2, 1, -4, 2, 1, -5, 3, 1, -6, 3, 1]
}, {
	'which': 4,
	'description': 'W-E quadruple-decker',
	'occupies': [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 2, 1, 0, 2, 0, 0, 3, 1, 0, 3],
	'attachesto': [0, 0, -1, 1, 0, -1, 0, 0, 4, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 5,
	'description': 'SW-NE quadruple-decker',
	'occupies': [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 2, 0, 1, 2, 0, 0, 3, 0, 1, 3],
	'attachesto': [0, 0, -1, 0, 1, -1, 0, 0, 4, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 6,
	'description': 'SE-NW quadruple-decker',
	'occupies': [0, 0, 0, -1, 1, 0, 0, 0, 1, -1, 1, 1, 0, 0, 2, -1, 1, 2, 0, 0, 3, -1, 1, 3],
	'attachesto': [0, 0, -1, -1, 1, -1, 0, 0, 4, -1, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 7,
	'description': 'W-E double-decker',
	'occupies': [0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 1, 1, 0, 1, 2, 0, 1, 3, 0, 1],
	'attachesto': [0, 0, -1, 1, 0, -1, 2, 0, -1, 3, 0, -1, 0, 0, 2, 1, 0, 2, 2, 0, 2, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 8,
	'description': 'SW-NE double-decker diagonal snake',
	'occupies': [0, 0, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1],
	'attachesto': [0, 0, -1, 1, 0, -1, 1, 1, -1, 2, 1, -1, 0, 0, 2, 1, 0, 2, 1, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 9,
	'description': 'SE-NW double-decker diagonal snake',
	'occupies': [0, 0, 0, -1, 0, 0, -2, 1, 0, -3, 1, 0, 0, 0, 1, -1, 0, 1, -2, 1, 1, -3, 1, 1],
	'attachesto': [0, 0, -1, -1, 0, -1, -2, 1, -1, -3, 1, -1, 0, 0, 2, -1, 0, 2, -2, 1, 2, -3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 10,
	'description': 'S-N snake',
	'occupies': [0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0],
	'attachesto': [0, 0, -1, 0, 1, -1, 0, 2, -1, 0, 3, -1, 0, 4, -1, 0, 5, -1, 0, 6, -1, 0, 7, -1, 0, 0, 1, 0, 1, 1, 0, 2, 1, 0, 3, 1, 0, 4, 1, 0, 5, 1, 0, 6, 1, 0, 7, 1]
}, {
	'which': 11,
	'description': 'S-N snake flipped',
	'occupies': [0, 0, 0, -1, 1, 0, 0, 2, 0, -1, 3, 0, 0, 4, 0, -1, 5, 0, 0, 6, 0, -1, 7, 0],
	'attachesto': [0, 0, -1, -1, 1, -1, 0, 2, -1, -1, 3, -1, 0, 4, -1, -1, 5, -1, 0, 6, -1, -1, 7, -1, 0, 0, 1, -1, 1, 1, 0, 2, 1, -1, 3, 1, 0, 4, 1, -1, 5, 1, 0, 6, 1, -1, 7, 1]
}, {
	'which': 12,
	'description': 'S-N double-decker snake',
	'occupies': [0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 0, 1, 0, 1, 1, 0, 2, 1, 0, 3, 1],
	'attachesto': [0, 0, -1, 0, 1, -1, 0, 2, -1, 0, 3, -1, 0, 0, 2, 0, 1, 2, 0, 2, 2, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 13,
	'description': 'S-N double-decker snake flipped',
	'occupies': [0, 0, 0, -1, 1, 0, 0, 2, 0, -1, 3, 0, 0, 0, 1, -1, 1, 1, 0, 2, 1, -1, 3, 1],
	'attachesto': [0, 0, -1, -1, 1, -1, 0, 2, -1, -1, 3, -1, 0, 0, 2, -1, 1, 2, 0, 2, 2, -1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 14,
	'description': 'W-E stairstep',
	'occupies': [0, 0, 0, 1, 0, 0, 1, 0, 1, 2, 0, 1, 2, 0, 2, 3, 0, 2, 3, 0, 3, 4, 0, 3],
	'attachesto': [0, 0, -1, 1, 0, -1, 2, 0, 0, 3, 0, 1, 4, 0, 2, 0, 0, 1, 1, 0, 2, 2, 0, 3, 3, 0, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 15,
	'description': 'E-W stairstep',
	'occupies': [0, 0, 0, -1, 0, 0, -1, 0, 1, -2, 0, 1, -2, 0, 2, -3, 0, 2, -3, 0, 3, -4, 0, 3],
	'attachesto': [0, 0, -1, -1, 0, -1, -2, 0, 0, -3, 0, 1, -4, 0, 2, 0, 0, 1, -1, 0, 2, -2, 0, 3, -3, 0, 4, -4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 16,
	'description': 'N-S stairstep',
	'occupies': [0, 0, 0, 0, -1, 0, 0, -1, 1, 0, -2, 1, 0, -2, 2, 0, -3, 2, 0, -3, 3, 0, -4, 3],
	'attachesto': [0, 0, -1, 0, -1, -1, 0, -2, 0, 0, -3, 1, 0, -4, 2, 0, 0, 1, 0, -1, 2, 0, -2, 3, 0, -3, 4, 0, -4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
	'which': 17,
	'description': 'S-N stairstep',
	'occupies': [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 2, 2, 0, 3, 2, 0, 3, 3, 0, 4, 3],
	'attachesto': [0, 0, -1, 0, 1, -1, 0, 2, 0, 0, 3, 1, 0, 4, 2, 0, 0, 1, 0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}];

var tundratexture =  tundra;
var icetexture = ice;
var watertexture = sea;
var grasslandtexture = grassland;
var sandtexture = sand;
var hillstexture = hills;
var mountainstexture = mountain;
var texture;

function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

function HSVtoHSL(h, s, v) {
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    var _h = h,
        _s = s * v,
        _l = (2 - s) * v;
    _s /= (_l <= 1) ? _l : 2 - _l;
    _l /= 2;

    return {
        h: _h,
        s: _s,
        l: _l
    };
}

function HSLtoHSV(h, s, l) {
    if (arguments.length === 1) {
        s = h.s, l = h.l, h = h.h;
    }
    var _h = h,
        _s,
        _v;

    l *= 2;
    s *= (l <= 1) ? l : 2 - l;
    _v = (l + s) / 2;
    _s = (2 * s) / (l + s);

    return {
        h: _h,
        s: _s,
        v: _v
    };
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function darkenColor(color, percentage)
{
	var components = {
		    r: (color & 0xff0000) >> 16, 
		    g: (color & 0x00ff00) >> 8, 
		    b: (color & 0x0000ff)
		};
	var color_hsv = RGBtoHSV(components.r, components.g, components.b);
	var color_hsl = HSVtoHSL(color_hsv.h, color_hsv.s, color_hsv.v);
	color_hsl.l = color_hsl.l * percentage;  
	if(color_hsl.l === 0) // when lightness is all the way zero, it draws a white hex for some reason (maybe the hue is set to something that can't be brightness zero?). w/e This shouldn't happen. Force a black hex.
		color = 0x000000;
	else
	{
		color_hsv = HSLtoHSV(color_hsl.h, color_hsl.s, color_hsl.l);
		var color_rgb = HSVtoRGB(color_hsv.h, color_hsv.s, color_hsv.v);
		color = color_rgb.r * Math.pow(16,4) + color_rgb.g * Math.pow(16,2) + color_rgb.b;
	}
	return color;
}

class BlockUtils {
	constructor(scene, tiles, mapsize){
		this.tiles = tiles;
		this.scene = scene;
		this.mapsize = mapsize;
		this.hextexprime = THREE.ImageUtils.loadTexture("images/concrete.jpg");
		this.hextexes = [];
		var tex;
		for (var h = 0; h < blockdefs.length; h++) {
			tex = THREE.ImageUtils.loadTexture("images/concrete" + h + ".jpg");
			this.hextexes.push(tex);
		}
	}

	drawMap(col, row) {
		var color = null;
		var tiletype = "";
		var index = col * this.mapsize + row;
		if (this.tiles.length === 1) // special case of the single island hex on the blockref (otherwise, it woudl be ice)
		{
			color = GRASSLAND_COLOR;
			texture = grasslandtexture;
			tiletype = "grassland";
		} else if (this.tiles[index].elevation >= SEA_LEVEL && 						// higher than ocean level AND
			(row < (TUNDRA_PERCENTAGE * this.mapsize) || 			// (south of tundra threshold OR
				row > ((1 - TUNDRA_PERCENTAGE) * (this.mapsize - 1)))) //  north of tundra threshold)
		{
			color = TUNDRA_COLOR;
			texture = tundratexture;
			tiletype = "tundra";
			if (row < (ICE_PERCENTAGE * this.mapsize) || row > ((1 - ICE_PERCENTAGE) * (this.mapsize - 1))) {
				color = ICE_COLOR;
				texture = icetexture;
				tiletype = "ice";
			}
		}
		else if (this.tiles[index].elevation < SEA_LEVEL) {
			color = WATER_COLOR;
			texture = watertexture;
			tiletype = "water";
		}
		else if (this.tiles[index].elevation < SAND_LEVEL) {
			color = SAND_COLOR;
			texture = sandtexture;
			tiletype = "sand";
		}
		else if (this.tiles[index].elevation < GRASSLAND_LEVEL) {
			color = GRASSLAND_COLOR;
			texture = grasslandtexture;
			tiletype = "grassland";
		}
		else if (this.tiles[index].elevation < HILLS_LEVEL) {
			color = HILLS_COLOR;
			texture = hillstexture;
			tiletype = "hills";
		}
		else if (this.tiles[index].elevation <= 256) {
			if (this.tiles[index].elevation > 255) {
				//tiles[index].elevation = 255; // sometimes multiplicative factors put the very top over 255, if so, chop it off
				console.log('WARNING elevationg greater than 255');
			}
			color = MOUNTAINS_COLOR;
			texture = mountainstexture;
			tiletype = "mountains";
		}
	
		if (color !== SAND_COLOR) {
			var components = {
				r: (color & 0xff0000) >> 16,
				g: (color & 0x00ff00) >> 8,
				b: (color & 0x0000ff)
			};
			// convert hex to hsl, set the lightness to elevation / 255, convert back to hex.
			var color_hsv = RGBtoHSV(components.r, components.g, components.b);
			var color_hsl = HSVtoHSL(color_hsv.h, color_hsv.s, color_hsv.v);
			//color_hsl.l = color_hsl.l * tiles[index].elevation / 255; 											// this is the original, but the light/dark was too drastic.
			color_hsl.l = color_hsl.l * ((255 - this.tiles[index].elevation) * 2 / 5 + this.tiles[index].elevation) / 255;  // this version softens. 128/255 = ~.5 becomes (((255-128)*2/3) + 128) / 255 = .8333 (repeating, of course)
			if (color_hsl.l === 0) // when lightness is all the way zero, it draws a white hex for some reason (maybe the hue is set to something that can't be brightness zero?). w/e This shouldn't happen. Force a black hex.
				color = 0x000000;
			else {
				color_hsv = HSLtoHSV(color_hsl.h, color_hsl.s, color_hsl.l);
				var color_rgb = HSVtoRGB(color_hsv.h, color_hsv.s, color_hsv.v);
				color = color_rgb.r * Math.pow(16, 4) + color_rgb.g * Math.pow(16, 2) + color_rgb.b;
			}
		}
		// (col - (mapsize-1)/2) and (row - (mapsize-1)/2) adjust the coords to center in the camera's view
		var xpoint = (col - (this.mapsize - 1) / 2) * tilewidth;
		if (row % 2 !== 0)
			xpoint = xpoint + tilewidth / 2;
		var ypoint = (row - (this.mapsize - 1) / 2) * tilevert;
	
		var extrudeamount;
	
		if (this.tiles.length === 1) // special case of the single island hex on the blockref (otherwise, it woudl be ice)
			extrudeamount = 1;
		else if (this.tiles[index].elevation < SEA_LEVEL)
			extrudeamount = SEA_LEVEL * EXTRUSION_FACTOR;
		else
			extrudeamount = this.tiles[index].elevation * EXTRUSION_FACTOR;
	
		var extrudeSettings = {
			amount: extrudeamount,
			steps: 1,
			material: 1,
			extrudeMaterial: 0,
			bevelEnabled: false,
			//			bevelThickness  : 2,
			//			bevelSize       : 4,
			//			bevelSegments   : 1,
		};
		var material = new THREE.MeshPhongMaterial({ color: color, map: texture });
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(.1, .1);
	
		var hexShape = new THREE.Shape();
		var centerPoint = new Point(xpoint, ypoint);
	
		var point0 = this.cornerHex(centerPoint, size, 0);
		var point1 = this.cornerHex(centerPoint, size, 1);
		var point2 = this.cornerHex(centerPoint, size, 2);
		var point3 = this.cornerHex(centerPoint, size, 3);
		var point4 = this.cornerHex(centerPoint, size, 4);
		var point5 = this.cornerHex(centerPoint, size, 5);
	
		hexShape.moveTo(point0.x, point0.y);
		hexShape.lineTo(point1.x, point1.y);
		hexShape.lineTo(point2.x, point2.y);
		hexShape.lineTo(point3.x, point3.y);
		hexShape.lineTo(point4.x, point4.y);
		hexShape.lineTo(point5.x, point5.y);
		hexShape.lineTo(point0.x, point0.y);
	
		var hexGeom = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
	
		var mesh = new THREE.Mesh(hexGeom, material);
	
		mesh.userData.elevation = this.tiles[index].elevation;
		mesh.userData.tiletype = tiletype;
	
		mesh.userData.col = col;
		mesh.userData.row = row;
		mesh.userData.owner = this.tiles[index].owner;
		mesh.userData.name = this.tiles[index].name;
		mesh.userData.status = this.tiles[index].status;
	
		this.scene.add(mesh);
	
		return;
	}
	
	cornerHex(center, size, i) {
		var angle_deg = 60 * i + 30;
		var angle_rad = Math.PI / 180 * angle_deg;
		return new Point(center.x + size * Math.cos(angle_rad),
			center.y + size * Math.sin(angle_rad));
	}
	
	
	drawBlock(col, row, which, x, y, z, color, blockindex, sequencenum, keyx, keyy, keyz) {
		console.log("drawBlock " + col + "," + row + " which=" + which + " x=" + x + " y=" + y + " z=" + z + " color=" + color);
		var xpoint = (col - (this.mapsize - 1) / 2) * tilewidth;
		if (row % 2 !== 0)
			xpoint = xpoint + tilewidth / 2;
		var ypoint = (row - (this.mapsize - 1) / 2) * tilevert;
	
		xpoint = xpoint + x * blockwidth;
		if (y % 2 !== 0)
			xpoint = xpoint + blockwidth / 2;
		ypoint = ypoint + y * blockvert;
	
		var extrudeSettings = {
			amount: blockextrude,
			steps: 1,
			material: 1,
			extrudeMaterial: 0,
			bevelEnabled: false,
		};
	
		var hextex;
		var useblocknumbertextures;
		if (typeof useblocknumbertextures !== "undefined" && useblocknumbertextures !== null)
			hextex = this.hextexes[which];
		else
			hextex = this.hextexprime;
		var colorint = parseInt("0x" + colors[color + 128]);
		var material = new THREE.MeshPhongMaterial({ color: colorint, map: hextex });
		hextex.wrapS = hextex.wrapT = THREE.RepeatWrapping;
		hextex.repeat.set(3, 3);
		var hexShape = new THREE.Shape();
		var centerPoint = new Point(xpoint, ypoint);
		var points = [];
		points.push(this.cornerHex(centerPoint, blocksize, 0));
		points.push(this.cornerHex(centerPoint, blocksize, 1));
		points.push(this.cornerHex(centerPoint, blocksize, 2));
		points.push(this.cornerHex(centerPoint, blocksize, 3));
		points.push(this.cornerHex(centerPoint, blocksize, 4));
		points.push(this.cornerHex(centerPoint, blocksize, 5));
	
		for (var p = 0; p < points.length; p++) {
			if (p === 0)
				hexShape.moveTo(points[p].x, points[p].y);
			else
				hexShape.lineTo(points[p].x, points[p].y);
		}
		hexShape.moveTo(points[0].x, points[0].y);
	
		var hexGeom = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
	
		var mesh = new THREE.Mesh(hexGeom, material);
		var tileextrusion;
		var index = col * this.mapsize + row;
		if (this.tiles[index].elevation < SEA_LEVEL) {
			tileextrusion = SEA_LEVEL * EXTRUSION_FACTOR;
		}
		else {
			tileextrusion = this.tiles[index].elevation * EXTRUSION_FACTOR;
		}
		//console.log("LOWER " + coordx + "," + coordy + " extrudeamount=" + tileextrusion  + " tiles[coordx][coordy].elevation=" + tiles[coordx][coordy].elevation + " EXTRUSION_FACTOR=" + EXTRUSION_FACTOR);
		if (this.tiles.length === 1) // special case of the single island hex on the blockref (otherwise, it woudl be ice)
			mesh.position.set(0, 0, 1 + z * blockextrude);
		else
			mesh.position.set(0, 0, tileextrusion + z * blockextrude);
	
		mesh.userData.which = which;
		mesh.userData.x = x;
		mesh.userData.y = y;
		mesh.userData.z = z;
		mesh.userData.keyx = keyx;
		mesh.userData.keyy = keyy;
		mesh.userData.keyz = keyz;
		mesh.userData.blockindex = blockindex;
		mesh.userData.sequencenum = sequencenum;
		mesh.userData.description = blockdefs[which].description;
		mesh.userData.color = color;
		var outer = [];
		var inner = [];
		for (var cy = 0; cy < 24; cy += 3) {
			inner = [];
			inner.push(blockdefs[which].occupies[cy]);
			inner.push(blockdefs[which].occupies[cy + 1]);
			inner.push(blockdefs[which].occupies[cy + 2]);
			outer.push(inner);
		}
		mesh.userData.occupies = outer;
	
		this.scene.add(mesh);
	}
	
	writeBlock(col, row, blockindex, _block) {
		//console.log('entering writeBlock blockindex=' + blockindex + " " + JSON.stringify(_block));
		var canOccupy = new Array(24);
		var didOccupy = new Array(24);
		for (var b = 0; b < 24; b++) // gotta create a new object and move all the values over. Otherwise, we'd be writing into blockdefs.
		{
			canOccupy[b] = blockdefs[_block[0]].occupies[b];
			didOccupy[b] = blockdefs[_block[0]].occupies[b];
		}
		var index = col * this.mapsize + row;
		var tile = this.tiles[index];
		b = 0;
		for (b = 0; b < 24; b += 3) // always 8 hexes, calculate the didoccupy
		{
			canOccupy[b] = canOccupy[b] + _block[1];
			canOccupy[b + 1] = canOccupy[b + 1] + _block[2];
			if (canOccupy[1] % 2 != 0 && canOccupy[b + 1] % 2 == 0) // if anchor y is odd and this hex y is even, (SW NE beam goes 11,`2`2,23,`3`4,35,`4`6,47,`5`8  ` = x value incremented by 1. Same applies to SW NE beam from 01,12,13,24,25,36,37,48)
				canOccupy[b] = canOccupy[b] + 1;  			     // then offset x by +1
			canOccupy[b + 2] = canOccupy[b + 2] + _block[3];
			didOccupy[b] = didOccupy[b] + tile.blocks[blockindex][1];
			didOccupy[b + 1] = didOccupy[b + 1] + tile.blocks[blockindex][2];
			if (didOccupy[1] % 2 != 0 && didOccupy[b + 1] % 2 == 0) // if anchor y and this hex y are both odd,
				didOccupy[b] = didOccupy[b] + 1; 					 // then offset x by +1
			didOccupy[b + 2] = didOccupy[b + 2] + tile.blocks[blockindex][3];
		}
		var keyx = 0,keyy = 0,keyz = 0;
		for (var h = 0; h < 24; h += 3) // always 8 hexes, calculate the didoccupy
		{
			if (h === 0) {
				keyx = canOccupy[h];
				keyy = canOccupy[h + 1];
				keyz = canOccupy[h + 2];
			}
			var highlightkeyhex;
			if (h === 0 && (typeof highlightkeyhex !== "undefined" && highlightkeyhex !== null && highlightkeyhex === true))
				this.drawBlock(col, row, _block[0], canOccupy[h], canOccupy[h + 1], canOccupy[h + 2], 87, blockindex, h / 3, keyx, keyy, keyz);
			else
				this.drawBlock(col, row, _block[0], canOccupy[h], canOccupy[h + 1], canOccupy[h + 2], _block[4], blockindex, h / 3, keyx, keyy, keyz);
		}
	
		if (tile.blocks[blockindex][3] >= 0) // If the previous z was greater than 0 (i.e. not hidden) ...
		{
			for (var l = 0; l < 24; l += 3) // loop 8 times,find the previous occupado entries and overwrite them
			{
				if (tile.occupado) {
					for (var o = 0; o < tile.occupado.length; o++) {
						if (didOccupy[l] == tile.occupado[o][0] && didOccupy[l + 1] == tile.occupado[o][1] && didOccupy[l + 2] == tile.occupado[o][2]) // x,y,z equal?
						{
							tile.occupado[o][0] = canOccupy[l]; // found it. Overwrite it
							tile.occupado[o][1] = canOccupy[l + 1];
							tile.occupado[o][2] = canOccupy[l + 2];
						}
					}
				}
			}
		}
		else // previous block was hidden
		{
			var newtriplet = [];
			for (var ll = 0; ll < 24; ll += 3) // add the 8 new hexes to occupado
			{
				newtriplet = new Array(3);
				newtriplet[0] = canOccupy[ll];
				newtriplet[1] = canOccupy[ll + 1];
				newtriplet[2] = canOccupy[ll + 2];
				tile.occupado.push(newtriplet);
			}
		}
		tile.blocks[blockindex] = _block;
	}
		
	validHexCoords(x, y) {
		var absx = Math.abs(x);
		var absy = Math.abs(y);
	
		if (absy <= 33) // middle rectangle
		{
			if (y % 2 != 0) // odd
			{
				if (-50 <= x && x <= 49)
					return true;
			}
			else // even
			{
				if (absx <= 49)
					return true;
			}
		}
		else {
			if ((y >= 0 && x >= 0) || (y < 0 && x > 0)) // first or 4th quadrants
			{
				if (y % 2 != 0) // odd
				{
					if (((absx * 2) + (absy * 3)) <= 198) {
						console.log('1st or 4th, y odd, <= 198');
						return true;
					}
					else {
						console.log('1st or 4th, y odd, > 198, returning false');
						//return false;
					}
				}
				else	// even
				{
					if ((((absx + 1) * 2) + ((absy - 1) * 3)) <= 198) {
						console.log('1st or 4th, y even, <= 198');
						return true;
					}
					else {
						console.log('1st or 4th, y even, > 198');
						//return false;
					}
				}
			}
			else {
				if (y % 2 == 0) // even
				{
					if (((absx * 2) + (absy * 3)) <= 198) {
						console.log('2nd or 43rd, y even, <= 198');
						return true;
					}
					else {
						console.log('2nd or 43rd, y even, > 198');
						//return false;
					}
				}
				else	// odd
				{
					if ((((absx + 1) * 2) + ((absy - 1) * 3)) <= 198) {
						console.log('2nd or 43rd, y odd, <= 198');
						return true;
					}
					else {
						console.log('2nd or 43rd, y odd, > 198');
						//return false;
					}
				}
			}
		}
	}
	
	isValidLocation(col, row, _block, wouldoccupy) {
		var touches = false;
		var index = col * this.mapsize + row;
		var tile = this.tiles[index];
		//console.log("inside isValidLoc " + JSON.stringify(tile));
		for (var b = 0; b < 24; b += 3) // always 8 hexes, calculate the wouldoccupy and the didoccupy
		{
			if (!this.validHexCoords(wouldoccupy[b], wouldoccupy[b + 1])) // 3. DO ANY OF THE PROPOSED HEXES FALL OUTSIDE OF THE TILE? 
			{
				console.log("10:writeBlock:ERR:OOB");
				//console.log('OOB for ' + wouldoccupy[b] + "," + wouldoccupy[b+1]);
				return false;
			}
			console.log('checking wouldoccupy x,y,z against tile.occupado for ' + wouldoccupy[b] + "," + wouldoccupy[b + 1] + "," + wouldoccupy[b + 2]);
			console.log(JSON.stringify(tile.occupado));
			if (tile.occupado) {
				for (var o = 0; o < tile.occupado.length; o++)  // 4. DO ANY OF THE PROPOSED HEXES CONFLICT WITH ENTRIES IN OCCUPADO? 
				{
					//       			console.log("occupado " + o + " " + tile.occupado[o][0] + "," + tile.occupado[o][1] + "," + tile.occupado[o][2]);
					if (wouldoccupy[b] == tile.occupado[o][0] && wouldoccupy[b + 1] == tile.occupado[o][1] && wouldoccupy[b + 2] == tile.occupado[o][2]) // do the x,y,z entries of each match?
					{
						whathappened = 11;
						//      				console.log('conflict at ' + wouldoccupy[b] + "," + wouldoccupy[b+1] + "," + wouldoccupy[b+2]);
						return false; // this hex conflicts. The proposed block does not avoid overlap. Return false immediately.
					}
				}
			}
			if (touches == false && wouldoccupy[b + 2] == 0)  // 5. DO ANY OF THE BLOCKS TOUCH ANOTHER? (GROUND ONLY FOR NOW)
			{
				touches = true; // once true, always true til the end of this method. We must keep looping to check all the hexes for conflicts and tile boundaries, though, so we can't return true here.
			}
		}
	
		// now if we're out of the loop and here, there were no conflicts and the block was found to be in the tile boundary.
		// touches may be true or false, so we need to check 
	
		if (touches == false)  // 6. NONE OF THE OCCUPY BLOCKS TOUCHED THE GROUND. BUT MAYBE THEY TOUCH ANOTHER BLOCK?
		{
			console.log('inside touches==false');
			var attachesto = new Array(48);
			for (var i = 0; i < 48; i++) {
				attachesto[i] = blockdefs[_block[0]].attachesto[i];
			}
			for (var a = 0; a < 48 && !touches; a += 3) // always 8 hexes, calculate the wouldoccupy and the didoccupy
			{
				if (attachesto[a] == 0 && attachesto[a + 1] == 0 && attachesto[a + 2] == 0) // there are no more attachestos available, break (0,0,0 signifies end)
					break;
				//attachesto[a] = attachesto[a]+_block[1];
				attachesto[a + 1] = attachesto[a + 1] + _block[2];
				if (attachesto[1] % 2 != 0 && attachesto[a + 1] % 2 == 0) //  (for attachesto, anchory is the same as for occupies, but the z is different. Nothing to worry about)
					attachesto[a] = attachesto[a] + 1;  			       // then offset x by +1
				//attachesto[a+2] = attachesto[a+2]+_block[3];
				if (tile.occupado) {
					for (o = 0; o < tile.occupado.length && !touches; o++) {
						if ((attachesto[a] + _block[1]) == tile.occupado[o][0] && attachesto[a + 1] == tile.occupado[o][1] && (attachesto[a + 2] + _block[3]) == tile.occupado[o][2]) // a valid attachesto found in occupado?
						{
							whathappened = 12;
							console.log('touches');
							return true; // in bounds, didn't conflict and now touches is true. All good. Return.
						}
					}
				}
			}
			whathappened = 13;
			console.log('no touch');
			return false;
		}
		else // touches was true by virtue of a z = 0 above (touching the ground). Return true;
		{
			whathappened = 14;
			console.log('touches ground');
			return true;
		}
	}
}

export default BlockUtils;
