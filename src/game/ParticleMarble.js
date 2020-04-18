import getXY from "./getXY";
import { state } from "./state";

export class ParticleMarble {
    constructor(i, j, img, sketch) {
        const { x, y } = getXY(i, j)
        this.img = img;
        this.position = sketch.createVector(x + state.cellSize/2, y + state.cellSize/2);
        this.timer = 1;
        this.size = state.cellSize;
        this.velocity = sketch.createVector(sketch.random(-10, 10), sketch.random(-10, 10));
    }

    update(sketch) {
        
        if (sketch.frameRate()) {
            this.timer -= 1 / sketch.frameRate()
            if(this.size > 1) this.size -= this.timer*4
        }
        this.position.add(this.velocity)
    }

    draw(sketch) {
        const sizeH = this.size / 2
        sketch.push()
        sketch.translate(this.position.x, this.position.y)
        sketch.image(this.img, -sizeH, -sizeH, this.size, this.size);
        sketch.pop()
    }
}