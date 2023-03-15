/* eslint-env browser */

import StartMenu from "./ui/StartMenu.js";
import Letters from "./game/Letters.js";
import GameManager from "./game/GameManager.js";
import InputView from "./ui/InputView.js";

var inputView,
	menuScreen,
	vowelButton = document.querySelector(".add-vowel"),
	consonantButton = document.querySelector(".add-consonant");

function init() {
    // Initialisation of the User Interface
	inputView = new InputView(document.querySelector(".word-input"));
	inputView.disableInput();
    initUI();
	initButtons();
}

function initUI(){
	// get the Start Game-Button
	let menuScreenEl = document.getElementById("menu-screen");
	menuScreen = new StartMenu(menuScreenEl);
}


function initButtons(){
	vowelButton.addEventListener("click",vowelEvents);
	consonantButton.addEventListener("click",consonantEvents);
}

function consonantEvents(){
	Letters.setConsonant();
	GameManager.check();
}

function vowelEvents(){
	Letters.setVowel();
	GameManager.check();
}

init();