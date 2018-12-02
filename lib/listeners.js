const onWindowLoad = () => {
  if ( !Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
};

const onWindowResize = () => {
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const onMouseMove = (e) => {
  mouseX = e.clientX - halfWindowWidth;
  mouseY = e.clientY - halfWindowHeight;
};

const onKeyDown = (e) => {
  switch(e.keycode) {
    case 38:
      speed += 0.5;
      break;
    case 40:
      speed -= 0.5;
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

window.addEventListener( 'onload', onWindowLoad );
window.addEventListener( 'resize', onWindowResize );
document.addEventListener( 'mousemove', onMouseMove );
document.addEventListener( 'keydown', onKeyDown );
