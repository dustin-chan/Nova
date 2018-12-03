function randomizeEquationParams() {
  a = random(aMin, aMax);
  b = random(bMin, bMax);
  c = random(cMin, cMax);
  d = random(dMin, dMax);
  e = random(eMin, eMax);
}

function generateHues() {
  for ( let i = 0; i < numOrbits; i++ ) {
    hues[i] = Math.random();
  }
}

function prepareOrbitsForUpdate() {
  for ( let i = 0; i < scene.children.length; i++ ) {
    scene.children[i].needsUpdate = true;
  }
}

function updateOrbit() {
  generatePoints();
  generateHues();
  prepareOrbitsForUpdate();
}

function generatePoints() {
  randomizeEquationParams();

  let x, y, z, xScale, yScale, subEq;
  let xMin = 0;
  let xMax = 0;
  let yMin = 0;
  let yMax = 0;

  // Local vars for reduced lag
  let aL = a;
  let bL = b;
  let cL = c;
  let dL = d;
  let eL = e;
  let exponentL = exponent;
  let orbitsL = orbits;
  let numOrbitsL = numOrbits;
  let numOrbitPointsL = numOrbitPoints;
  let numPointsL = numPoints;
  let scaleL = scale;

  for ( let i = 0; i < numOrbitsL; i++ ) {

    x = 0.5 - Math.random();
    y = 0.5 - Math.random();

    let orbit = orbitsL[i];

    for ( let j = 0; j < numOrbitPointsL; j++ ) {

      let point = orbit[j];

      subEq = (dL + Math.pow(Math.abs(bL * x - cL), exponentL));

      if (x < 0) {
        z = y + subEq;
      } else {
        z = y - subEq;
      }

      y = aL - x;
      x = z + eL;

      point.x = x;
      point.y = y;

      if (x < xMin) {
        xMin = x;
      } else if (x > xMax) {
        xMax = x;
      }

      if (y < yMin) {
        yMin = y;
      } else if (y > yMax) {
        yMax = y;
      }
    }

    xScale = 2 * scaleL / (xMax - xMin);
    yScale = 2 * scaleL / (yMax - yMin);

    for ( let j = 0; j < numOrbitsL; j++ ) {

      const orbit = orbitsL[j];

      for ( let k = 0; k < numOrbitPointsL; k++ ) {

        let point = orbit[k];

        point.vertex.x = xScale * (point.x - xMin) - scaleL;
        point.vertex.y = yScale * (point.y - yMin) - scaleL;
      }
    }
  }
}
