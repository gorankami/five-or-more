import { preload } from "./preload"
import { setup } from "./setup";
import { draw } from "../sketch/draw";
import { touchStarted } from "./touchStarted";

export const getSketch = sketch => {
    sketch.preload = preload.bind(sketch);
    sketch.setup = setup.bind(sketch);
    sketch.draw = draw.bind(sketch)
    sketch.mousePressed = touchStarted.bind(sketch)
};
