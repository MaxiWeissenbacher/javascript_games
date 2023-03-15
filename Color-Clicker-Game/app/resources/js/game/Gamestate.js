/* eslint-env browser */

import DEFAULTS from "./Defaults.js";

class Gamestate {
    constructor() {
        this.level = DEFAULTS.startLevel;
        this.deviation = DEFAULTS.startDeviation;
        this.numberOfSquares = DEFAULTS.squaresPerLevel[0];
        this.squares = undefined;
        this.targetID = undefined;
    }
}

export default Gamestate;