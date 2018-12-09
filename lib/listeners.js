function detectWebGL() {
  if ( ! Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
}

window.addEventListener( 'onload', detectWebGL );

const showAbout = () => {
  document.getElementById( 'about' ).style.display = 'block';
  aboutOn = true;

  document.getElementById( 'show-about-button' ).style.display = 'none';
  document.getElementById( 'hide-about-button' ).style.display = 'block';
};

const hideAbout = () => {
  document.getElementById( 'about' ).style.display = 'none';
  aboutOn = false;

  document.getElementById( 'show-about-button' ).style.display = 'block';
  document.getElementById( 'hide-about-button' ).style.display = 'none';
};

const showForm = () => {
  document.getElementById( 'form' ).style.display = 'flex';
  formOn = true;

  const stats = document.getElementById( 'stats' );
  stats.style.right = '18%';

  document.getElementById( 'show-form-button' ).style.display = 'none';
  document.getElementById( 'hide-form-button' ).style.display = 'block';
};

const hideForm = () => {
  document.getElementById( 'form' ).style.display = 'none';
  formOn = false;

  const stats = document.getElementById( 'stats' );
  stats.style.right = '3.5%';

  document.getElementById( 'show-form-button' ).style.display = 'block';
  document.getElementById( 'hide-form-button' ).style.display = 'none';
};

document.getElementById( 'show-about-button' ).onclick = showAbout;
document.getElementById( 'hide-about-button' ).onclick = hideAbout;
document.getElementById( 'show-form-button' ).onclick = showForm;
document.getElementById( 'hide-form-button' ).onclick = hideForm;

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
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
  speedVal.innerHTML = speed;
}

function incrementRotationSpeed( increment ) {
  const rotationSpeedRange = document.getElementById( 'rotationSpeed' );
  const rotationSpeedVal = document.getElementById( 'rotationSpeed-value' );
  rotationSpeed += increment;
  rotationSpeedRange.value = rotationSpeed;
  rotationSpeedVal.innerHTML = rotationSpeed;
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

const toggleForm = () => {
  if ( infoOn ) {
    if ( formOn ) {
      document.getElementById( 'form' ).style.display = 'none';
      document.getElementById( 'hide-form-button' ).style.display = 'none';
    } else {
      document.getElementById( 'show-form-button' ).style.display = 'none';
    }
  } else {
    if ( formOn ) {
      document.getElementById( 'form' ).style.display = 'flex';
      document.getElementById( 'hide-form-button' ).style.display = 'block';
    } else {
      document.getElementById( 'show-form-button' ).style.display = 'block';
    }
  }
};

const toggleAbout = () => {
  if ( infoOn ) {
    if ( aboutOn ) {
      document.getElementById( 'about' ).style.display = 'none';
      document.getElementById( 'hide-about-button' ).style.display = 'none';
    } else {
      document.getElementById( 'show-about-button' ).style.display = 'none';
    }
  } else {
    if ( aboutOn ) {
      document.getElementById( 'about' ).style.display = 'block';
      document.getElementById( 'hide-about-button' ).style.display = 'block';
    } else {
      document.getElementById( 'show-about-button' ).style.display = 'block';
    }
  }
};

const toggleInfo = () => {
  if ( infoOn ) {
    document.getElementById( 'header' ).style.display = 'none';
    stats.domElement.style.display = 'none';
    renderer.domElement.style.cursor = 'none';

    toggleAbout();

    toggleForm();

    infoOn = false;
  } else {
    document.getElementById( 'header' ).style.display = 'flex';
    stats.domElement.style.display = 'block';
    renderer.domElement.style.cursor = '';

    toggleAbout();

    toggleForm();

    infoOn = true;
  }
};
