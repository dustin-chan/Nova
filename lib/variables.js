function random(min, max) {
  return Math.random() * (max - min) + min;
}

function chooseRotationSpeed() {
  let num = Math.floor(random(-2, 2));
  if ( num === -2 ) {
    rotationSpeed = -0.002;
  } else if ( num === -1 ) {
    rotationSpeed = -0.001;
  } else if (num === 0) {
    rotationSpeed = 0.001;
  } else {
    rotationSpeed = 0.002;
  }
}

function defRandomVars() {
  finalFov = random(35, 60);

  numOrbitPoints = random(20000, 35000);
  numOrbits = random(6, 12);

  numLevels = random(6, 9);
  levelDepth = random(1200, 1800);

  orbitUpdateTime = random(2000, 10000);

  farPlane = -(levelDepth * (numLevels - 1)) - (numOrbits  * levelDepth / numOrbits) + scale/2;

  speed = random(-10, 10);

  chooseRotationSpeed();

  aMin = random(-35, -25);
  aMax = random(25, 35);

  bMin = random(0, 0.5);
  bMax = random(2, 5);

  cMin = random(1, 3);
  cMax = random(20, 30);

  dMin = random(0, 5);
  dMax = random(25, 60);

  eMin = random(0, 5);
  eMax = random(25, 60);

  exponent = Math.random();
}

let infoOn = true;
let cosmicInception = true;
let fixedCamera = false;

// ANIMATION VARIABLES
  let animationContainer, stats;

  // THREE.js SETTING PARAMS
  let camera, scene, renderer, fovDecrementInterval;
  let scale = 2000;
  let cameraBoundary = 1000;
  let finalFov;
  let fov = 180;
  let fogDensity = 0.00005;

  let sprite;
  let spritePath = "./assets/nebula.png";
  let pointSize = 5;

  // ORBIT CALCULATION CONSTRAINTS PER LEVEL
  let numOrbitPoints;
  let numOrbits;
  let numPoints = numOrbitPoints * numOrbits;

  // 1 LEVEL = 1 ORBIT RENDER
  let numLevels;
  let levelDepth;

  let farPlane;

  let mouseX = 0;
  let mouseY = 0;

// MODIFIABLE VARIABLES
  let orbitUpdateTime;
  let orbitUpdateInterval;

  let speed;
  let rotationSpeed;

  // GENERATOR VARIABLES
    let orbits = [];

    let aMin;
    let aMax;

    let bMin;
    let bMax;

    let cMin;
    let cMax;

    let dMin;
    let dMax;

    let eMin;
    let eMax;

    let aPheno, bPheno, cPheno, dPheno, ePheno;

    let exponent;

defRandomVars();
