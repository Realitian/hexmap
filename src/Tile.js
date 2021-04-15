import Tools from './Tools';
import {vg, tundra, ice, sea, sand, grassland, hills, mountain} from './VG';
import * as THREE from "three";
import {Point} from "./point";

class Tile {
    mapsize = 33;

    size = 10; // length of one tile segment
    EXTRUSION_FACTOR = this.size / 75;

    tileheight = this.size * 2;
    tilevert = this.tileheight * 3 / 4;
    tilewidth = Math.sqrt(3) / 2 * this.tileheight;
    blocksize = this.size / 100; // length of one block segment
    blockheight = this.blocksize * 2;
    blockvert = this.blockheight * 3 / 4;
    blockwidth = Math.sqrt(3) / 2 * this.blockheight;
    blockextrude = this.blocksize;
    SEA_LEVEL = 125;

    colors = ["000000","000033","000066","000099","0000CC","0000FF","003300","003333","003366","003399","0033CC","0033FF","006600","006633","006666","006699","0066CC","0066FF","009900","009933","009966","009999",
        "0099CC","0099FF","00CC00","00CC33","00CC66","00CC99","00CCCC","00CCFF","00FF00","00FF33","00FF66","00FF99","00FFCC","00FFFF","330000","330033","330066","330099","3300CC","3300FF","333300","333333",
        "333366","333399","3333CC","3333FF","336600","336633","336666","336699","3366CC","3366FF","339900","339933","339966","339999","3399CC","3399FF","33CC00","33CC33","33CC66","33CC99","33CCCC","33CCFF",
        "33FF00","33FF33","33FF66","33FF99","33FFCC","33FFFF","660000","660033","660066","660099","6600CC","6600FF","663300","663333","663366","663399","6633CC","6633FF","666600","666633","666666","666699",
        "6666CC","6666FF","669900","669933","669966","669999","6699CC","6699FF","66CC00","66CC33","66CC66","66CC99","66CCCC","66CCFF","66FF00","66FF33","66FF66","66FF99","66FFCC","66FFFF","990000","990033",
        "990066","990099","9900CC","9900FF","993300","993333","993366","993399","9933CC","9933FF","996600","996633","996666","996699","9966CC","9966FF","999900","999933","999966","999999","9999CC","9999FF",
        "99CC00","99CC33","99CC66","99CC99","99CCCC","99CCFF","99FF00","99FF33","99FF66","99FF99","99FFCC","99FFFF","CC0000","CC0033","CC0066","CC0099","CC00CC","CC00FF","CC3300","CC3333","CC3366","CC3399",
        "CC33CC","CC33FF","CC6600","CC6633","CC6666","CC6699","CC66CC","CC66FF","CC9900","CC9933","CC9966","CC9999","CC99CC","CC99FF","CCCC00","CCCC33","CCCC66","CCCC99","CCCCCC","CCCCFF","CCFF00","CCFF33",
        "CCFF66","CCFF99","CCFFCC","CCFFFF","FF0000","FF0033","FF0066","FF0099","FF00CC","FF00FF","FF3300","FF3333","FF3366","FF3399","FF33CC","FF33FF","FF6600","FF6633","FF6666","FF6699","FF66CC","FF66FF",
        "FF9900","FF9933","FF9966","FF9999","FF99CC","FF99FF","FFCC00","FFCC33","FFCC66","FFCC99","FFCCCC","FFCCFF","FFFF00","FFFF33","FFFF66","FFFF99","FFFFCC","FFFFFF"];

