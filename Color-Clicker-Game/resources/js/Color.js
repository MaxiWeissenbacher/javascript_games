class Color {

    constructor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toCSS(){
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }

    getDeviatingColor(deviation){
        let r = this.r - deviation,
            g = this.g - deviation,
            b = this.b - deviation;
        return new Color(r, g, b);
    }

    static getRandomColor(){
        let r = parseInt(Math.random() * 256),
            g = parseInt(Math.random() * 256),
            b = parseInt(Math.random() * 256);
            return new Color(r,g,b);
    }
}
