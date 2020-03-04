import config from "../game.config.json"
import { CELL_CLASS } from "./CELL_CLASS.js";
import { MARBLE_CLASS } from "./MARBLE_CLASS.js";

let cellSize;
const tableMargin = {
    top: 10,
    bottom: 100,
    left: 10,
    right: 10
}
export const getSketch = sketch => {
    const table = [];

    sketch.setup = () => {
        sketch.createCanvas(600, 600);
        let tableWidth = sketch.width - tableMargin.left - tableMargin.right
        let tableHeight = sketch.height - tableMargin.top - tableMargin.bottom

        if (tableWidth > tableHeight) {
            cellSize = tableHeight / config.rows;
        } else {
            cellSize = tableWidth / config.columns;
        }
        for (let i = 0; i < config.rows; i++) {
            let tableRow = [];
            for (let j = 0; j < config.columns; j++) {
                const element = new Element(i, j, CELL_CLASS.CLEAR, MARBLE_CLASS.CLEAR)

                //marble.onclick = click(table);
                tableRow.push(element);
            }
            table.push(tableRow);
        }
    };

    sketch.draw = () => {
        sketch.background(200);
        table.forEach(r => r.forEach(c => c.draw(sketch)))
    };

};


class Element {
    constructor(i, j, cellType, marbleType) {
        this.i = i;
        this.j = j;
        this.cellType = cellType;
        this.marbleType = marbleType;
    }

    draw(sketch) {
        sketch.push();
        const x = this.i * cellSize + tableMargin.left;
        const y = this.j * cellSize + tableMargin.top;
        sketch.stroke(204, 102, 0);
        if (this.cellType === CELL_CLASS.SELECTED) {
            sketch.fill(204, 153, 0);
        }
        sketch.rect(x, y, cellSize, cellSize);
        sketch.pop();
    }
}



