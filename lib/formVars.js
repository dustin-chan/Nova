const speedRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'speed',
  'step': 0.01,
  'min': roundTo( -levelDepth * 0.99, 0.01 ),
  'max': roundTo( levelDepth * 0.99, 0.01 ),
  'value': speed,
};

const rotationSpeedRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'rotationSpeed',
  'step': 0.0005,
  'min': -0.03,
  'max': 0.03,
  'value': rotationSpeed,
};

const aMinRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'aMin',
  'step': 0.01,
  'min': -35,
  'max': -20,
  'value': aMin,
};

const aMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'aMax',
  'step': 0.01,
  'min': 20,
  'max': 35,
  'value': aMax,
};

const bMinRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'bMin',
  'step': 0.01,
  'min': 0,
  'max': 0.5,
  'value': bMin,
};

const bMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'bMax',
  'step': 0.01,
  'min': 2,
  'max': 5,
  'value': bMax,
};

const cMinRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'cMin',
  'step': 0.01,
  'min': 1,
  'max': 3,
  'value': cMin,
};

const cMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'cMax',
  'step': 0.01,
  'min': 10,
  'max': 30,
  'value': cMax,
};

const dMinRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'dMin',
  'step': 0.01,
  'min': 0,
  'max': 5,
  'value': dMin,
};

const dMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'dMax',
  'step': 0.01,
  'min': 25,
  'max': 100,
  'value': dMax,
};

const eMinRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'eMin',
  'step': 0.01,
  'min': 0,
  'max': 5,
  'value': eMin,
};

const eMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'eMax',
  'step': 0.01,
  'min': 25,
  'max': 100,
  'value': eMax,
};

const exponentRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'exponent',
  'step': 0.001,
  'min': 0,
  'max': 1,
  'value': exponent,
};

const orbitUpdateTimeRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'orbitUpdateTime',
  'step': 1,
  'min': 5000,
  'max': 300000,
  'value': Math.round(orbitUpdateTime),
};

const labels = {
  'speed': 'Speed',
  'rotationSpeed': 'Rotation Speed',
  'aMin': 'A Min Value',
  'aMax': 'A Max Value',
  'bMin': 'B Min Value',
  'bMax': 'B Max Value',
  'cMin': 'C Min Value',
  'cMax': 'C Max Value',
  'dMin': 'D Min Value',
  'dMax': 'D Max Value',
  'eMin': 'E Min Value',
  'eMax': 'E Max Value',
  'exponent': 'Equation Exponent',
  'orbitUpdateTime': 'Orbit Update Time (ms)'
};
