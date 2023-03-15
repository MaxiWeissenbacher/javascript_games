/* eslint-env browser */

import Observable from "../utils/Observable.js";

class Screen extends Observable {

    constructor(){
        super();
        this.el = undefined;
    }

    //Set screen element
    setElement(el){
      this.el = el;
    }

    //Hides screen with "hidden"
    hide() {
      if (this.el) {
        this.el.style.visibility = "hidden";
      }
  }
    
    //Show screen with "visible"
    show() {
        if (this.el) {
          this.el.style.visibility = "visible";
        }
    }
    
}

export default Screen;