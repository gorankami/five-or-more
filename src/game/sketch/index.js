import { preload } from "./preload"
import { setup } from "./setup";
import { draw } from "./draw";
import { touchStarted } from "./touchStarted";
import { state } from "../state";
import { windowResized } from "./windowResized";


export const getSketch = sketch => {
    state.sketch = sketch;

    sketch.preload = preload;
    sketch.setup = setup;
    sketch.draw = draw
    sketch.mousePressed = touchStarted
    sketch.windowResized = windowResized
};
