import * as THREE from "three";
import vg from './VG';
import Cell from './Cell';
import Tools from './Tools';
import Tile from './Tile';

class HexGrid {
	constructor(config) {
		this._geoCache = {};

		config = config || {};
		/*  ______________________________________________
			GRID INTERFACE:
		*/
		this.type = vg.HEX;
		this.size = 5; // only used for generated maps
		this.cellSize = typeof config.cellSize === 'undefined' ? 10 : config.cellSize;
		this.cells = {};
		this.numCells = 0;

		this.extrudeSettings = null;
		this.autogenerated = false;

		// create base shape used for building geometry
		var i, verts = [];
		// create the skeleton of the hex
		for (i = 0; i < 6; i++) {
			verts.push(this.createVertex(i));
		}
		// copy the verts into a shape for the geometry to use
		this.cellShape = new THREE.Shape();
		this.cellShape.moveTo(verts[0].x, verts[0].y);
		for (i = 1; i < 6; i++) {
			this.cellShape.lineTo(verts[i].x, verts[i].y);
		}
		this.cellShape.lineTo(verts[0].x, verts[0].y);
		this.cellShape.autoClose = true;

		this.cellGeo = new THREE.Geometry();
		this.cellGeo.vertices = verts;
		this.cellGeo.verticesNeedUpdate = true;

		this.cellShapeGeo = new THREE.ShapeGeometry(this.cellShape);

		/*  ______________________________________________
			PRIVATE
		*/

		this._cellWidth = this.cellSize * 2;
		this._cellLength = (vg.SQRT3 * 0.5) * this._cellWidth;
		this._hashDelimeter = '.';
		// pre-computed permutations
		this._directions = [new Cell(+1, -1, 0), new Cell(+1, 0, -1), new Cell(0, +1, -1),
							new Cell(-1, +1, 0), new Cell(-1, 0, +1), new Cell(0, -1, +1)];
		this._diagonals = [new Cell(+2, -1, -1), new Cell(+1, +1, -2), new Cell(-1, +2, -1),
						new Cell(-2, +1, +1), new Cell(-1, -1, +2), new Cell(+1, -2, +1)];
		// cached objects
		this._list = [];
		this._vec3 = new THREE.Vector3();
		this._cel = new Cell();
		this._conversionVec = new THREE.Vector3();
		this._geoCache = [];
		this._matCache = [];
	}
    
    createVertex(i) {
		var angle = (vg.TAU / 6) * i;
		return new THREE.Vector3((this.cellSize * Math.cos(angle)), (this.cellSize * Math.sin(angle)), 0);
	}

    cubeRound(h) {
		var rx = Math.round(h.q);
		var ry = Math.round(h.r);
		var rz = Math.round(h.s);

		var xDiff = Math.abs(rx - h.q);
		var yDiff = Math.abs(ry - h.r);
		var zDiff = Math.abs(rz - h.s);

		if (xDiff > yDiff && xDiff > zDiff) {
			rx = -ry-rz;
		}
		else if (yDiff > zDiff) {
			ry = -rx-rz;
		}
		else {
			rz = -rx-ry;
		}

		return this._cel.set(rx, ry, rz);
	}

    cellToPixel(cell) {
		this._vec3.x = cell.q * this._cellWidth * 0.75;
		this._vec3.y = cell.h;
		this._vec3.z = -((cell.s - cell.r) * this._cellLength * 0.5);
		return this._vec3;
	}

	pixelToCell(pos) {
		// convert a position in world space ("pixels") to cell coordinates
		var q = pos.x * (HexGrid.TWO_THIRDS / this.cellSize);
		var r = ((-pos.x / 3) + (vg.SQRT3/3) * pos.z) / this.cellSize;
		this._cel.set(q, r, -q-r);
		return this._cubeRound(this._cel);
	}

	getCellAt(pos) {
		// get the Cell (if any) at the passed world position
		var q = pos.x * (HexGrid.TWO_THIRDS / this.cellSize);
		var r = ((-pos.x / 3) + (vg.SQRT3/3) * pos.z) / this.cellSize;
		this._cel.set(q, r, -q-r);
		this._cubeRound(this._cel);
		return this.cells[this.cellToHash(this._cel)];
	}

	getNeighbors(cell, diagonal, filter) {
		// always returns an array
		var i, n, l = this._directions.length;
		this._list.length = 0;
		for (i = 0; i < l; i++) {
			this._cel.copy(cell);
			this._cel.add(this._directions[i]);
			n = this.cells[this.cellToHash(this._cel)];
			if (!n || (filter && !filter(cell, n))) {
				continue;
			}
			this._list.push(n);
		}
		if (diagonal) {
			for (i = 0; i < l; i++) {
				this._cel.copy(cell);
				this._cel.add(this._diagonals[i]);
				n = this.cells[this.cellToHash(this._cel)];
				if (!n || (filter && !filter(cell, n))) {
					continue;
				}
				this._list.push(n);
			}
		}
		return this._list;
	}

	getRandomCell() {
		var c, i = 0, x = vg.Tools.randomInt(0, this.numCells);
		for (c in this.cells) {
			if (i === x) {
				return this.cells[c];
			}
			i++;
		}
		return this.cells[c];
	}

	cellToHash(cell) {
		return cell.q+this._hashDelimeter+cell.r+this._hashDelimeter+cell.s;
	}

