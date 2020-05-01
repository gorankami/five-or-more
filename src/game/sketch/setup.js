import Koji from '../../config' //'@withkoji/vcc';
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
    
    sketch.textFont(state.font);

    //Load music asynchronously and play once it's loaded
    if (Koji.config.sounds.backgroundMusic) state.music = sketch.loadSound(Koji.config.sounds.backgroundMusic, onLoadSound);
};


function onLoadSound(){
    if (state.music) {
        state.music.setVolume(Koji.config.sounds.musicVolume);
        state.music.setLoop(true);
        state.music.play();
    }
}

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
        config.tableMargin.left = (window.innerWidth - tableHeight)/2
    } else {
        state.cellSize = tableWidth / config.columns;
    }
}

