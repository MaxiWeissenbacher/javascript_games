/* eslint-env browser */

import { Event, Observable } from "../utils/Observable.js";

function createElementForSquare(square) {
    let el = document.createElement("span");
    el.classList.add("square");
    el.setAttribute("data-id", square.id);
    el.style.backgroundColor = square.color.toRGB();
    return el;
}

function onClick(event) {
    let target = event.target;
    if (target.classList.contains("square")) {
        let event = new Event("squareclicked", {
            id: target.getAttribute("data-id"),
        });
        this.notifyAll(event);
    }
}

function pack(el) {
    let numberOfElements, elementsPerRow;
    numberOfElements = el.children.length;
    elementsPerRow = Math.sqrt(numberOfElements);
    if (elementsPerRow < 3) {
        elementsPerRow = numberOfElements;
    }
    el.style.width = `${(elementsPerRow+1) * el.firstChild.offsetWidth}px`;
}

class GameView extends Observable {

    setElement(el) {
        this.el = el;
        this.el.addEventListener("click", onClick.bind(this));
    }

    renderSquares(squares) {
        this.clear();
        for (let i = 0; i < squares.length; i++) {
            let el = createElementForSquare(squares[i]);
            this.el.appendChild(el);
        }
        pack(this.el);
    }

    clear() {
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
    }

}

export default new GameView();