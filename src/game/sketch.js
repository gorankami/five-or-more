import config from "../game.config.json"

import gemRed from "../images/Gems_01_64x64_015.png"
import gemOrange from "../images/Gems_01_64x64_016.png"
import gemYellow from "../images/Gems_01_64x64_017.png"
import gemGreen from "../images/Gems_01_64x64_018.png"
import gemBlue from "../images/Gems_01_64x64_019.png"
import gemPurple from "../images/Gems_01_64x64_020.png"
import gemWhite from "../images/Gems_01_64x64_021.png"

import { clearFiveOrMore, findPath, Point } from "./tableOperations";
import { state } from "./state";
import { TableCell } from "./TableCell.js"

state.selected = undefined;
state.images = undefined;

export const getSketch = sketch => {
    const table = [];
    const { left, right, top, bottom } = config.tableMargin

    sketch.preload = () => {
        state.images = [
            sketch.loadImage(gemRed),
            sketch.loadImage(gemOrange),
            sketch.loadImage(gemYellow),
            sketch.loadImage(gemGreen),
            sketch.loadImage(gemBlue),
            sketch.loadImage(gemPurple),
            sketch.loadImage(gemWhite)
        ]
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
                const element = new TableCell(i, j);
                tableRow.push(element);
            }
            table.push(tableRow);
        }
        state.nextThree = getThreeRandomSprites();
        next(table);
    };


    sketch.draw = () => {
        sketch.background(200);
        table.forEach(r => r.forEach(c => c.draw(sketch)))

        const circleY = state.tableHeight + config.tableMargin.top + 20
        const circleW = state.cellSize / 2;
        state.nextThree.forEach((img, i) => {
            sketch.image(img, 20 + i * (circleW + 20), circleY, circleW, circleW);
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
                    if (e === state.selected) {
                        state.selected = undefined;
                    } else {
                        if (e.img === undefined && state.selected) {
                            //move selected marble
                            let startPoint = new Point(Number(state.selected.i), Number(state.selected.j));
                            let endPoint = new Point(Number(e.i), Number(e.j));

                            let path = findPath(table, startPoint, endPoint);
                            if (!!path) {
                                e.img = state.selected.img;
                                state.selected.img = undefined
                                state.selected = undefined;
                                if (!clearFiveOrMore(table)) {
                                    next(table);
                                    clearFiveOrMore(table);
                                }
                            }
                        } else if (e.img) {
                            state.selected = e;
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

function next(table) {
    state.nextThree.forEach(img => {
        const tableCell = getAnyClearMarble(table);
        if (tableCell) tableCell.img = img;
    });

    state.nextThree = getThreeRandomSprites();
}


function getThreeRandomSprites() {
    return [state.images[random(6)], state.images[random(6)], state.images[random(6)]];
}

/**
 * Random number from 0 to max
 * @param max {Integer}
 * @returns {Integer}
 */
function random(max) {
    return Math.floor(Math.random() * max);
}

function getAnyClearMarble(table) {
    let arrayOfCells = [];
    table.forEach(function (row) {
        arrayOfCells = arrayOfCells.concat(row);
    });
    let clearCells = arrayOfCells
        .filter(marble => !marble.img)
    if (clearCells.length) {
        return clearCells[random(clearCells.length - 1)];
    } else {
        return null;
    }
}