import getXY from "./getXY";

import { state } from "./state";

export class TableCell {
    constructor(i, j, img) {
        this.i = i;
        this.j = j;
        this.img = img;
        const { x, y } = getXY(i, j)
        this.x = x;
        this.y = y;
    }

    draw(sketch) {
        const { cellSize } = state;
        sketch.push();
        sketch.stroke(204, 102, 0);
        if (this === state.selected) {
            sketch.fill(204, 153, 0);
        }
        sketch.rect(this.x, this.y, cellSize, cellSize);

        if (this.img) {
            sketch.image(this.img, this.x, this.y, cellSize, cellSize);
        }
        sketch.pop();
    }
}