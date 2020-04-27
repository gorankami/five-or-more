import getXY from "../getXY";
import { state } from "../state";
import { easeOutQuad, easeOutQuint, easeOutSine, easeInElastic, easeInExpo } from "js-easing-functions";

export class Points {
    constructor(i, j, txt, sketch) {
        const { x, y } = getXY(i, j)
        this.size = 20;
        this.defaultSize = 20
        this.maxSize = state.cellSize * 0.75;
        this.alpha = 1
        this.txt = txt;
        this.position = sketch.createVector(x, y);
        this.initialPosition = sketch.createVector(x, y);
        this.timer = 1;
        this.sizeMod = 1;
        this.defaultSizeMod = sketch.random(1, 1.2);
        this.velocity = sketch.createVector(sketch.random(-10, 10), sketch.random(-10, 10));
        this.animationDuration = 500;
        this.defaultRotSpeed = sketch.random(-0.4, 0.4);
        this.rotation = sketch.random() * Math.PI * 2;
    }

    update() {
        if (!this.startTime) this.startTime = Date.now();
        const elapsed = Date.now() - this.startTime;
        if (elapsed > this.animationDuration) this.canBeDestroyed = true;
        this.position.y = easeInExpo(elapsed, this.initialPosition.y, this.initialPosition.y-this.size, this.animationDuration);
        this.alpha = easeOutSine(elapsed, 0, 1, this.animationDuration);
        this.size = easeOutQuint(elapsed, 15, 20, this.animationDuration);
    }

    draw(sketch) {
        sketch.push()
        sketch.textSize(this.size)
        sketch.fill(`rgba(255,255,255,${1-this.alpha})`)
        sketch.textAlign(sketch.CENTER, sketch.BOTTOM);
        sketch.text(this.txt, this.position.x + state.cellSize / 2, this.position.y + state.cellSize / 2);
        sketch.pop()
    }
}