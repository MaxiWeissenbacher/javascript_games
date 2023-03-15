class Target{

    constructor(color, isTarget) {
        this.color = color;
        this.isTarget = isTarget;
    }

    createNode(){
        let el = document.createElement("span");
        el.classList.add("target");
        el.style.backgroundColor = this.color.toCSS();
        el.setAttribute("data-is-target", this.isTarget);
        /**
         * <span class="targer" data-is-targer="true"></span>
         */
        return el;
    }

    static createRandomTargetList(numberOfTargets, deviation){
        let randomColor = Color.getRandomColor(),
            deviatingColor = randomColor.getDeviatingColor(deviation),
            randomIndex = parseInt(Math.random() * numberOfTargets),
            targets = [];
        for (let i = 0; i < numberOfTargets; i++){
            let target = new Target(randomColor, false);
            if(i === randomIndex){
                target = new Target(deviatingColor, true);
            }            
            targets.push(target);
        }
        return targets;
    }

}