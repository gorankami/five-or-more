import config from "../game.config.json"

import gemRed from "../images/Gems_01_64x64_015.png"
import gemOrange from "../images/Gems_01_64x64_016.png"
import gemYellow from "../images/Gems_01_64x64_017.png"
import gemGreen from "../images/Gems_01_64x64_018.png"
import gemBlue from "../images/Gems_01_64x64_019.png"
import gemPurple from "../images/Gems_01_64x64_020.png"
import gemWhite from "../images/Gems_01_64x64_021.png"

import { MARBLE_CLASS } from "./MARBLE_CLASS";
import { getThreeRandomMarbleClasses, getAnyClearMarble, clearFiveOrMore, findPath, Point } from "./script";
import { state } from "./state";



let selected = undefined;
let images;

export const getSketch = sketch => {
    const table = [];
    const { left, right, top, bottom } = config.tableMargin

    sketch.preload = () => {
        images = {
            gemRed: sketch.loadImage(gemRed),
            gemOrange: sketch.loadImage(gemOrange),
            gemYellow: sketch.loadImage(gemYellow),
            gemGreen: sketch.loadImage(gemGreen),
            gemBlue: sketch.loadImage(gemBlue),
            gemPurple: sketch.loadImage(gemPurple),
            gemWhite: sketch.loadImage(gemWhite)
        }
    }
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
                const element = new TableCell(i, j, MARBLE_CLASS.CLEAR)
                tableRow.push(element);
            }
            table.push(tableRow);
        }
        state.nextThree = getThreeRandomMarbleClasses();
        next(table);
    };

    function next(table) {
        state.nextThree.forEach(marbleClass => {
            const tableCell = getAnyClearMarble(table);
            if (tableCell) tableCell.marbleType = marbleClass;
        });

        state.nextThree = getThreeRandomMarbleClasses();
    }

    sketch.draw = () => {
        sketch.background(200);
        table.forEach(r => r.forEach(c => c.draw(sketch)))


        const circleY = state.tableHeight + config.tableMargin.top + 20
        const circleW = state.cellSize / 2;
        state.nextThree.forEach((marbleClass, i) => {
            
            sketch.image(getFillForMarbleType(marbleClass), 20 + i * (circleW + 20), circleY, circleW, circleW);
            // sketch.fill(getFillForMarbleType(marbleClass))
            // sketch.circle(20 + i * (circleW + 20), circleY, circleW)
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
                            let startPoint = new Point(Number(selected.i), Number(selected.j));
                            let endPoint = new Point(Number(e.i), Number(e.j));

                            let path = findPath(table, startPoint, endPoint);
                            if (!!path) {
                                e.marbleType = selected.marbleType;
                                selected.marbleType = MARBLE_CLASS.CLEAR;
                                selected = undefined;
                                if (!clearFiveOrMore(table)) {
                                    next(table);
                                    clearFiveOrMore(table);
                                }
                            }
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
    constructor(i, j, marbleType) {
        this.i = i;
        this.j = j;
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
            
            sketch.image(getFillForMarbleType(this.marbleType), this.x, this.y, cellSize, cellSize);
            // sketch.fill(getFillForMarbleType(this.marbleType));
            // sketch.circle(this.x + cellSize / 2, this.y + cellSize / 2, cellSize);
        }
        sketch.pop();
    }
}

function getFillForMarbleType(type) {
    switch (type) {
        case MARBLE_CLASS.GREEN:
            return images.gemGreen;
        case MARBLE_CLASS.LIGHT_BLUE:
            return images.gemWhite;
        case MARBLE_CLASS.RED:
            return images.gemRed;
        case MARBLE_CLASS.ORANGE:
            return images.gemOrange;
        case MARBLE_CLASS.BLUE:
            return images.gemBlue;
        case MARBLE_CLASS.YELLOW:
            return images.gemYellow;
        case MARBLE_CLASS.PURPLE:
            return images.gemPurple;
        default:
            return ""
    }
}

