const speedRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'speed',
  'min': speed - 1000,
  'max': speed + 1000,
  'value': speed,
};

const rotationSpeedRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'rotationSpeed',
  'step': 0.0005,
  'min': -0.025,
  'max': 0.025,
  'value': rotationSpeed,
};

const aMinRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'aMin',
  'step': 0.1,
  'min': aMin - 50,
  'max': 0,
  'value': aMin,
};

const aMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'aMax',
  'step': 0.1,
  'min': 0,
  'max': aMax + 50,
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
  'step': 0.05,
  'min': 1,
  'max': 3,
  'value': cMin,
};

const cMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'cMax',
  'step': 0.05,
  'min': 10,
  'max': 30,
  'value': cMax,
};

const dMinRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'dMin',
  'step': 0.1,
  'min': 0,
  'max': 5,
  'value': dMin,
};

const dMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'dMax',
  'step': 0.1,
  'min': 25,
  'max': 100,
  'value': dMax,
};

const eMinRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'eMin',
  'step': 0.1,
  'min': 0,
  'max': 5,
  'value': eMin,
};

const eMaxRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'eMax',
  'step': 0.1,
  'min': 25,
  'max': 100,
  'value': eMax,
};

const exponentRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'exponent',
  'step': 0.005,
  'min': 0,
  'max': 1,
  'value': exponent,
};

const orbitUpdateTimeRange = {
  'type': 'range',
  'class': 'range min-max',
  'id': 'orbitUpdateTime',
  'min': 500,
  'max': 15000,
  'value': orbitUpdateTime,
};
