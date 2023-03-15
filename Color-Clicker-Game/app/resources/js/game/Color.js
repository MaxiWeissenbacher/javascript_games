/* eslint-env browser */

function getRandomPastelChannel() {
    return Math.floor(((Math.random() * 256) + 255) / 2);
}

class Color {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    setDeviation(deviation) {
        let r, g, b;
        r = this.red - deviation;
        g = this.green - deviation;
        b = this.blue - deviation;
        this.red = (r >= 0) ? r : 0;
        this.green = (g >= 0) ? g : 0;
        this.blue = (b >= 0) ? b : 0;
    }

    copy() {
        return new Color(this.red, this.green, this.blue);
    }

    toRGB() {
        return `rgb(${this.red},${this.green},${this.blue}`;
    }

    static getRandomColor() {
        let r, g, b;
        r = getRandomPastelChannel();
        g = getRandomPastelChannel();
        b = getRandomPastelChannel();
        return new Color(r, g, b);
    }

}

export default Color;