
const halfWindowWidth = window.innerWidth / 2;
const halfWindowHeight = window.innerHeight / 2;

const onWindowLoad = () => {
  if ( !Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
};

const onWindowResize = () => {
  animation.camera.aspect = animation.aspect;
  animation.camera.updateProjectionMatrix();
  animation.renderer.setSize(window.innerWidth, window.innerHeight);
};

const onMouseMove = (e) => {
  mouseX = e.clientX - halfWindowWidth;
  mouseY = e.clientY - halfWindowHeight;
};

const onKeyDown = (e) => {
  switch(e.keycode) {
    case 38:

    case 40:
      generator.speed > 0 ? speed -= .5 : speed = 0;
      break;
    case 37:
      generator.rotationSpeed += .001;
      break;
    case 39:
      generator.rotationSpeed -= .001;
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
