
import getXY from "../getXY";
import { state } from "../state";
/* global p5 */

export class MovingMarble {
    constructor(i, j, img, e) {
        this.e = e;
        this.i = i;
        this.j = j;
        this.img = img;
        const { x, y } = getXY(i, j)
        this.position = new p5.Vector(x, y)
        this.startPosition = this.position;
        this.isForDeletion = false;
    }

    startAnimation(path) {
        this.path = path;
        const { i, j } = path.splice(0, 1)[0];
        this.animateStep(i, j)
    }

    animateStep(i, j) {
        const { x, y } = getXY(i, j)
        this.targetPosition = new p5.Vector(x, y)
        this.elapsed = 0;
        this.time = 0.05;
    }

    update(sketch) {
        if (this.isForDeletion) return;
        if (this.elapsed < this.time) {
            this.position = p5.Vector.lerp(this.startPosition, this.targetPosition, this.elapsed/this.time);
                
            this.elapsed += 1 / sketch.frameRate();
        } else {
            this.position = this.targetPosition;
            this.startPosition = this.position;
            if (this.path.length) {
                const { i, j } = this.path.splice(0, 1)[0];
                this.animateStep(i, j)
            } else {
                this.isForDeletion = true;
            }
        }
    }

    draw(sketch) {
        if (this.isForDeletion) return;
        const { cellSize } = state;
        sketch.image(this.img, this.position.x, this.position.y, cellSize, cellSize)
    }
}