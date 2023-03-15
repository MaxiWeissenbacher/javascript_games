/* eslint-env browser */

import Letters from "./Letters.js";
import Config from "../utils/Config.js";
import WiktionaryClient from "../wiktionary/Wiktionary.js";
import InputView from "../ui/InputView.js";
import StartMenu from "../ui/StartMenu.js";

var clock = document.querySelector(".hand"),
    userInputArray,
    userInputString,
    userInput = document.querySelector(".word-input"),
    inputView,
    resultView = document.getElementById("results"),
    wiktionary = new WiktionaryClient();

function startTime(){
    inputView = new InputView(userInput);
    inputView.enableInput();
    clock.classList.add("hand-animated"); 
    setTimeout(() => {
        clock.classList.remove("hand-animated");
        //hier evtl noch das wort als String abspeichern damit man es leichter mit dem wiktionary vergleichen kann
        userInputArray = Array.from(userInput.value);
        userInputString = String(userInput.value);
        console.log(userInputArray);
        console.log(userInputString);
        testWord();
        showStartMenu();
    }, 5000);
}

//Check if the user input is an english word from the wiktionary
function testWord(){
    let word = document.querySelector(".word-input").value;
    wiktionary.assertWordExist(word).then(function() {
        if(compareArrays() == true){
            resultView.classList.remove("hidden");
            document.querySelector(".points").innerHTML = getScore(word);
            document.querySelector(".hint").innerHTML = "It is an english word!";
        }
    }).catch(function() {
            resultView.classList.remove("hidden");
            document.querySelector(".points").innerHTML = 0;
            document.querySelector(".hint").innerHTML = "Try it again! The word: " + word + " is not correct";
    })
}

function compareArrays(){
    let el = Letters.getUsedLetters();
    el.sort();
    userInputArray.sort();
    return userInputArray.every(i => el.includes(i));
}

//Calculates the score
function getScore(word){
    if(word.length === Config.MAX_NUMBER_OF_LETTERS){
        return Config.MAX_POINTS;
    }
    return word.length;
}

// shows start Menu 3 seconds after the game has ended and clears letters, disables input and clears input
function showStartMenu(){
    let menuScreenEl = document.getElementById("menu-screen"),
        menuScreen = new StartMenu(menuScreenEl);
    inputView.disableInput();
    setTimeout(() => {
        for(let i = 0; i < Config.MAX_NUMBER_OF_LETTERS ;i++){
            document.getElementById("letters").getElementsByTagName("span")[i].innerHTML="";
            document.getElementById("letters").getElementsByTagName("span")[i].className = "letter empty";
        }
        resultView.innerHTML="";
        menuScreen.show();
        resultView.className = "results hidden";
        document.querySelector(".word-input").value = "";
        clock.className = "hand";
        // reload everything to get sure that the next game can start without problems
        location.reload();
   }, Config.TIME_TO_RESTART);
}

class GameManager{

    static check(){
        let el = Letters.getUsedLetters();
        if(el.length === Config.MAX_NUMBER_OF_LETTERS){
            startTime();
        }
    }

    static getUserInput(){
        return userInputArray,userInputString;
    }

}

export default GameManager;