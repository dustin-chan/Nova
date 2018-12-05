const updateParam = (e) => {
  e.stopPropagation();
  const stringEvalFunction = new Function( e.target.id + ' = ' + e.target.value );
  stringEvalFunction();
};

const updateOrbitInterval = (e) => {
  e.stopPropagation();
  const stringEvalFunction = new Function( e.target.id + ' = ' + e.target.value );
  stringEvalFunction();
  clearInterval( orbitUpdateInterval );
  orbitUpdateInterval = setInterval( updateOrbit, orbitUpdateTime );
};

function createElWithAttributes( elType, parent, attributes ) {
  const el = document.createElement( elType );

  Object.keys( attributes ).forEach(( attribute ) => {
    el.setAttribute( attribute, attributes[attribute] );
  });

  if ( attributes.id === 'orbitUpdateTime' ) {
    el.onchange = updateOrbitInterval;
    el.onkeydown = updateOrbitInterval;
  } else if ( attributes.type === 'range' ) {
    el.oninput = updateParam;
    el.onkeydown = updateParam;
  }

  parent.appendChild( el );
  return el;
}

function createInputs( inputsAttrs ) {
  inputsAttrs.forEach( ( attr ) => {
    // const label = createElWithAttributes( 'label', form, { 'a' } )
    createElWithAttributes( 'input', form, attr );
  });
}

createElWithAttributes( 'form', document.body, { 'id': 'form' } );
const form = document.getElementById( 'form' );

createInputs([
  speedRange,
  rotationSpeedRange,
  aMinRange,
  aMaxRange,
  bMinRange,
  bMaxRange,
  cMinRange,
  cMaxRange,
  dMinRange,
  dMaxRange,
  eMinRange,
  eMaxRange,
  exponentRange,
  orbitUpdateTimeRange
]);

// create and randomize position of boom button
