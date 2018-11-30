
class Scene {
  constructor() {
    let INFO_ON = true;

    // THREE.js VIEW SETTINGS
    this.scaleFac = 2000;
    this.cameraBoundary = 250;

    // ORBIT CALCULATION CONSTRAINTS PER LEVEL
    this.numSubsetPoints = 30000;
    this.numSubsets = 10;
    this.numPoints = this.numSubsetPoints * this.numSubsets;

    // 1 LEVEL = 1 SUBSET RENDER
    this.levels = 10;
    this.levelDepth = 1000;

    // COLOR PROPS
    this.brightness = Math.random() * (.95 - .5) + .5;
    this.saturation = Math.random() * (.95 - .5) + .5;

    // SIZE OF RENDERED POINTS
    this.pointSize = 5;

    this.camera = [];
    this.scene = [];
    this.renderer = [];
    this.composer = [];
    this.hueValues = [];

    this.mouseX = 0;
    this.mouseY = 0;

    this.halfWindowWidth = window.innerWidth / 2;
    this.halfWindowHeight = window.innerHeight / 2;

    this.speed = 2.5;
    this.rotationSpeed = 0.002;

    this.spritePath = "./assets/nebula.png";

    const generator = new Generator();

    this.initialize = this.initialize.bind(this);
    this.animate = this.animate.bind(this);
    this.addStats = this.addStats.bind(this);

    initialize();
    animate();
    addStats();
  }

  detectWebGL() {
    if ( ! Detector.webgl ) {
      return Detector.addGetWebGLMessage();
    }
  }

  initialize() {
    const texture = new THREE.TextureLoader();
    let sprite = texture.load( this.spritePath );

    this.sceneContainer = document.createElement( "div" );
    document.body.appendChild( sceneContainer );
  }

  animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
  }

  addStats() {
    this.stats = new Stats();
    this.stats.domElement.className = "stats";
    this.sceneContainer.appendChild( this.stats.domElement );
  }

  render() {

  }

}
new Scene()