    blockdefs = [{
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

    occupado = [];

    constructor(config) {
        config = config || {};
        var settings = {
            cell: null, // required vg.Cell
            geometry: null, // required threejs geometry
            material: null // not required but it would improve performance significantly
        };
        settings = Tools.merge(settings, config);

        if (!settings.cell || !settings.geometry) {
            throw new Error('Missing vg.Tile configuration');
        }

        this.cell = settings.cell;
        if (this.cell.tile && this.cell.tile !== this) this.cell.tile.dispose(); // remove whatever was there
        this.cell.tile = this;

        this.uniqueID = Tools.generateID();

        this.geometry = settings.geometry;
        this.material = settings.material;
        var texture;
        if (!this.material) {
             switch (this.cell.tile.cell.userData.type) {
                 case "Tundra":
                     texture = tundra;
                     break;
                 case "Ice":
                     texture = ice;
                     break;
                 case "Sea":
                     texture = sea;
                     break;
                 case "Sand":
                     texture = sand;
                     break;
                 case "Grassland":
                     texture = grassland;
                     break;
                 case "Hills":
                     texture = hills;
                     break;
                 case "Mountain":
                     texture = mountain;
                     break;
            }

            this.material = new THREE.MeshPhongMaterial({map: texture });
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }

        this.objectType = vg.TILE;
        this.entity = null;
        this.userData = {};

        this.selected = false;
        this.highlight = '0x0084cc';

        this.object = new THREE.Object3D();
        var mesh = new THREE.Mesh(this.geometry, this.material);
        this.object.add(mesh);

        mesh.userData.structure = this;

        // create references so we can control orientation through this (Tile), instead of drilling down
        this.position = mesh.position;
        this.rotation = mesh.rotation;

        // rotate it to face "up" (the threejs coordinate space is Y+)
        this.rotation.x = -90 * vg.DEG_TO_RAD;
        mesh.scale.set(settings.scale, settings.scale, 1);

        if (this.material.emissive) {
            this._emissive = this.material.emissive.getHex();
        }
        else {
            this._emissive = null;
        }

        for (var b =0; b < this.cell.tile.cell.userData.blocks.length; b++){
            this.writeBlock(b, this.cell.tile.cell.userData.blocks[b]);
        }
    }

    select() {
		if (this.material.emissive) {
			this.material.emissive.setHex(this.highlight);
		}
		this.selected = true;
		return this;
	}

	deselect() {
		if (this._emissive !== null && this.material.emissive) {
			this.material.emissive.setHex(this._emissive);
		}
		this.selected = false;
		return this;
	}

	toggle() {
		if (this.selected) {
			this.deselect();
		}
		else {
			this.select();
		}
		return this;
	}

	dispose() {
		if (this.cell && this.cell.tile) this.cell.tile = null;
		this.cell = null;
		this.position = null;
		this.rotation = null;
		if (this.mesh.parent) this.mesh.parent.remove(this.mesh);
		this.mesh.userData.structure = null;
		this.mesh = null;
		this.material = null;
		this.userData = null;
		this.entity = null;
		this.geometry = null;
		this._emissive = null;
	}


    writeBlock(blockindex, _block) {
        const col = this.cell.tile.cell.userData.col;
        const row = this.cell.tile.cell.userData.row;

		//console.log('entering writeBlock blockindex=' + blockindex + " " + JSON.stringify(_block));
		var canOccupy = new Array(24);
		var didOccupy = new Array(24);
		for (var b = 0; b < 24; b++) // gotta create a new object and move all the values over. Otherwise, we'd be writing into blockdefs.
		{
			canOccupy[b] = this.blockdefs[_block[0]].occupies[b];
			didOccupy[b] = this.blockdefs[_block[0]].occupies[b];
		}
		// var index = col * this.mapsize + row;
		// var tile = this.cell.tile;

        // this.cell.tile.cell.userData.blocks

		b = 0;
		for (b = 0; b < 24; b += 3) // always 8 hexes, calculate the didoccupy
		{
			canOccupy[b] = canOccupy[b] + _block[1];
			canOccupy[b + 1] = canOccupy[b + 1] + _block[2];
			if (canOccupy[1] % 2 != 0 && canOccupy[b + 1] % 2 == 0) // if anchor y is odd and this hex y is even, (SW NE beam goes 11,`2`2,23,`3`4,35,`4`6,47,`5`8  ` = x value incremented by 1. Same applies to SW NE beam from 01,12,13,24,25,36,37,48)
				canOccupy[b] = canOccupy[b] + 1;  			     // then offset x by +1
			canOccupy[b + 2] = canOccupy[b + 2] + _block[3];
			didOccupy[b] = didOccupy[b] + _block[1];
			didOccupy[b + 1] = didOccupy[b + 1] + _block[2];
			if (didOccupy[1] % 2 != 0 && didOccupy[b + 1] % 2 == 0) // if anchor y and this hex y are both odd,
				didOccupy[b] = didOccupy[b] + 1; 					 // then offset x by +1
			didOccupy[b + 2] = didOccupy[b + 2] + _block[3];
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
	
		if (_block[3] >= 0) // If the previous z was greater than 0 (i.e. not hidden) ...
		{
			for (var l = 0; l < 24; l += 3) // loop 8 times,find the previous occupado entries and overwrite them
			{
				if (this.occupado) {
					for (var o = 0; o < this.occupado.length; o++) {
						if (didOccupy[l] == this.occupado[o][0] && didOccupy[l + 1] == this.occupado[o][1] && didOccupy[l + 2] == this.occupado[o][2]) // x,y,z equal?
						{
							this.occupado[o][0] = canOccupy[l]; // found it. Overwrite it
							this.occupado[o][1] = canOccupy[l + 1];
							this.occupado[o][2] = canOccupy[l + 2];
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
				this.occupado.push(newtriplet);
			}
		}
		// tile.blocks[blockindex] = _block;
	}

    drawBlock(col, row, which, x, y, z, color, blockindex, sequencenum, keyx, keyy, keyz) {
		console.log("drawBlock " + col + "," + row + " which=" + which + " x=" + x + " y=" + y + " z=" + z + " color=" + color);
		var xpoint = (col - (this.mapsize - 1) / 2) * this.tilewidth;
		if (row % 2 !== 0)
			xpoint = xpoint + this.tilewidth / 2;
		var ypoint = (row - (this.mapsize - 1) / 2) * this.tilevert;
	
		xpoint = /*xpoint +*/ x * this.blockwidth;
		if (y % 2 !== 0)
			xpoint = xpoint + this.blockwidth / 2;
		ypoint = /*ypoint + */ y * this.blockvert;
	
		var extrudeSettings = {
			amount: this.blockextrude,
			steps: 1,
			material: 1,
			extrudeMaterial: 0,
			bevelEnabled: false,
		};
	
		// var hextex;
		// var useblocknumbertextures;
		// if (typeof useblocknumbertextures !== "undefined" && useblocknumbertextures !== null)
		// 	hextex = this.hextexes[which];
		// else
		// 	hextex = this.hextexprime;
		var colorint = parseInt("0x" + this.colors[color + 128]);
		var material = new THREE.MeshPhongMaterial({ color: colorint/*, map: hextex*/ });
		// hextex.wrapS = hextex.wrapT = THREE.RepeatWrapping;
		// hextex.repeat.set(3, 3);
		var hexShape = new THREE.Shape();
		var centerPoint = new Point(xpoint, ypoint);
		var points = [];
		points.push(this.cornerHex(centerPoint, this.blocksize, 0));
		points.push(this.cornerHex(centerPoint, this.blocksize, 1));
		points.push(this.cornerHex(centerPoint, this.blocksize, 2));
		points.push(this.cornerHex(centerPoint, this.blocksize, 3));
		points.push(this.cornerHex(centerPoint, this.blocksize, 4));
		points.push(this.cornerHex(centerPoint, this.blocksize, 5));
	
		for (var p = 0; p < points.length; p++) {
			if (p === 0)
				hexShape.moveTo(points[p].x, points[p].y);
			else
				hexShape.lineTo(points[p].x, points[p].y);
		}
		hexShape.moveTo(points[0].x, points[0].y);
	
		var hexGeom = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
	
		var mesh = new THREE.Mesh(hexGeom, material);
        mesh.rotation.x = -90 * vg.DEG_TO_RAD;

		var tileextrusion = 0;
		// var index = col * this.mapsize + row;
		// if (this.tiles[index].elevation < this.SEA_LEVEL) {
			// tileextrusion = this.SEA_LEVEL * this.EXTRUSION_FACTOR;
		// }
		// else {
		// 	tileextrusion = this.tiles[index].elevation * this.EXTRUSION_FACTOR;
		// }
		//console.log("LOWER " + coordx + "," + coordy + " extrudeamount=" + tileextrusion  + " tiles[coordx][coordy].elevation=" + tiles[coordx][coordy].elevation + " EXTRUSION_FACTOR=" + EXTRUSION_FACTOR);
		// if (this.tiles.length === 1) // special case of the single island hex on the blockref (otherwise, it woudl be ice)
			// mesh.position.set(0, 0, 1 + z * this.blockextrude);
		// else
			mesh.position.set(0, 20, 0);//tileextrusion + z * this.blockextrude);
	
		mesh.userData.which = which;
		mesh.userData.x = x;
		mesh.userData.y = y;
		mesh.userData.z = z;
		mesh.userData.keyx = keyx;
		mesh.userData.keyy = keyy;
		mesh.userData.keyz = keyz;
		mesh.userData.blockindex = blockindex;
		mesh.userData.sequencenum = sequencenum;
		mesh.userData.description = this.blockdefs[which].description;
		mesh.userData.color = color;
		var outer = [];
		var inner = [];
		for (var cy = 0; cy < 24; cy += 3) {
			inner = [];
			inner.push(this.blockdefs[which].occupies[cy]);
			inner.push(this.blockdefs[which].occupies[cy + 1]);
			inner.push(this.blockdefs[which].occupies[cy + 2]);
			outer.push(inner);
		}
		mesh.userData.occupies = outer;
	
		// this.scene.add(mesh);
        this.object.add(mesh);
	}

    cornerHex(center, size, i) {
		var angle_deg = 60 * i + 30;
		var angle_rad = Math.PI / 180 * angle_deg;
		return new Point(center.x + size * Math.cos(angle_rad),
			center.y + size * Math.sin(angle_rad));
	}
}

export default Tile;
