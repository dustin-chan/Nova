function detectWebGL() {
  if ( ! Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
}

window.addEventListener( 'onload', detectWebGL );

const onWindowResize = () => {
  if ( infoOn ) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  } else {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
};

const onMouseMove = (e) => {
  if ( !fixedCamera ) {
    mouseX = e.clientX - ( window.innerWidth / 2 );
    mouseY = e.clientY - ( window.innerHeight / 2 );
  }
};

function incrementSpeed( increment ) {
  const speedRange = document.getElementById( 'speed' );
  const speedVal = document.getElementById( 'speed-value' );
  speed += increment;
  speedRange.value = speed;
  speedVal.innerHTML = roundTo(speed, 100);
}

function incrementRotationSpeed( increment ) {
  const rotationSpeedRange = document.getElementById( 'rotationSpeed' );
  const rotationSpeedVal = document.getElementById( 'rotationSpeed-value' );
  rotationSpeed += increment;
  rotationSpeedRange.value = rotationSpeed;
  rotationSpeedVal.innerHTML = roundTo(rotationSpeed, 1000);
}

const onKeyDown = (e) => {

  // ADD UPDATE TO DOMELEMENTS AS WELL ON KEYDOWN FOR SPEED, ROTATION SPEED
  switch(e.keyCode) {
    case 38:
      if (( speed >= 500 ) || speed <= -500 ) {
        incrementSpeed( 2 );
      } else if (( speed >= 75 && speed < 500 ) || ( speed > -500 && speed <= -75 )) {
        incrementSpeed( 1 );
      } else if ( speed > -75 && speed < 75 ) {
        incrementSpeed( 0.5 );
      }
      break;
    case 40:
      if ( speed >= 500 || ( speed <= -500 )) {
        incrementSpeed( -2 );
      } else if (( speed >= 75 && speed < 500 ) || ( speed <= -75 && speed > -500 )) {
        incrementSpeed( -1 );
      } else if ( speed > -75 && speed < 75 ) {
        incrementSpeed( -0.5 );
      }
      break;
    case 37:
      incrementRotationSpeed( -0.001 );
      break;
    case 39:
      incrementRotationSpeed( 0.001 );
      break;
    case 72:
      toggleInfo();
      break;
    case 70:
      toggleFixedCamera();
      break;
    case 13:
    case 32:
      if ( !cosmicInception ) {
        easterEggBang();
      }
  }
};

const toggleFixedCamera = () => {
  if ( fixedCamera ) {
    fixedCamera = false;
  } else {
    fixedCamera = true;
  }
};

const toggleInfo = () => {
  if ( infoOn ) {
    document.getElementById( 'form' ).style.display = 'none';
    document.getElementById( 'info' ).style.display = 'none';
    document.getElementById( 'header' ).style.display = 'none';
    stats.domElement.style.display = 'none';
    renderer.domElement.style.cursor = 'none';

    infoOn = false;

    onWindowResize();
  } else {
    document.getElementById( 'form' ).style.display = 'flex';
    document.getElementById( 'info' ).style.display = 'block';
    document.getElementById( 'header' ).style.display = 'flex';
    stats.domElement.style.display = 'block';
    renderer.domElement.style.cursor = '';

    infoOn = true;

    onWindowResize();
  }
};
