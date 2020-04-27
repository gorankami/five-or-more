import { state } from "../state"

import gemRed from "../../images/Gems_01_64x64_015.png"
import gemOrange from "../../images/Gems_01_64x64_016.png"
import gemYellow from "../../images/Gems_01_64x64_017.png"
import gemGreen from "../../images/Gems_01_64x64_018.png"
import gemBlue from "../../images/Gems_01_64x64_019.png"
import gemPurple from "../../images/Gems_01_64x64_020.png"
import gemWhite from "../../images/Gems_01_64x64_021.png"
import bg from "../../images/bg.png";

export function preload() {
    const { sketch } = state;

    state.images = [
        sketch.loadImage(gemRed),
        sketch.loadImage(gemOrange),
        sketch.loadImage(gemYellow),
        sketch.loadImage(gemGreen),
        sketch.loadImage(gemBlue),
        sketch.loadImage(gemPurple),
        sketch.loadImage(gemWhite)
    ]
    state.bg = sketch.loadImage(bg)
}
