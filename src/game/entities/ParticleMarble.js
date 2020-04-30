import { state } from "../state";
import { easeOutQuad, easeOutQuint } from "js-easing-functions";

export class ParticleMarble {
    constructor(x, y, img, sketch) {
        this.size = state.cellSize;
        this.img = img;
        this.position = sketch.createVector(x + this.size / 2, y + this.size / 2);
        this.initialPosition = sketch.createVector(x, y);
        this.timer = 1;
        this.sizeMod = 1;
        this.defaultSizeMod = sketch.random(1, 1.2);
        this.velocity = sketch.createVector(sketch.random(-10, 10), sketch.random(-10, 10));
        this.animationDuration = 500;
        this.defaultRotSpeed = sketch.random(-0.4, 0.4);
        this.rotation = sketch.random() * Math.PI * 2;
    }

    update(sketch) {
        if (!this.startTime) this.startTime = Date.now();
        const elapsed = Date.now() - this.startTime;
        if (elapsed > this.animationDuration) this.canBeDestroyed = true;
        const velocityX = easeOutQuad(elapsed, this.velocity.x, -this.velocity.x, this.animationDuration)
        const velocityY = easeOutQuad(elapsed, this.velocity.y, -this.velocity.y, this.animationDuration)

        this.sizeMod = easeOutQuint(elapsed, this.defaultSizeMod, -this.defaultSizeMod * 0.99, this.animationDuration)
        this.position.add(sketch.createVector(velocityX, velocityY));
        this.rotSpeed = easeOutQuint(elapsed, this.defaultRotSpeed, -this.defaultRotSpeed, this.animationDuration);
        this.rotation += this.rotSpeed;
    }

    draw(sketch) {
        const size = this.size * this.sizeMod;
        sketch.push()
        sketch.translate(this.position.x, this.position.y)
        sketch.rotate(this.rotation);
        sketch.image(this.img, -size / 2, -size / 2, size, size);
        sketch.pop()
    }
}