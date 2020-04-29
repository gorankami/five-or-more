import { state } from "../state";
import { next } from "../next";
import config from "../../game.config.json"

import { getThreeRandomSprites } from "../getThreeRandomSprites";
import { TableCell } from "../entities/TableCell";

export function setup() {
    const { sketch } = state;
    sketch.createCanvas(window.innerWidth, window.innerHeight);
    updateTableSize();
    setupTable();
    state.nextThree = getThreeRandomSprites();
    next(state.table);
};

function setupTable() {
    for (let i = 0; i < config.rows; i++) {
        let tableRow = [];
        for (let j = 0; j < config.columns; j++) {
            const element = new TableCell(i, j);
            tableRow.push(element);
        }
        state.table.push(tableRow);
    }
}

export function updateTableSize(){
    const { left, right, top, bottom } = config.tableMargin
    state.tableWidth = window.innerWidth - left - right
    state.tableHeight = window.innerHeight - top - bottom
    if (state.tableWidth > state.tableHeight) {
        state.cellSize = state.tableHeight / config.rows;
    } else {
        state.cellSize = state.tableWidth / config.columns;
    }
}

