
class Generator {
  constructor() {
    let INFO_ON = true;

    // THREE.js VIEW SETTINGS
    this.scaleFac = 2000;
    this.cameraBoundary = 250;

    // ORBIT CALCULATION CONSTRAINTS PER LEVEL
    this.numSubsetPoints = 30000;
    this.numSubsets = 10;
    this.numPoints = numSubsetPoints * numSubsets;

    // 1 LEVEL = 1 SUBSET RENDER
    this.levels = 10;
    this.levelDepth = 1000;

    // COLOR PROPS
    this.brightness = Math.random() * (.95 - .5) + .5;
    this.saturation = Math.random() * (.95 - .5) + .5;

    // SIZE OF RENDERED POINTS
    this.pointSize = 5;

  }

  detectWebGL() {
    if ( ! Detector.webgl ) {
      return Detector.addGetWebGLMessage();
    }
  }



  render() {

    return (
      <div>
        {message}
      </div>
    )
  }

}

export const Generator;
