import getXY from "../getXY";

import { state } from "../state";
import p5 from "p5";

export class TableCell {
    constructor(i, j, img) {
        this.i = i;
        this.j = j;
        this.img = img;
        const { x, y } = getXY(i, j)
        this.position = new p5.Vector(x, y)
    }

    draw(sketch) {
        const { cellSize } = state;
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
            sketch.image(this.img, this.position.x, this.position.y, cellSize, cellSize);
        }
        sketch.pop();
    }
}