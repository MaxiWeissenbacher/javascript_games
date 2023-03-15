/*eslint-env browser */

import GameManager from "./game/GameManager.js";
import GameView from "./ui/GameView.js";
import ScoreView from "./ui/ScoreView.js";

function init() {
    ScoreView.setElement(document.querySelector("#score"));
    GameView.setElement(document.querySelector("#squares"));
    GameView.addEventListener("squareclicked", onSquareClicked);
    GameManager.addEventListener("gamestarted", onGameStarted);
    GameManager.addEventListener("levelcleared", onLevelCleared);
    GameManager.addEventListener("gamelost", onGameLost);
    GameManager.reset();
}

function renderState(level, score, squares) {
    ScoreView.renderScore(score);
    GameView.renderSquares(squares);
}

function onSquareClicked(event) {
    GameManager.checkClickedID(event.data.id);
}

function onGameStarted(event) {
    renderState(event.data.currentLevel, event.data.currentScore, event.data.squares);
}

function onLevelCleared(event) {
    renderState(event.data.currentLevel, event.data.currentScore, event.data.squares);
}

function onGameLost() {
    GameManager.reset();
}

init();