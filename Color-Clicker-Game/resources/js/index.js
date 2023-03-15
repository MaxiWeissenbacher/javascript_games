/* eslint-env browser */
/* global Target */

const NUMBER_OF_TARGETS = 16,
    DEFAULT_DEVIATION = 50,
    MIN_DEVIATION = 10;

var boardEl,
    scoreEl,
    currentDeviation,
    currentScore;


function onBoardClicked(event) {
    let targetWasClicked = (event.target.getAttribute("data-is-target") === "true");
    if (targetWasClicked) {
        startNextRound();
    } else {
        restartGame();
    }
}

function initRound() {
    console.log(currentScore);
    let targets = Target.createRandomTargetList(NUMBER_OF_TARGETS, currentDeviation);
    clearBoard();
    addTargetsToBoard(targets);
    scoreEl.innerHTML = currentScore;
}

function clearBoard() {
    var targets = boardEl.querySelectorAll(".target");
    for (let i = targets.length - 1; i >= 0; i--) {
        boardEl.removeChild(targets[i]);
    }
}

function addTargetsToBoard(targets) {
    for (let i = 0; i < targets.length; i++) {
        boardEl.append(targets[i].createNode());
    }
}

function startNextRound() {
    currentScore++;
    currentDeviation--;
    if (currentDeviation < MIN_DEVIATION) {
        currentDeviation = MIN_DEVIATION;
    }
    initRound();
}

function restartGame() {
    currentDeviation = DEFAULT_DEVIATION;
    currentScore = 0;
    initRound();
}

function init() {
    boardEl = document.querySelector(".board");
    scoreEl = document.querySelector(".score");
    boardEl.addEventListener("click", onBoardClicked);
    restartGame();
}

init();