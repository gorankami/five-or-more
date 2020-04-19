
import getXY from "../getXY";
import { state } from "../state";

export class MovingMarble {
    constructor(i, j, img, e) {
        this.e = e;
        this.i = i;
        this.j = j;
        this.img = img;
        const { x, y } = getXY(i, j)
        this.x = x;
        this.y = y;
        this.isForDeletion = false;
    }

    startAnimation(path) {
        this.path = path;
        const { i, j } = path.splice(0, 1)[0];
        this.animateStep(i, j)
    }

    animateStep(i, j) {
        const { x, y } = getXY(i, j)
        this.targetX = x
        this.targetY = y
        this.elapsed = 0;
        this.time = 0.02;
    }

    update(sketch) {
        if (this.isForDeletion) return;
        if (this.elapsed < this.time) {
            this.elapsed += 1 / sketch.frameRate();
        } else {
            this.x = this.targetX;
            this.y = this.targetY;
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
        sketch.image(this.img, this.x, this.y, cellSize, cellSize)
    }
}