// import generatePoints from './generator.js';

function defBrightness() {
  return random(0.4, 0.85);
}

function defSaturation() {
  return random(0.7, 1);
}

function detectWebGL() {
  if ( ! Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
}

function orbitZPos(levelNum, orbitNum) {
  return -(levelDepth * levelNum) - (orbitNum * levelDepth / numOrbits) + scale/2;
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
  animationContainer.appendChild( renderer.domElement );

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, fogDensity );

  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    farPlane
  );
  camera.position.z = scale / 2;

  const texture = new THREE.TextureLoader();
  let sprite = texture.load( spritePath );

  for ( let i = 0; i < numOrbits; i++ ) {

    let orbitPoints = [];

    for ( let j = 0; j < numOrbitPoints; j++ ) {
      orbitPoints[j] = { vertex: new THREE.Vector3( 0, 0, 0 ) };
    }
    orbits.push(orbitPoints);
  }

  generatePoints();

  for ( let i = 0; i < numLevels; i++ ) {
    for ( let j = 0; j < numOrbits; j++ ) {

      const geometry = new THREE.Geometry();
      for ( let k = 0; k < numOrbitPoints; k++ ) {

        let point = orbits[j][k];
        geometry.vertices.push( point.vertex );
      }

      const material = new THREE.PointsMaterial({
        size: pointSize,
        map: sprite,
        blending: THREE.CustomBlending,
        depthTest: false,
        transparent: true
      });
      material.blendingEquation = THREE.AddEquation;
      material.blendSRC = THREE.SrcAlphaFactor;
      material.blendDst = THREE.OneFactor;
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

  window.addEventListener( 'resize', onWindowResize );
  document.addEventListener( 'mousemove', onMouseMove );
  document.addEventListener( 'keydown', onKeyDown );

  orbitUpdateInterval = setInterval( updateOrbit, orbitUpdateTime );
}

function render() {
  // if speed === 1000 re-start speed and animation
  // if a huevalue = 0.777 restart animation
  if ( camera.position.x >= -cameraBoundary && camera.position.x <= cameraBoundary ) {

    camera.position.x += ( -mouseX - camera.position.x ) * 0.02;

    if ( camera.position.x > cameraBoundary ) camera.position.x = cameraBoundary;
    else if ( camera.position.x < -cameraBoundary ) camera.position.x = -cameraBoundary;
  }
  if ( camera.position.y >= -cameraBoundary && camera.position.y <= cameraBoundary ) {

    camera.position.y += ( mouseY - camera.position.y ) * 0.02;

    if ( camera.position.y > cameraBoundary ) camera.position.y = cameraBoundary;
    else if ( camera.position.y < -cameraBoundary ) camera.position.y = -cameraBoundary;
  }

  const sceneOrbits = scene.children;

  for( i = 0; i < sceneOrbits.length; i++ ) {

    const orbit = sceneOrbits[i];

    orbit.position.z += speed;
    orbit.rotation.z += rotationSpeed;

    if ( speed > 0 ) {
      if ( orbit.position.z > camera.position.z + 100 ) {

        orbit.position.z = farPlane;

        if ( orbit.needsUpdate == true ) {
          orbit.geometry.verticesNeedUpdate = true;
          orbit.material.color.setHSL(
            Math.random(),
            defSaturation(),
            defBrightness()
          );
          orbit.needsUpdate = false;
        }
      }
    } else {
      if ( orbit.position.z < farPlane ) {

        orbit.position.z = camera.position.z + 100;

        if ( orbit.needsUpdate == true ) {
          orbit.geometry.verticesNeedUpdate = true;
          orbit.material.color.setHSL(
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

initializeAnimation();
animate();

// INITIAL EXPLOSION ANIMATION
  setTimeout(() => fovDecrementInterval = setInterval(() => {
    if ( camera.fov > finalFov * 2.5 ) {
      decrementFov(0.4);
    } else if (camera.fov > finalFov * 2) {
      decrementFov(0.6);
    } else if ( camera.fov > finalFov * 1.5 ) {
      decrementFov(0.4);
    } else if ( camera.fov > finalFov * 1.25 ) {
      decrementFov(0.2);
    } else if ( camera.fov > finalFov * 1.1 ) {
      decrementFov(0.1);
    } else if ( camera.fov > finalFov ) {
      decrementFov(0.05);
    }
  }, 6), 500);

  setTimeout(() => clearInterval( fovDecrementInterval ), 10000);
