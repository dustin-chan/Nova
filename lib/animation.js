// import generatePoints from './generator.js';

function defBrightness() {
  return random(0.4, 0.85);
}

function defSaturation() {
  return random(0.75, 1);
}

function orbitZPos(levelNum, orbitNum) {
  return -((levelDepth) * levelNum) - (orbitNum * levelDepth / numOrbits) + scale/2;
}

function defRenderer() {
  renderer = new THREE.WebGLRenderer({
    clearColor: 0x000000,
    clearAlpha: 1,
    antialias: false
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  animationContainer.appendChild( renderer.domElement );
}

function defScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, fogDensity );
}

function defCamera() {
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    farPlane
  );
  camera.position.z = scale / 2;
}

function defMaterialTexture() {
  const texture = new THREE.TextureLoader();
  sprite = texture.load( spritePath );
}

function defMaterial() {
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
  return material;
}

function setThreeJSParams() {
  defRenderer();
  defScene();
  defCamera();
  defMaterialTexture();
}

function defAnimationOrbitParams() {
  for ( let i = 0; i < numOrbits; i++ ) {

    let orbitPoints = [];

    for ( let j = 0; j < numOrbitPoints; j++ ) {
      orbitPoints[j] = { vertex: new THREE.Vector3( 0, 0, 0 ) };
    }
    orbits[i] = orbitPoints;
  }

  generatePoints();

  for ( let i = 0; i < numLevels; i++ ) {
    for ( let j = 0; j < numOrbits; j++ ) {

      const geometry = new THREE.Geometry();
      for ( let k = 0; k < numOrbitPoints; k++ ) {

        let point = orbits[j][k];
        geometry.vertices.push( point.vertex );
      }

      const material = defMaterial();

      const particles = new THREE.Points( geometry, material );
      particles.position.x = 0;
      particles.position.y = 0;
      particles.position.z = orbitZPos(i, j);
      particles.needsUpdate = false;
      scene.add( particles );
    }
  }
}

function initializeAnimation() {
  animationContainer = document.createElement( "div" );
  animationContainer.id = 'animation';
  document.body.appendChild( animationContainer );

  setThreeJSParams();

  defAnimationOrbitParams();

  addStats();

  window.addEventListener( 'resize', onWindowResize );
  animationContainer.addEventListener( 'mousemove', onMouseMove );
  document.addEventListener( 'keydown', onKeyDown );

  orbitUpdateInterval = setInterval( updateOrbit, orbitUpdateTime );
}

function updateCameraPos() {
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
}

function resetOrbitVerticeParams() {

  const sceneOrbits = scene.children;

  for ( i = 0; i < sceneOrbits.length; i++ ) {

    const orbit = sceneOrbits[i];
    const orbitPos = orbit.position;

    const nearPlane = camera.position.z + 100;

    orbitPos.z += speed;
    orbit.rotation.z += rotationSpeed;

    if ( speed > 0 ) {
      if ( orbitPos.z > nearPlane ) {

        orbitPos.z = farPlane + ( orbitPos.z % nearPlane );

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
      if ( orbitPos.z < farPlane ) {

        orbitPos.z = nearPlane + ( orbitPos.z % farPlane );

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
}

function createNewScene() {
  camera.fov = 180;
  camera.updateProjectionMatrix();

  defRandomVars();
  defScene();
  defAnimationOrbitParams();

  clearInterval( orbitUpdateInterval );
  updateOrbit();
  orbitUpdateInterval = setInterval( updateOrbit, orbitUpdateTime );

  animateNewSceneFov();
}

function easterEggBang() {
  cosmicInception = true;

  animateFovTo0();

  setTimeout( createNewScene, 3000 );
}

function render() {
  if ( !fixedCamera ) {
    updateCameraPos();
  }

  resetOrbitVerticeParams();

  if ( speed > 1000 || speed < -1000 ) {
    if ( !cosmicInception ) easterEggBang();
  } else {
    choice = Math.random();
    if ( choice < 0.77775 && choice > 0.77770 ) {
      if ( !cosmicInception ) easterEggBang();
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
  stats.domElement.id = "stats";
  animationContainer.appendChild( stats.domElement );
}

function decrementFov(decrement) {
  camera.fov -= decrement;
  camera.updateProjectionMatrix();
}

function decrementFovToFinalFov() {
  if ( camera.fov > finalFov * 2.5 ) {
    decrementFov(0.3);
  } else if (camera.fov > finalFov) {
    decrementFov( (camera.fov * (camera.fov / 2))  / (360 * 180) );
  }
}

function decrementFovTo0() {
  // work on transitions possibly faster
  if ( camera.fov > finalFov / 1.25 ) {
    decrementFov(0.25);
  } else if ( camera.fov > finalFov / 2) {
    decrementFov(0.5);
  } else if ( camera.fov > finalFov / 2.5) {
    decrementFov(0.75);
  } else if ( camera.fov > 0) {
    decrementFov(1);
  }
}

function clearFovIntroInterval( time ) {
  setTimeout(() => {
    clearInterval( fovDecrementInterval );
    cosmicInception = false;
  }, time);
}

function animateNewSceneFov() {
  fovDecrementInterval = setInterval( decrementFovToFinalFov, 6 );

  clearFovIntroInterval( 12000 );
}

function animateFov() {
  setTimeout(() => {
    fovDecrementInterval = setInterval( decrementFovToFinalFov, 6 );
  }, 500);

  clearFovIntroInterval( 12500 );
}

function animateFovTo0() {
  fovDecrementInterval = setInterval( decrementFovTo0, 6 );
  setTimeout(() => clearInterval( fovDecrementInterval ), 2950);
}

initializeAnimation();
animate();
animateFov();
