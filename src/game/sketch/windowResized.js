import { state } from "../state";
import { updateTableSize } from "./setup";
// import config from "../../game.config.json"

export function windowResized() {
    state.sketch.resizeCanvas(window.innerWidth, window.innerHeight);
    updateTableSize()
}
