const updateParam = (e) => {
  e.stopPropagation();
  const stringEvalFunction = new Function( e.target.id + ' = ' + e.target.value );
  stringEvalFunction();
  const elValLi = document.getElementById( `${e.target.id}-value` );
  elValLi.innerHTML = roundTo( eval( e.target.value ), 100 );
};

const updateOrbitInterval = (e) => {
  e.stopPropagation();
  const stringEvalFunction = new Function( e.target.id + ' = ' + e.target.value );
  stringEvalFunction();
  clearInterval( orbitUpdateInterval );
  orbitUpdateInterval = setInterval( updateOrbit, orbitUpdateTime );
  const elValLi = document.getElementById( `${e.target.id}-value` );
  elValLi.innerHTML = roundTo( eval( e.target.value ), 100 );
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

function roundTo(num, digit) {
  return Math.round(num * digit) / digit;
}

function createInputs( inputsAttrs ) {
  inputsAttrs.forEach( ( attrs ) => {

    const label = createElWithAttributes( 'label', form, { 'class': 'form-label', 'id': `${attrs.id}-label` } );
    label.innerHTML = labels[attrs.id];

    const rangeValsList = createElWithAttributes( 'ul', form, { 'class': 'range-ul' } );

    const min = createElWithAttributes( 'li', rangeValsList, { 'class': 'range-min range-li', 'id': `${attrs.id}-min` } );
    min.innerHTML = roundTo(attrs.min, 100);

    const value = createElWithAttributes( 'ul', rangeValsList, { 'class': 'range-value range-li', 'id': `${attrs.id}-value` } );
    value.innerHTML = roundTo(attrs.value, 100);

    const max = createElWithAttributes( 'ul', rangeValsList, { 'class': 'range-max range-li', 'id': `${attrs.id}-max` } );
    max.innerHTML = roundTo(attrs.max, 100);

    createElWithAttributes( 'input', label, attrs );
  });
}

createElWithAttributes( 'form', document.body, { 'id': 'form', 'class': 'scrollable', 'style': 'z-index: 101;' } );
const form = document.getElementById( 'form' );

createInputs([
  speedRange,
  rotationSpeedRange,
  orbitUpdateTimeRange,
  exponentRange,
  aMinRange,
  aMaxRange,
  bMinRange,
  bMaxRange,
  cMinRange,
  cMaxRange,
  dMinRange,
  dMaxRange,
  eMinRange,
  eMaxRange
]);

const button = createElWithAttributes( 'button', document.body, {
   'id': 'boom',
   'style': `
     top: ${random(3, 97)}vh;
     left: ${random(3, 97)}vw;
    `
 });
button.innerHTML = 'boom';
button.onclick = () => { if ( !cosmicInception ) easterEggBang() };
