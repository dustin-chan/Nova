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

const onKeyDown = (e) => {
  const speedRange = document.getElementById( 'speed' );
  const speedVal = document.getElementById( 'speed-value' );
  const rotationSpeedRange = document.getElementById( 'rotationSpeed' );
  const rotationSpeedVal = document.getElementById( 'rotationSpeed-value' );
  // ADD UPDATE TO DOMELEMENTS AS WELL ON KEYDOWN FOR SPEED, ROTATION SPEED
  switch(e.keyCode) {
    case 38:
      if (( speed >= 500 ) || speed <= -500 ) {
        speed += 2;
        speedRange.value = speed;
        speedVal.innerHTML = roundTo(speed, 100);
      } else if (( speed >= 75 && speed < 500 ) || ( speed > -500 && speed <= -75 )) {
        speed += 1;
        speedRange.value = speed;
        speedVal.innerHTML = roundTo(speed, 100);
      } else if ( speed > -75 && speed < 75 ) {
        speed += 0.5;
        speedRange.value = speed;
        speedVal.innerHTML = roundTo(speed, 100);
      }
      break;
    case 40:
      if ( speed >= 500 || ( speed <= -500 )) {
        speed -= 2;
        speedRange.value = speed;
        speedVal.innerHTML = roundTo(speed, 100);
      } else if (( speed >= 75 && speed < 500 ) || ( speed <= -75 && speed > -500 )) {
        speed -= 1;
        speedRange.value = speed;
        speedVal.innerHTML = roundTo(speed, 100);
      } else if ( speed > -75 && speed < 75 ) {
        speed -= 0.5;
        speedRange.value = speed;
        speedVal.innerHTML = roundTo(speed, 100);
      }
      break;
    case 37:
      rotationSpeed -= 0.001;
      rotationSpeedRange.value = rotationSpeed;
      rotationSpeedVal.innerHTML = roundTo(rotationSpeed, 1000);
      break;
    case 39:
      rotationSpeed += 0.001;
      rotationSpeedRange.value = rotationSpeed;
      rotationSpeedVal.innerHTML = roundTo(rotationSpeed, 1000);
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
