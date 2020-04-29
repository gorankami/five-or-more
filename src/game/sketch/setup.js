import { state } from "../state";
import { next } from "../next";
import config from "../../game.config.json"

import { getThreeRandomSprites } from "../getThreeRandomSprites";
import { TableCell } from "../entities/TableCell";
import { Score } from "../entities/Score";

export function setup() {
    const { sketch } = state;
    sketch.createCanvas(window.innerWidth, window.innerHeight);
    updateTableSize();
    setupTable();
    state.nextThree = getThreeRandomSprites();
    next(state.table);
    state.score = new Score()
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
    const tableWidth = window.innerWidth - left - right
    const tableHeight = window.innerHeight - top - bottom
    if (tableWidth > tableHeight) {
        state.cellSize = tableHeight / config.rows;
    } else {
        state.cellSize = tableWidth / config.columns;
    }
}

