import { state } from "../state"

import gemRed from "../../images/Gems_01_64x64_015.png"
import gemOrange from "../../images/Gems_01_64x64_016.png"
import gemYellow from "../../images/Gems_01_64x64_017.png"
import gemGreen from "../../images/Gems_01_64x64_018.png"
import gemBlue from "../../images/Gems_01_64x64_019.png"
import gemPurple from "../../images/Gems_01_64x64_020.png"
import gemWhite from "../../images/Gems_01_64x64_021.png"

export function preload() {
    state.images = [
        this.loadImage(gemRed),
        this.loadImage(gemOrange),
        this.loadImage(gemYellow),
        this.loadImage(gemGreen),
        this.loadImage(gemBlue),
        this.loadImage(gemPurple),
        this.loadImage(gemWhite)
    ]
}