	distance(cellA, cellB) {
		var d = Math.max(Math.abs(cellA.q - cellB.q), Math.abs(cellA.r - cellB.r), Math.abs(cellA.s - cellB.s));
		d += cellB.h - cellA.h; // include vertical height
		return d;
	}

	clearPath() {
		var i, c;
		for (i in this.cells) {
			c = this.cells[i];
			c._calcCost = 0;
			c._priority = 0;
			c._parent = null;
			c._visited = false;
		}
	}

	traverse(cb) {
		var i;
		for (i in this.cells) {
			cb(this.cells[i]);
		}
	}

	generateTile(cell, scale, material) {
		var height = Math.abs(cell.h);
		if (height < 1) height = 1;

		var geo = this._geoCache[height];
		if (!geo) {
			this.extrudeSettings.depth = height;
			geo = new THREE.ExtrudeGeometry(this.cellShape, this.extrudeSettings);
			this._geoCache[height] = geo;
		}

		var tile = new Tile({
			size: this.cellSize,
			scale: scale,
			cell: cell,
			geometry: geo,
			material: material
		});

		cell.tile = tile;

		return tile;
	}

	generateTiles(config) {
		config = config || {};
		var tiles = [];
		var settings = {
			tileScale: 0.95,
			cellSize: this.cellSize,
			material: null,
			extrudeSettings: {
				depth: 1,
				bevelEnabled: true,
				bevelSegments: 1,
				steps: 1,
				bevelSize: this.cellSize/20,
				bevelThickness: this.cellSize/20
			}
		};

		settings = Tools.merge(settings, config);

		// overwrite with any new dimensions
		this.cellSize = settings.cellSize;
		this._cellWidth = this.cellSize * 2;
		this._cellLength = (vg.SQRT3 * 0.5) * this._cellWidth;

		this.autogenerated = true;
		this.extrudeSettings = settings.extrudeSettings;

		var i, t, c;
		for (i in this.cells) {
			c = this.cells[i];
			t = this.generateTile(c, settings.tileScale, settings.material);
			t.position.copy(this.cellToPixel(c));
			t.position.y = 0;
			tiles.push(t);
		}
		return tiles;
	}

	generateTilePoly(material) {
		if (!material) {
			material = new THREE.MeshBasicMaterial({color: 0x24b4ff});
		}
		var mesh = new THREE.Mesh(this.cellShapeGeo, material);
		this._vec3.set(1, 0, 0);
		mesh.rotateOnAxis(this._vec3, vg.PI/2);
		return mesh;
	}

	// create a flat, hexagon-shaped grid
	generate(config) {
		config = config || {};
		this.size = typeof config.size === 'undefined' ? this.size : config.size;
		var x, y, z, c;
		for (x = -this.size; x < this.size+1; x++) {
			for (y = -this.size; y < this.size+1; y++) {
				z = -x-y;
				if (Math.abs(x) <= this.size && Math.abs(y) <= this.size && Math.abs(z) <= this.size) {
					c = new Cell(x, y, z);
					this.add(c);
				}
			}
		}
	}

	generateOverlay(size, overlayObj, overlayMat) {
		var x, y, z;
		var geo = this.cellShape.createPointsGeometry();
		for (x = -size; x < size+1; x++) {
			for (y = -size; y < size+1; y++) {
				z = -x-y;
				if (Math.abs(x) <= size && Math.abs(y) <= size && Math.abs(z) <= size) {
					this._cel.set(x, y, z); // define the cell
					var line = new THREE.Line(geo, overlayMat);
					line.position.copy(this.cellToPixel(this._cel));
					line.rotation.x = 90 * vg.DEG_TO_RAD;
					overlayObj.add(line);
				}
			}
		}
	}

	add(cell) {
		var h = this.cellToHash(cell);
		if (this.cells[h]) {
			// console.warn('A cell already exists there');
			return;
		}
		this.cells[h] = cell;
		this.numCells++;

		return cell;
	}

	remove(cell) {
		var h = this.cellToHash(cell);
		if (this.cells[h]) {
			delete this.cells[h];
			this.numCells--;
		}
	}

	load(url, cb, scope) {
		var self = this;
		Tools.getJSON({
			url: url,
			callback: function(json) {
				self.fromJSON(json);
				cb.call(scope || null, json);
			},
			cache: false,
			scope: self
		});
	}

	fromJSON(json) {
		var i, c;
		var cells = json.cells;

		this.cells = {};
		this.numCells = 0;

		this.size = json.size;
		this.cellSize = json.cellSize;
		this._cellWidth = this.cellSize * 2;
		this._cellLength = (vg.SQRT3 * 0.5) * this._cellWidth;

		this.extrudeSettings = json.extrudeSettings;
		this.autogenerated = json.autogenerated;

		for (i = 0; i < cells.length; i++) {
			c = new Cell();
			c.copy(cells[i]);
			this.add(c);
		}
	}

	toJSON() {
		var json = {
			size: this.size,
			cellSize: this.cellSize,
			extrudeSettings: this.extrudeSettings,
			autogenerated: this.autogenerated
		};
		var cells = [];
		var c, k;

		for (k in this.cells) {
			c = this.cells[k];
			cells.push({
				q: c.q,
				r: c.r,
				s: c.s,
				h: c.h,
				walkable: c.walkable,
				userData: c.userData
			});
		}
		json.cells = cells;

		return json;
	}
}

export default HexGrid;
