const onWindowLoad = () => {
  if ( !Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
};

window.addEventListener( 'onload', onWindowLoad );

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const onMouseMove = (e) => {
  mouseX = e.clientX - ( window.innerWidth / 2 );
  mouseY = e.clientY - ( window.innerHeight / 2 );
};

const onKeyDown = (e) => {
  switch(e.keyCode) {
    case 38:
      if (( speed >= 75 && speed < 500 ) || ( speed <= -75 )) {
        speed += 1;
      } else if ( speed > -75 && speed < 75 ) {
        speed += 0.5;
      }
      break;
    case 40:
      if (( speed >= 75 ) || ( speed <= -75 && speed > -500 )) {
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
    case 104:
      toggleInfo();
  }
};
