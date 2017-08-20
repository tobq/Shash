# Shash
Simple, and fast, spacial hashing API

The shash class has only 2 members.

### Setup
```javascript
var width = 1000,
    height = 500,
    shash = new Shash(width, height, onNeighbour);
```
"gridItem" complient objects are added to the grid.

```javascript
shash.add(gridItem, width, height);

interface gridItem {
    coOrdinates coords;
}
interface coOrdinates {
    int x;
    int y;
}
```
### Running check

```javascript
shash.check()
``` 
This will check through the grid, and call the "onNeighbour" callback for each pair of neighbouring objects

```javascript
function onNeighbour(object1, object2){
    // Do work with neighters, such as check collision.
}
```
-----

Usage

```javascript
// constructor
function rectangle(x, y, width, height){
    this.coords = {
        x: x || 0,
        y: y || 0
    };
    this.width = width || 10;
    this.height = height || 10
    shash.add(this, this.width, this.height);
}
function onNeighbour(object1, object2){
    console.log("NEIGHBOURS:", object1, object2);
}

var width = 1000,
    height = 500,
    shash = new Shash(width, height, onNeighbour);
new rectangle(0, 0, 10, 10);
new rectangle(5, 0, 10, 10);
shash.check();
```
> **onNeighbour:** *NEIGHBOURS: rectangle {coords: {…}, width: 10, height: 10} rectangle {coords: {…}, width: 10, height: 10}*
