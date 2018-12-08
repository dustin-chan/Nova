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

function roundTo(num, digit) {
  // Workaround for JavaScript division error (ex. -2574 / 0.01 === -25.740000000000002)
  return Math.round(num / digit) / (1 / digit);
}

function defRandomVars() {
  finalFov = random(45, 75);

  numOrbitPoints = random(20000, 35000);
  numOrbits = random(7, 12);

  numLevels = random(6, 9);
  levelDepth = random(1000, 1800);

  orbitUpdateTime = Math.round( random(5000, 15000) );

  farPlane = ( scale / 2 ) - ( levelDepth * numLevels );

  speed = roundTo( random(-5, 5), 0.01 );
  chooseRotationSpeed();

  aMin = roundTo( random(-35, -25), 0.01 );
  aMax = roundTo( random(25, 35), 0.01 );

  bMin = roundTo( random(0, 0.5), 0.01 );
  bMax = roundTo( random(2, 5), 0.01 );

  cMin = roundTo( random(1, 3), 0.01 );
  cMax = roundTo( random(20, 30), 0.01 );

  dMin = roundTo( random(0, 5), 0.01 );
  dMax = roundTo( random(25, 60), 0.01 );

  eMin = roundTo( random(0, 5), 0.01 );
  eMax = roundTo( random(25, 60), 0.01 );

  const choice = Math.random();
  if ( choice < 0.88 ) exponent = roundTo( random( 0, 0.5 ), 0.001 );
  else if ( choice < 0.9 ) exponent = roundTo( random( 0.5, 0.85 ), 0.001 );
  else exponent = roundTo( random( 0.85, 1 ), 0.001);
}

let infoOn = true;
let easterEggBang, cosmicInception = true;
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
  let orbitUpdateTime, orbitUpdateInterval;

  let speed, rotationSpeed;

  // GENERATOR VARIABLES
    let orbits = [];

    let aMin, aMax;
    let bMin, bMax;
    let cMin, cMax;
    let dMin, dMax;
    let eMin, eMax;

    let aPheno, bPheno, cPheno, dPheno, ePheno;

    let exponent;

defRandomVars();
