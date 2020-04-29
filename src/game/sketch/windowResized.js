import { state } from "../state";
import { updateTableSize } from "./setup";
// import config from "../../game.config.json"

export function windowResized() {
    // const { left, right, top, bottom } = config;
    state.sketch.resizeCanvas(window.innerWidth, window.innerHeight);
    // state.tableWidth = window.innerWidth - left - right
    // state.tableHeight = window.innerHeight - top - bottom
    // if (state.tableWidth > state.tableHeight) {
    //     state.cellSize = state.tableHeight / config.rows;
    // } else {
    //     state.cellSize = state.tableWidth / config.columns;
    // }
    updateTableSize()
}
