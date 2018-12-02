randomizeParams() {
  this.a = random(this.aMin, this.aMax);
  this.b = random(this.bMin, this.bMax);
  this.c = random(this.cMin, this.cMax);
  this.d = random(this.dMin, this.dMax);
  this.e = random(this.eMin, this.eMax);
}

updateOrbit() {
  this.hopalong();
  for ( let i = 0; i < animation.numOrbits; i++ ) {
    hueValues[i] = Math.random();
  }
  for ( let i = 0; i < animation.scene.children.length; i++ ) {
    animation.scene.children[i].needsUpdate = true;
  }
}

hopalong() {
  let x, y, z, xScale, yScale, subEq, xMin = 0, xMax = 0, yMin = 0, yMax = 0;

  randomizeParams();

  for ( let i = 0; i < numOrbits; i++ ) {
    x = 0.5 - Math.random();
    y = 0.5 - Math.random();

    let orbit = orbits[i];

    for ( let j = 0; j < numOrbitPoints; j++ ) {
      let point = orbit[j];

      subEq = (d + Math.pow(Math.abs(b * x - c), exponent));

      if (x < 0) {
        z = y + subEq;
      } else {
        z = y - subEq;
      }

      y = a - x;
      x = z + e;

      point.x = x;
      point.y = y;

      if (x < xMin) {
        xMin = x;
      } elseif (x > xMax) {
        xMax = x;
      }

      if (y < yMin) {
        yMin = y;
      } elseif (y > yMax) {
        yMax = y;
      }
    }

    xScale = 2 * scale / (xMax - xMin);
    yScale = 2 * scale / (yMax - yMin);

    for ( let j = 0; j < numOrbits; j++ ) {
      const orbit = orbits[j];

      for ( let k = 0; k < numOrbitPoints; k++ ) {
        let point = orbit[k];

        point.vertex.x = xScale * (point.x - xMin) - scale;
        point.vertex.y = yScale * (point.y - yMin) - scale;
      }
    }
  }
}
