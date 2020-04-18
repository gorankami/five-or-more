import config from "../game.config.json"
import { state } from "./state";

export default function getXY(i, j) {
    const { tableMargin } = config;
    const { cellSize } = state;
    return {
        x: i * cellSize + tableMargin.left,
        y: j * cellSize + tableMargin.top
    }
}