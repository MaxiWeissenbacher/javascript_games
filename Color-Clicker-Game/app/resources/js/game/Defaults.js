/* eslint-env browser */

const DEFAULTS = {
    startLevel: 1,
    startDeviation: 40,
    deviationDecrease: 2,
    minDeviation: 10,
    squaresPerLevel: [3, 3, 3, 4, 4, 4, 9, 9, 9, 16, 16, 16, 25, 25, 25],
};

Object.freeze(DEFAULTS);

export default DEFAULTS;