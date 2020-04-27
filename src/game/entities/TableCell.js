import getXY from "../getXY";

import { state } from "../state";

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
        sketch.stroke('rgba(204, 102, 0,0.2)');
        if (this === state.selected) {
            sketch.fill('rgba(204, 153, 0, 0.6)');
        } else {
            sketch.fill('rgba(255, 255, 255, 0.4)');
        }
        sketch.rect(this.x, this.y, cellSize, cellSize);

        if (this.img) {
            sketch.image(this.img, this.x, this.y, cellSize, cellSize);
        }
        sketch.pop();
    }
}