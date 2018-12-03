const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

function chooseRotationDirection() {
  let num = Math.floor(random(-1, 1));
  if (num === -1) {
    rotationSpeed = -0.002;
  } else {
    rotationSpeed = 0.002;
  }
}

let infoOn = true;

// ANIMATION VARIABLES
  let animationContainer;

  // THREE.js VIEW SETTINGS
  let camera, scene, renderer;
  let scale = 2000;
  let cameraBoundary = 1000;
  let fov = random(35, 70);
  let fogDensity = 0.0001;

  // ORBIT CALCULATION CONSTRAINTS PER LEVEL
  let numOrbitPoints = random(20000, 35000);
  let numOrbits = random(7, 12);
  let numPoints = numOrbitPoints * numOrbits;

  // 1 LEVEL = 1 ORBIT RENDER
  let numLevels = random(7, 10);
  let levelDepth = random(1200, 1800);

  let farPlane = -(levelDepth * (numLevels - 1)) - (numOrbits  * levelDepth / numOrbits) + scale/2;

  let orbitUpdateTime = random(1000, 10000);

  // SIZE OF RENDERED POINTS
  let pointSize = 5;


  let mouseX = 0;
  let mouseY = 0;

  let speed = random(-5, 15);
  let rotationSpeed;
  chooseRotationDirection();

  let spritePath = "./assets/nebula.png";

// GENERATOR VARIABLES
  let orbits = [], hues = [];

  let aMin = random(-35, -25);
  let aMax = random(25, 35);

  let bMin = random(0, 0.5);
  let bMax = random(2, 5);

  let cMin = random(1, 3);
  let cMax = random(20, 30);

  let dMin = random(0, 5);
  let dMax = random(25, 60);

  let eMin = random(0, 5);
  let eMax = random(25, 60);

  let a, b, c, d, e;

  let exponent = random(0.01, 0.25);
