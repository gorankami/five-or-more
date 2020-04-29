import { state } from "../state";
import config from "../../game.config.json"
import { easeOutBack } from "js-easing-functions";

export class Score {
    constructor() {
        this.value = 0;
        this.defaultSize = 30;
        this.scoreSizeMin = 30;
        this.startTime = (new Date()).getTime();
        this.timeDuration = 100;
    }
    draw() {
        const { left, top } = config.tableMargin

        const { sketch } = state
        const tableSize = state.cellSize * config.columns
        let currentTime = (new Date()).getTime() - this.startTime;
        if (currentTime < this.timeDuration) {
            this.scoreSize = easeOutBack(currentTime, this.defaultSize, 20, this.timeDuration)
        } else {
            this.scoreSize = this.scoreSizeMin;
        }

        sketch.push()
        sketch.textAlign(sketch.RIGHT, sketch.TOP)
        sketch.textSize(this.scoreSize)
        sketch.fill("white")
        sketch.text(this.value, tableSize + left, tableSize + top)
        console.log()
        sketch.pop()
    }

    startAnimation(){
        this.startTime = (new Date()).getTime()
    }
}