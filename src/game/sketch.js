import config from "../game.config.json"
import { CELL_CLASS } from "./CELL_CLASS.js";
import { MARBLE_CLASS } from "./MARBLE_CLASS.js";
import { getThreeRandomMarbleClasses, getAnyClearMarble } from "./script";
import { state } from "./state.js";

let selected = undefined;

export const getSketch = sketch => {
    const table = [];
    const { left, right, top, bottom } = config.tableMargin
    sketch.setup = () => {
        sketch.createCanvas(600, 600);
        state.tableWidth = sketch.width - left - right
        state.tableHeight = sketch.height - top - bottom

        if (state.tableWidth > state.tableHeight) {
            state.cellSize = state.tableHeight / config.rows;
        } else {
            state.cellSize = state.tableWidth / config.columns;
        }
        for (let i = 0; i < config.rows; i++) {
            let tableRow = [];
            for (let j = 0; j < config.columns; j++) {
                const element = new TableCell(i, j, CELL_CLASS.CLEAR, MARBLE_CLASS.CLEAR)
                // if (i === 5 && j === 5) element.marbleType = MARBLE_CLASS.LIGHT_BLUE;
                tableRow.push(element);
            }
            table.push(tableRow);
        }
        state.nextThree = getThreeRandomMarbleClasses();
        next(table);
    };

    function next(table){
        state.nextThree.forEach(marbleClass=>{
            const tableCell = getAnyClearMarble(table);
            if(tableCell) tableCell.marbleType = marbleClass;
        });

        state.nextThree = getThreeRandomMarbleClasses();
    }

    sketch.draw = () => {
        sketch.background(200);
        table.forEach(r => r.forEach(c => c.draw(sketch)))


        const circleY = state.tableHeight + config.tableMargin.top + 20
        const circleW = state.cellSize / 2;
        state.nextThree.forEach((marbleClass, i) => {
            sketch.push()
            sketch.fill(getFillForMarbleType(marbleClass))
            sketch.circle(20 + i * (circleW + 20), circleY, circleW)
            sketch.pop()
        });
    };



    sketch.touchStarted = () => {
        const { mouseX, mouseY } = sketch;
        let found = false;
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table.length; j++) {
                const e = table[i][j];
                if (e.x <= mouseX && mouseX < e.x + state.cellSize && e.y <= mouseY && mouseY < e.y + state.cellSize) {
                    found = true;
                    if (e === selected) {
                        selected = undefined;
                    } else {
                        if (e.marbleType === MARBLE_CLASS.CLEAR && selected) {
                            //move selected marble
                            e.marbleType = selected.marbleType;
                            selected.marbleType = MARBLE_CLASS.CLEAR;
                            selected = undefined;
                            // if(winning combo){
                            //     eliminate
                            // } else 
                            next(table);

                        } else if (e.marbleType !== MARBLE_CLASS.CLEAR) {
                            selected = e;
                        }
                    }
                    break;
                }
            }
            if (found) break;
        }
        table.forEach(r => r.forEach(c => c.draw(sketch)))
    }

};


class TableCell {
    constructor(i, j, cellType, marbleType) {
        this.i = i;
        this.j = j;
        this.cellType = cellType;
        this.marbleType = marbleType;
    }

    draw(sketch) {
        sketch.push();
        const { tableMargin } = config;
        const { cellSize } = state;
        this.x = this.i * cellSize + tableMargin.left;
        this.y = this.j * cellSize + tableMargin.top;
        sketch.stroke(204, 102, 0);
        if (this === selected) {
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

