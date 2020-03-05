import config from "../game.config.json"
import { state } from "./state";

export class TableCell {
    constructor(i, j, img) {
        this.i = i;
        this.j = j;
        this.img = img;
        this.setupXY();
    }

    setupXY() {
        const { tableMargin } = config;
        const { cellSize } = state;
        this.x = this.i * cellSize + tableMargin.left;
        this.y = this.j * cellSize + tableMargin.top;
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