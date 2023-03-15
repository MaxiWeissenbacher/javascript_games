/* eslint-env browser */

import DEFAULTS from "./Defaults.js";
import { Event, Observable } from "../utils/Observable.js";
import Color from "./Color.js";
import Gamestate from "./Gamestate.js";

var gamestate;

function shuffleArray(array) {
    var i, j, swap;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }
    return array;
}

function getSquares(number, deviation) {
    let squares = [],
        randomIDSeed = Math.floor(Math.random() * 10000),
        randomColor = Color.getRandomColor();
    for (let i = 0; i < number; i++) {
        squares.push({
            id: randomIDSeed + i,
            color: randomColor.copy(),
        });
    }
    squares[0].color.setDeviation(deviation);
    return squares;
}

function initNextRound() {
    if (gamestate === undefined) {
        gamestate = new Gamestate();
    } else {
        gamestate.level++;
        gamestate.deviation -= DEFAULTS.deviationDecrease;
        if (gamestate.deviation < DEFAULTS.minDeviation) {
            gamestate.deviation = DEFAULTS.minDeviation;
        }
        gamestate.numberOfSquares = DEFAULTS.squaresPerLevel[gamestate.level - 1];
        if (gamestate.numberOfSquares === undefined) {
            gamestate.numberOfSquares = DEFAULTS.squaresPerLevel[DEFAULTS.squaresPerLevel
                .length - 1];
        }
    }
    gamestate.squares = getSquares(gamestate.numberOfSquares, gamestate.deviation);
    gamestate.targetID = gamestate.squares[0].id;
    gamestate.squares = shuffleArray(gamestate.squares);
}

function createGamestateEvent(type) {
    let event = new Event(type, {
        currentLevel: gamestate.level,
        currentScore: gamestate.level - 1,
        squares: [...gamestate.squares],
    });

    return event;
}

class GameManager extends Observable {

    reset() {
        let event;
        gamestate = undefined;
        initNextRound();
        event = createGamestateEvent("gamestarted");
        this.notifyAll(event);
    }

    checkClickedID(clickedID) {
        let id = parseInt(clickedID);
        if (id === gamestate.targetID) {
            let event;
            initNextRound();
            event = createGamestateEvent("levelcleared");
            this.notifyAll(event);
        } else {
            let event = new Event("gamelost", {
                score: gamestate.level - 1,
            });
            this.notifyAll(event);
        }
    }

}

export default new GameManager();