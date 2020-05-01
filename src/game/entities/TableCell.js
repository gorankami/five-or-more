import getXY from "../getXY";
import { state } from "../state";
import { easeInOutBack } from "js-easing-functions";
/* global p5 */

export class TableCell {
    constructor(i, j, img) {
        this.i = i;
        this.j = j;
        this.img = img;
        const { x, y } = getXY(i, j)
        this.position = new p5.Vector(x, y)
        this.startTime = (new Date()).getTime()
        this.duration = 200
        this.sizeMod = state.cellSize
    }
    update() {
        const currentTime = (new Date()).getTime() - this.startTime;
        if (currentTime > this.duration) {
            this.sizeMod = 1
        } else {
            this.sizeMod = easeInOutBack(currentTime, 0.5, 0.5, this.duration)
        }
    }
    draw() {
        const { cellSize, sketch } = state;
        const { x, y } = getXY(this.i, this.j)
        this.position = new p5.Vector(x, y)
        sketch.push();
        sketch.stroke('rgba(204, 102, 0,0.2)');
        if (this === state.selected) {
            sketch.fill('rgba(204, 153, 0, 0.6)');
        } else {
            sketch.fill('rgba(255, 255, 255, 0.4)');
        }
        sketch.rect(this.position.x, this.position.y, cellSize, cellSize);

        if (this.img) {
            const size = this.sizeMod * cellSize
            sketch.image(this.img, this.position.x - size/2 + cellSize/2, this.position.y - size/2 + cellSize/2, size, size);
        }
        sketch.pop();
    }
}