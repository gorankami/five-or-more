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
                if (i === 5 && j === 5) element.marbleType = MARBLE_CLASS.LIGHT_BLUE;
                tableRow.push(element);
            }
            table.push(tableRow);
        }
    };

    sketch.draw = () => {
        sketch.background(200);
        table.forEach(r => r.forEach(c => c.draw(sketch)))
    };



    let selected = undefined;

    sketch.touchStarted = () => {
        const { mouseX, mouseY } = sketch;
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table.length; j++) {
                const e = table[i][j];
                if (e.x <= mouseX && mouseX < e.x + cellSize && e.y <= mouseY && mouseY < e.y + cellSize) {
                    if (e.cellType === CELL_CLASS.SELECTED) {
                        e.cellType = CELL_CLASS.CLEAR;
                        selected = undefined;
                    } else {
                        if (e.marbleType === MARBLE_CLASS.CLEAR && selected) {
                            //move selected marble
                            e.marbleType = selected.marbleType;
                            selected.marbleType = MARBLE_CLASS.CLEAR;
                            selected = undefined;
                        } else if (e.marbleType !== MARBLE_CLASS.CLEAR) {
                            e.cellType = CELL_CLASS.SELECTED;
                            selected = e;
                        }
                    }
                } else {
                    e.cellType = CELL_CLASS.CLEAR;
                }
            }
        }
        table.forEach(r => r.forEach(c => c.draw(sketch)))
    }

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
        this.x = this.i * cellSize + tableMargin.left;
        this.y = this.j * cellSize + tableMargin.top;
        sketch.stroke(204, 102, 0);
        if (this.cellType === CELL_CLASS.SELECTED) {
            sketch.fill(204, 153, 0);
        }
        sketch.rect(this.x, this.y, cellSize, cellSize);

        if (this.marbleType !== MARBLE_CLASS.CLEAR) {
            sketch.fill(getFillForMarbleType(this.marbleType));
            sketch.circle(this.x + cellSize / 2, this.y + cellSize / 2, cellSize);
        }
        sketch.pop();
    }
}

function getFillForMarbleType(type) {
    switch (type) {
        case MARBLE_CLASS.GREEN:
            return "green";
        case MARBLE_CLASS.LIGHT_BLUE:
            return "lightblue";
        case MARBLE_CLASS.RED:
            return "red"
        case MARBLE_CLASS.ORANGE:
            return "orange"
        case MARBLE_CLASS.BLUE:
            return "blue"
        case MARBLE_CLASS.YELLOW:
            return "yellow"
        case MARBLE_CLASS.PURPLE:
            return "purple"
    }
}

