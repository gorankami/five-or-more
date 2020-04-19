import { state } from "../state";
import config from "../../game.config.json"
import { clearFiveOrMore } from "../tableOperations";
import { next } from "../next";
import { ParticleMarble } from "../entities/ParticleMarble";

export function draw() {
    this.background(200);
    state.table.forEach(r => r.forEach(c => c.draw(this)))

    state.particles.forEach(p => {
        p.draw(this)
        p.update(this)
    })
    for (let i = state.particles.length - 1; i >= 0; i--) {
        if (state.particles[i].timer < 0) state.particles.splice(i, 1)
    }

    const circleY = state.tableHeight + config.tableMargin.top + 20
    const circleW = state.cellSize / 2;
    state.nextThree.forEach((img, i) => {
        this.image(img, 20 + i * (circleW + 20), circleY, circleW, circleW);
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
                    let numParticles = 20
                    while (numParticles > 0) {
                        numParticles--;
                        state.particles.push(new ParticleMarble(m.i, m.j, m.img, this))
                    }

                    m.img = undefined;
                })
            }
        } else {
            state.movingMarble.draw(this);
            state.movingMarble.update(this);
        }

    }
};