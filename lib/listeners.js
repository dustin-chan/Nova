window.onload = () => {
  if ( ! Detector.webgl ) {
    return Detector.addGetWebGLMessage();
  }
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
