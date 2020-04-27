import { state } from "../state";
import config from "../../game.config.json"
import { clearFiveOrMore } from "../tableOperations";
import { next } from "../next";
import { ParticleMarble } from "../entities/ParticleMarble";
import { Points } from "../entities/Points";

export function draw() {
    const { sketch } = state;
    sketch.background(state.bg || 200);
    state.table.forEach(r => r.forEach(c => c.draw(sketch)))


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

    const circleY = state.tableHeight + config.tableMargin.top + 20
    const circleW = state.cellSize / 2;
    state.nextThree.forEach((img, i) => {
        sketch.image(img, 20 + i * (circleW + 20), circleY, circleW, circleW);
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
                        state.particles.push(new ParticleMarble(m.i, m.j, m.img, sketch))
                    }
                    state.points.push(new Points(m.i, m.j, "10", sketch))

                    m.img = undefined;
                })
            }
        } else {
            state.movingMarble.draw(sketch);
            state.movingMarble.update(sketch);
        }

    }
};