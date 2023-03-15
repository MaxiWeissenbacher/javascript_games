/* eslint-env browser */

class InputView {

    constructor(selector) {
        this.selector = selector;
    }

    disableInput() {
        this.selector.disabled = true;
    }

    enableInput() {
        this.selector.disabled = false;
    }

}

export default InputView;