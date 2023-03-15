/* eslint-env browser */

import Screen from "./Screen.js";

//This class represents the Main Screen, where the Game is happening
class MainScreen extends Screen{

    constructor(el){
        super();
        this.setElement(el);
    }
}

export default MainScreen;