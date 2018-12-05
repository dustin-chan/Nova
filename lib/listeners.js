const onWindowLoad = () => {
  if ( !Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
};

window.addEventListener( 'onload', onWindowLoad );

const onWindowResize = () => {
  if ( infoOn ) {
    camera.aspect = window.innerWidth * 0.6 / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth * 0.6, window.innerHeight );
  } else {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
};

const onMouseMove = (e) => {
  mouseX = e.clientX - ( window.innerWidth / 2 );
  mouseY = e.clientY - ( window.innerHeight / 2 );
};

const onKeyDown = (e) => {
  switch(e.keyCode) {
    case 38:
      if (( speed >= 500 ) || speed <= -500 ) {
        speed += 2;
      } else if (( speed >= 75 && speed < 500 ) || ( speed > -500 && speed <= -75 )) {
        speed += 1;
      } else if ( speed > -75 && speed < 75 ) {
        speed += 0.5;
      }
      break;
    case 40:
      if ( speed >= 500 || ( speed <= -500 )) {
        speed -= 2;
      } else if (( speed >= 75 && speed < 500 ) || ( speed <= -75 && speed > -500 )) {
        speed -= 1;
      } else if ( speed > -75 && speed < 75 ) {
        speed -= 0.5;
      }
      break;
    case 37:
      rotationSpeed += 0.001;
      break;
    case 39:
      rotationSpeed -= 0.001;
      break;
    case 72:
      toggleInfo();
      break;
      // ADD KEYCODE FOR ENTER
    case 13:
    case 32:
      if ( !cosmicInception ) {
        easterEggBang();
      }
  }
};

const toggleInfo = () => {
  if ( infoOn ) {
    document.getElementById( 'form' ).style.display = 'none';
    document.getElementById( 'info' ).style.display = 'none';
    document.getElementById( 'about' ).style.display = 'none';
    stats.domElement.style.display = 'none';
    renderer.domElement.style.cursor = 'none';

    infoOn = false;

    onWindowResize();
  } else {
    document.getElementById( 'form' ).style.display = 'flex';
    document.getElementById( 'info' ).style.display = 'block';
    document.getElementById( 'about' ).style.display = 'block';
    stats.domElement.style.display = 'block';
    renderer.domElement.style.cursor = '';

    infoOn = true;

    onWindowResize();
  }
};
