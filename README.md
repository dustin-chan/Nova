# Nova
A fractal visualizer built using Javascript, THREE.js and WebGL.
The following modification of Barry Martin's Hopalong Attractor formula is used to generate fractal point maps on planes that move in 3D space:

	x = y + (d + (|b * x - c|)^exponent) + e
	y = a - x

[Nova Live](https://dustin-chan.github.io/Nova/)

### Controls 

* Move the mouse to control the camera movement
* Press H to hide the interface
* Press F to fix the camera
* Press A to toggle the about section
* Press P to toggle the parameter form
* Press up or down to increase particle velocity
* Press left or right to increase rotation speed
* There are 8 possible ways to trigger a surprise Easter Egg, see if you can find them!

## Technologies 

* Vanilla JavaScript 
* CSS3
* HTML5
* THREE.js
* WebGL

## Features 

### Realistic High-Speed Movement

In order to achieve realistic high-speed illusory movement (like car wheels on a highway appearing to move slowly)
it was necessary for me to use the modulo operator when resetting the position of the rendered planes.

```javascript
      if ( orbitPos.z > nearPlane ) {
        orbitPos.z = farPlane + ( orbitPos.z % nearPlane );
      .
      .
      .
      if ( orbitPos.z < nearPlane ) {
        orbitPos.z = nearPlane + ( orbitPos.z % farPlane );
      .
      .
      .
```

### Big Bang Animation

In order to simulate a big bang the camera FOV starts at 180˚ and animates downward to a randomized parameter.
I played around with different decrement methods to make the animation as smooth as possible.

```javascript 
function decrementFov(decrement) {
  camera.fov -= decrement;
  camera.updateProjectionMatrix();
}

function decrementFovToFinalFov() {
  if ( camera.fov > finalFov * 2.5 ) {
    decrementFov(0.3);
  } else if (camera.fov > finalFov) {
    decrementFov( (camera.fov * (camera.fov / 10))  / (360 * 36) );
  } else {
    clearInterval( fovDecrementInterval );
    cosmicInception = false;
  }
}
.
.
.
function animateNewSceneFov() {
  fovDecrementInterval = setInterval( decrementFovToFinalFov, 6 );
}
```

