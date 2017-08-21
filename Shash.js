"use strict";

/** @constructor */
function Shash(width, height, onNeighbour) {
	this.objects = [];
	this.grid = [];
	this.gridSize = { x: 1e-300, y: 1e-300 };
	this.size = { x: width || 1e-300, y: height || 1e-300 };
	this.onNeighbour = onNeighbour || null;
}

Shash.prototype.add = function (object, width, height) {
	if (this.gridSize.x < width) this.gridSize.x = width;
	if (this.gridSize.y < height) this.gridSize.y = height;
	this.objects.push({
		object: object
	});
}

Shash.prototype._neighbour = function (object, ogrid) {
	var ok = ogrid.length;
	while (ok--) this.onNeighbour(object, ogrid[ok].object);
}

Shash.prototype.check = function () {
	if (!this.onNeighbour) return;

	var i = Math.ceil(this.size.x / this.gridSize.x),
		J = Math.ceil(this.size.y / this.gridSize.y);
	this.grid = [];
	while (i--) {
		this.grid[i] = [];
		var j = J;
		while (j--) this.grid[i][j] = [];
	}

	i = this.objects.length;
	while (i--) {
		var grob = this.objects[i];
		grob.grid = this.grid[Math.floor(grob.object.coords.x / this.gridSize.x)][Math.floor(grob.object.coords.y / this.gridSize.y)];
		grob.grid.push(grob);
	}

	i = this.grid.length;
	while (i--) {
		var gridx = this.grid[i],
			iLUB = i !== this.grid.length - 1;
		j = gridx.length;
		while (j--) {
			var grid = gridx[j],
				k = grid.length,
				jLUB = j !== gridx.length - 1,
				jG0 = j !== 0;
			while (k--) {
				grob = grid[k];
				var ok = k;
				while (ok--) this.onNeighbour(grob.object, grid[ok].object);
				if (iLUB) {
					var ogridx = this.grid[i + 1];
					if (jG0) this._neighbour(grob.object, ogridx[j - 1]);
					this._neighbour(grob.object, ogridx[j]);
					if (jLUB) this._neighbour(grob.object, ogridx[j + 1]);
				}
				if (jLUB) this._neighbour(grob.object, gridx[j + 1]);
			}
		}
	}
}
