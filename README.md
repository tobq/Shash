# Shash
Simple, and fast, spacial hashing API

The shash class has only 2 members.

Setup

```javascript
var width = 1000,
    height = 500,
    shash = new Shash(width, height, onNeighbour);
    
shash.add({coords: {x:0, y:0}}, width, height)
```
An object with a "coords" property should be passed (x-y properties), along with a width and height.

```javascript
shash.check()
``` 
This will check through the grid, and call the "onNeighbour" callback for each pair of neighbouring objects

```javascript
function onNeighbour(object1, object2){
    console.log(object1, object2);
    // Do work with neighters, such as check collision.
}
```

Using grid objects

```javascript
// constructor
function rectangle(x, y, width, height){
    this.coords = new vec2(x || 0, y || 0);
    this.width = width || 10;
    this.height = height || 10
    shash.add(this, this.width, this.height);
}
```

