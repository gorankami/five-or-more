import Koji from '../../config' //'@withkoji/vcc';
import { state, GAME_STATE_INSTRUCTIONS, GAME_STATE_TIMER } from "../state";
import config from "../../game.config.json"
import { clearFiveOrMore } from "../tableOperations";
import { next } from "../next";
import { ParticleMarble } from "../entities/ParticleMarble";
import { Points } from "../entities/Points";
import { Instructions } from "../entities/Instructions";
import getXY from "../getXY";


export function draw() {
    switch (state.gameState) {
        case GAME_STATE_INSTRUCTIONS:
            drawInstructions()
            break;
        case GAME_STATE_TIMER:
            drawTimer()
            break;
        default:
            drawGame();
    }
}

const instructions = new Instructions();

function drawInstructions() {
    if (!instructions.startTime) instructions.startTime = (new Date()).getTime()
    const instructionText = "Instructions:\nYou need to match 5 in a row.\nYou can go horizontally, vertically and diagonally\n1. Click on one that you would like to move\n2. Click on location\nNote: movement not possible if there is no path"
    const { sketch } = state;

    sketch.background(state.bg || Koji.config.colors.backgroundColor);
  
    sketch.push()
    sketch.textSize(window.innerWidth > 770 ? 35 : window.innerWidth > 440 ? 20 : 10)

    sketch.textAlign(sketch.CENTER)
    sketch.fill("white")
    sketch.text(instructionText, window.innerWidth / 2, 100)
    instructions.update();
    instructions.draw();
    sketch.pop();
}

function drawTimer() {
    const { sketch } = state;
    sketch.background(state.bg || 200);
    sketch.text("Timer", 100, 100)
}

function drawGame() {
    const { sketch } = state;
    sketch.background(state.bg || Koji.config.colors.backgroundColor);
   
    state.table.forEach(r => r.forEach(c => {
        c.update()
        c.draw()
    }))


    state.particles.forEach(p => {
        p.draw(sketch)
        p.update(sketch)
    })

    state.points.forEach(p => {
        p.draw(sketch)
        p.update(sketch)
    })

    for (let i = state.particles.length - 1; i >= 0; i--) {
        if (state.particles[i].canBeDestroyed) state.particles.splice(i, 1)
    }
    for (let i = state.points.length - 1; i >= 0; i--) {
        if (state.points[i].canBeDestroyed) state.points.splice(i, 1)
    }

    const circleY = state.cellSize * config.columns + config.tableMargin.top + 20
    const circleW = state.cellSize / 2;
    state.nextThree.forEach((img, i) => {
        sketch.image(img, config.tableMargin.left + i * (circleW + 20), circleY, circleW, circleW);
    });

    if (state.movingMarble) {
        if (state.movingMarble.isForDeletion) {
            state.movingMarble.e.img = state.movingMarble.img;
            state.movingMarble = undefined;
            state.isUserInputAllowed = true;
            let clearArray = clearFiveOrMore(state.table)
            if (!clearArray.length) {
                next(state.table);
                clearArray = clearFiveOrMore(state.table)
            }
            if (clearArray.length) {
                clearArray.forEach(m => {
                    let numParticles = 10
                    while (numParticles > 0) {
                        numParticles--;
                        const { x, y } = getXY(m.i, m.j)
                        state.particles.push(new ParticleMarble(x, y, m.img, sketch))
                    }
                    state.points.push(new Points(m.i, m.j, "10", sketch))
                    if (state.explodeSound) state.explodeSound.play();
                    m.img = undefined;
                })
                state.score.value += clearArray.length * 10;
                state.score.startAnimation()
            }
        } else {
            state.movingMarble.draw(sketch);
            state.movingMarble.update(sketch);
        }
    }
    state.score.draw()
};