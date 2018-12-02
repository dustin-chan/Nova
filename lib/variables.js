let infoOn = true;

let halfWindowWidth = window.innerWidth / 2;
let halfWindowHeight = window.innerHeight / 2;
// ANIMATION VARIABLES
  // THREE.js VIEW SETTINGS
  let scale = 2000;
  let cameraBoundary = 250;
  let fov = 55;
  let aspect = window.innerWidth / window.innerHeight;
  let fogDensity = 0.0005;

  // ORBIT CALCULATION CONSTRAINTS PER LEVEL
  let numOrbitPoints = 30000;
  let numOrbits = 10;
  let numPoints = numOrbitPoints * numOrbits;

  // 1 LEVEL = 1 ORBIT RENDER
  let numLevels = 10;
  let levelDepth = 1000;

  let farPlane = - levelDepth * (numLevels - 1) - (numOrbits  * levelDepth / numOrbits) + scale/2;

  // SIZE OF RENDERED POINTS
  let pointSize = 5;

  let camera, scene, renderer, composer;

  let mouseX = 0;
  let mouseY = 0;

  let speed = 2.5;
  let rotationSpeed = 0.002;

  let spritePath = "./assets/nebula.png";

// GENERATOR VARIABLES
  let orbits = [];

  let aMin = -30;
  let aMax = 30;

  let bMin = 0;
  let bMax = 4;

  let cMin = -20;
  let cMax = 20;

  let dMin = 0;
  let dMax = 100;

  let eMin = 0;
  let eMax = 30;

  let a, b, c, d, e;

  let exponent = 0.25;
