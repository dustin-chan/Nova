function defBrightness() {
  return random(0.5, 0.95);
}

function defSaturation() {
  return random(0.7, 0.95);
}

function detectWebGL() {
  if ( ! Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
}

function orbitZPos(levelNum, orbitNum) {
  return - (levelDepth * levelNum) - (orbitNum * levelDepth / numOrbits) + scale/2;
}

function initializeAnimation() {
  animationContainer = document.createElement( "div" );
  document.body.appendChild( animationContainer );

  renderer = new THREE.WebGLRenderer({
    clearColor: 0x000000,
    clearAlpha: 1,
    antialias: false
  });
  renderer.setSize( window.innerWidth, window.innerHeight );

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, fogDensity );

  camera = new THREE.PerspectiveCamera(
    fov,
    aspect,
    1,
    farPlane
  );
  camera.position.z = scale / 2;

  const texture = new THREE.TextureLoader();
  let sprite = texture.load( spritePath );

  generateOrbitPoints();

  for ( let i = 0; i < numLevels; i++ ) {
    for ( let j = 0; j < numOrbits; j++ ) {
      const geometry = new THREE.Geometry();

      for ( let k = 0; k < numPlanePoints; k++ ) {
        let point = orbits[j][k];
        geometry.vertices.push( point.vertex );
      }

      const material = new THREE.PointsMaterial({
        size: pointSize,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
      });
      material.color.setHSL(
        Math.random(),
        defSaturation(),
        defBrightness()
      );

      const particles = new THREE.Points( geometry, material );
      particles.position.x = 0;
      particles.position.y = 0;
      particles.position.z = orbitZPos(i, j);
      particles.needsUpdate = false;
      scene.add( particles );
    }
  }
  addStats();

  setInterval( updateOrbit, 7000 );
}

function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}

function render() {
// TODO

  const sceneOrbits = scene.children;

  for( i = 0; i < sceneOrbits.length; i++ ) {
    const orbit = sceneOrbits[i];

    orbit.position.z += speed;
    orbit.rotation.z += rotationSpeed;

    if ( speed > 0 ) {
      if ( orbit.position.z > camera.position.z ) {
        orbit.position.z = farPlane;

        if ( orbit.geometry.needsUpdate == true ) {
          orbit.geometry.verticesNeedUpdate = true;
          orbit.myMaterial.color.setHSL(
            Math.random(),
            defSaturation(),
            defBrightness()
          );
          orbit.needsUpdate = false;
        }
      }
    } else {
      if ( orbit.position.z < farPlane ) {
        orbit.position.z = camera.position.z;

        if ( orbit.geometry.needsUpdate == true ) {
          orbit.geometry.verticesNeedUpdate = true;
          orbit.myMaterial.color.setHSL(
            Math.random(),
            defSaturation(),
            defBrightness()
          );
          orbit.needsUpdate = false;
        }
      }
    }
  }
  camera.lookAt( scene.position );

  renderer.render( scene, camera );
}

function addStats() {
  stats = new Stats();
  stats.domElement.className = "stats";
  animationContainer.appendChild( stats.domElement );
}
