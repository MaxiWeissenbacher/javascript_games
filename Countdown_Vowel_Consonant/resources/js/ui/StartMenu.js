/* eslint-env browser */

import Screen from "./Screen.js";

// Informs if Start Game-Button was clicked and hide it
function onStartButtonClicked(){
    this.hide();
    this.notifyAll(new StartGameEvent);
}

class StartGameEvent extends Event{
    constructor(){
        super("StartGame");
    }
}

// Manage the Start Screen
class StartMenu extends Screen{

    constructor(el){
        super();
        this.setElement(el);
        document.querySelector(".start-game").addEventListener("click", onStartButtonClicked.bind(this));
    }
}

export default StartMenu;