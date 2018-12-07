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
  inputsAttrs.forEach( ( attrs ) => {
    const label = createElWithAttributes( 'label', form, { 'class': 'form-label', 'id': `${attrs.id}-label` } );
    // label.innerHtml = attrs.id;
    // label.innerHtml = attrs.min;
    // label.innerHtml = attrs.max;
    createElWithAttributes( 'input', label, attrs );
  });
}

createElWithAttributes( 'form', document.body, { 'id': 'form', 'class': 'scrollable', 'style': 'z-index: 101;' } );
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

const button = createElWithAttributes( 'button', document.body, {
   'id': 'boom',
   'style': `
     top: ${random(3, 97)}vh;
     left: ${random(3, 97)}vw;
    `
 });
button.innerHTML = 'boom'
button.onclick = () => { if ( !cosmicInception ) easterEggBang() };
