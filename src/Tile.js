import Tools from './Tools';
import {vg, tundra, ice, sea, sand, grassland, hills, mountain} from './VG';
import * as THREE from "three";

class Tile {
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

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData.structure = this;

        // create references so we can control orientation through this (Tile), instead of drilling down
        this.position = this.mesh.position;
        this.rotation = this.mesh.rotation;

        // rotate it to face "up" (the threejs coordinate space is Y+)
        this.rotation.x = -90 * vg.DEG_TO_RAD;
        this.mesh.scale.set(settings.scale, settings.scale, 1);

        if (this.material.emissive) {
            this._emissive = this.material.emissive.getHex();
        }
        else {
            this._emissive = null;
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
}

export default Tile;
