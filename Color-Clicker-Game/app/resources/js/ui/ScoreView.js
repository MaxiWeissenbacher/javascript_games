/* eslint-env browser */

class ScoreView {

    setElement(el) {
        this.el = el;
        this.currentScore = this.el.querySelector("#current-score");
        this.highscore = this.el.querySelector("#highscore");
    }

    renderScore(score) {
        this.currentScore.innerHTML = score;
        this.highscore.innerHTML = score;
    }

    reset() {
        this.currentScore.innerHTML = "0";
        this.highscore.innerHTML = "-";
    }

}

export default new ScoreView();