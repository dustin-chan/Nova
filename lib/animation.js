function brightness() {
  return random(0.5, 0.95);
}

function saturation() {
  return random(0.7, 0.95);
}

function detectWebGL() {
  if ( ! Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
}

function initialize() {
  animationContainer = document.createElement( "div" );
  document.body.appendChild( animationContainer );

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, fogDensity );

  camera = new THREE.PerspectiveCamera(
    fov,
    aspect,
    1,
    3 * scale
  );
  camera.position.z = scale / 2;

  const texture = new THREE.TextureLoader();
  let sprite = texture.load( spritePath );

  hopalong();

  for (let i = 0; i < numPlanes; i++) hueValues[i] = Math.random();

  for (let i = 0; i < numLevels; i++) {
    for (let j = 0; j < numPlanes; j++) {
      const geometry = new THREE.Geometry();
      for (let k = 0; k < numPlanePoints; k++) {
        geometry.vertices.push( orbits[j][k].vertex );
      }
    }
  }

  addStats();
}

function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}

function addStats() {
  stats = new Stats();
  stats.domElement.className = "stats";
  animationContainer.appendChild( stats.domElement );
}
