
class Animation {
  constructor() {
    let INFO_ON = true;

    // THREE.js VIEW SETTINGS
    this.scale = 2000;
    this.cameraBoundary = 250;
    this.fov = 55;
    this.aspect = window.innerWidth / window.innerHeight;
    this.fogDensity = 0.00050;

    // ORBIT CALCULATION CONSTRAINTS PER LEVEL
    this.numSubsetPoints = 30000;
    this.numSubsets = 10;
    this.numPoints = this.numSubsetPoints * this.numSubsets;

    // 1 LEVEL = 1 SUBSET RENDER
    this.levels = 10;
    this.levelDepth = 1000;

    // COLOR PROPS
    this.brightness = Math.random() * (0.95 - 0.5) + 0.5;
    this.saturation = Math.random() * (0.95 - 0.5) + 0.5;

    // SIZE OF RENDERED POINTS
    this.pointSize = 5;
    this.hueValues = [];

    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer =  null;


    this.mouseX = 0;
    this.mouseY = 0;

    this.speed = 2.5;
    this.rotationSpeed = 0.002;

    this.spritePath = "./assets/nebula.png";

    this.generator = new Generator();

    this.initialize = this.initialize.bind(this);
    this.animate = this.animate.bind(this);
    this.addStats = this.addStats.bind(this);

    initialize();
    animate();
  }

  detectWebGL() {
    if ( ! Detector.webgl ) {
      return Detector.addGetWebGLMessage();
    }
  }

  initialize() {
    const texture = new THREE.TextureLoader();
    let sprite = texture.load( this.spritePath );

    let animationContainer = document.createElement( "div" );
    document.body.appendChild( animationContainer );

    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, 1, 3 * this.scale);
    this.camera.position.z = this.scale / 2;

    this.scene = new THREE.scene();
    this.scene.fog = new THREE.FogExp2( 0x000000, this.fogDensity );

    generator.hopalong();

    addStats();
  }

  animate() {
    requestAnimationFrame( animate );
    render();
    this.stats.update();
  }

  addStats() {
    this.stats = new Stats();
    this.stats.domElement.className = "stats";
    animationContainer.appendChild( this.stats.domElement );
  }

  render() {

  }

}

const animation = new Animation()
