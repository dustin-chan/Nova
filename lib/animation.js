
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
    this.numPlanePoints = 30000;
    this.numPlanes = 10;
    this.numPoints = this.numPlanePoints * this.numPlanes;

    // 1 LEVEL = 1 SUBSET RENDER
    this.numLevels = 10;
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
    this.render = this.render.bind(this);

    this.initialize();
    this.animate();
  }

  detectWebGL() {
    if ( ! Detector.webgl ) {
      return Detector.addGetWebGLMessage();
    }
  }

  initialize() {
    this.animationContainer = document.createElement( "div" );
    document.body.appendChild( this.animationContainer );

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2( 0x000000, this.fogDensity );

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.aspect,
      1,
      3 * this.scale
    );
    this.camera.position.z = this.scale / 2;

    const texture = new THREE.TextureLoader();
    let sprite = texture.load( this.spritePath );

    this.generator.hopalong();

    for (let i = 0; i < this.numPlanes; i++) this.hueValues[i] = Math.random();

    for (let i = 0; i < this.numLevels; i++) {
      for (let j = 0; j < this.numPlanes; j++) {
        const geometry = new THREE.Geometry();
        for (let k = 0; k < this.numPlanePoints; k++) {
          geometry.vertices.push( this.generator.orbit.subsets[j][k].vertex );
        }
      }
    }

    this.addStats();
  }

  animate() {
    requestAnimationFrame( this.animate );
    this.render();
    this.stats.update();
  }

  addStats() {
    this.stats = new Stats();
    this.stats.domElement.className = "stats";
    this.animationContainer.appendChild( this.stats.domElement );
  }

  render() {

  }

}

const animation = new Animation()
