function prepareOrbitsForUpdate() {
  for ( let i = 0; i < scene.children.length; i++ ) {
    scene.children[i].needsUpdate = true;
  }
}

function updateOrbit() {
  generatePoints();
  prepareOrbitsForUpdate();
}

function generatePoints() {
  // Initialize min max variables for access in all loop runs
  let xMin = 0;
  let xMax = 0;
  let yMin = 0;
  let yMax = 0;

  // Randomize equation variables
  const a = random(aMin, aMax);
  aPheno = a;
  const b = random(bMin, bMax);
  bPheno = b;
  const c = random(cMin, cMax);
  cPheno = c;
  const d = random(dMin, dMax);
  dPHeno = d;
  const e = random(eMin, eMax);
  ePheno = e;


  for ( let i = 0; i < numOrbits; i++ ) {

    let x = 0.5 - Math.random();
    let y = 0.5 - Math.random();

    const orbit = orbits[i];

    for ( let j = 0; j < numOrbitPoints; j++ ) {
      let z;

      const point = orbit[j];

      // Hopalong Attractor Formula
        const subEq = (d + Math.pow(Math.abs(b * x - c), exponent));

        if (x < 0) z = y + subEq;
        else z = y - subEq;

        y = a - x;
        x = z + e;

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

    const xScale = 2 * scale / (xMax - xMin);
    const yScale = 2 * scale / (yMax - yMin);

    for ( let j = 0; j < numOrbits; j++ ) {

      const orbit = orbits[j];

      for ( let k = 0; k < numOrbitPoints; k++ ) {

        const point = orbit[k];

        point.vertex.x = xScale * (point.x - xMin) - scale;
        point.vertex.y = yScale * (point.y - yMin) - scale;
      }
    }
  }
}
