"use strict";

/** @constructor */
function Shash(width, height, onNeighbour) {
	this.objects = [];
	this.grid = [];
	this.gridSize = { x: 0, y: 0 };
	this.size = { x: width || 0, y: height || 0 };
	this.onNeighbour = onNeighbour || null;
}

/** @constructor */
Shash.gridItem = function (shash, object) {
	this.shash = shash;
	this.object = object;
	this.grid = this.gridIndex = null;
};

Shash.prototype.add = function (object, width, height) {
	var ob = new Shash.gridItem(this, object);
	this.objects.push(ob);
	if (this.gridSize.x < width) this.gridSize.x = height;
	if (this.gridSize.y < height) this.gridSize.y = height;
	return ob;
}

Shash.prototype.check = function () {
	if (!this.onNeighbour) return;

	this.grid = [];
	var i = Math.ceil(this.size.x / this.gridSize.x),
		J = Math.ceil(this.size.y / this.gridSize.y);
	while (i--) {
		this.grid[i] = [];
		var j = J;
		while (j--) this.grid[i][j] = [];
	}
	i = this.objects.length;
	while (i--) {
		var grob = this.objects[i];
		grob.grid = grob.shash.grid[Math.floor(grob.object.coords.x / grob.shash.gridSize.x)][Math.floor(grob.object.coords.y / grob.shash.gridSize.y)];
		grob.gridIndex = grob.grid.length;
		grob.grid.push(grob);
	}
	i = this.grid.length;
	while (i--) {
		var gridx = this.grid[i],
			j = gridx.length,
			xr = i === this.grid.length - 1 ? 1 : 2;
		while (j--) {
			var gridy = gridx[j],
				k = gridy.length;
			while (k--) {
				grob = gridy[k];
				var xl = xr;
				while (xl--) {
					var xc = i + xl,
						yr = j === gridx.length - 1 ? [j - 1, j] : xl === 1 && j !== 0 ? [j - 1, j, j + 1] : [j, j + 1],
						yl = yr.length;
					while (yl--) {
						var ogrid = this.grid[xc][yr[yl]],
							oi = ogrid === grob.grid ? grob.gridIndex : ogrid.length;
						while (oi--) this.onNeighbour(grob.object, ogrid[oi].object);
					}
				}
			}
		}
	}
}
