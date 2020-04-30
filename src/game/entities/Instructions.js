import { state } from "../state";
import { easeInOutQuint } from "js-easing-functions";
import { ParticleMarble } from "./ParticleMarble";

export class Instructions {
    constructor() {
        this.duration = 1000;
        this.startTime = 0;
        this.animationY = 0;
        this.particles = [];
        this.drawItems = true;
    }

    update() {
        const { sketch } = state
        const currentTime = (new Date()).getTime() - this.startTime;

        if (currentTime > this.duration - 400) {
            if (!this.particles.length) {
                this.drawItems = false;
                const halfSize = state.cellSize / 2
                let numParticles = 10
                while (numParticles > 0) {
                    numParticles--;
                    this.particles.push(new ParticleMarble(window.innerWidth / 2 - halfSize * 18, state.cellSize, state.images[2], sketch))
                    this.particles.push(new ParticleMarble(window.innerWidth / 2 - halfSize * 16, state.cellSize, state.images[2], sketch))
                    this.particles.push(new ParticleMarble(window.innerWidth / 2 - halfSize * 14, state.cellSize, state.images[2], sketch))
                    this.particles.push(new ParticleMarble(window.innerWidth / 2 - halfSize * 12, state.cellSize, state.images[2], sketch))
                    this.particles.push(new ParticleMarble(window.innerWidth / 2 - halfSize * 10, state.cellSize, state.images[2], sketch))
                }
            }
            if (currentTime > this.duration) {
                this.particles.length = 0;
            }
            if (currentTime > this.duration + 500) {
                this.startTime = (new Date()).getTime()
            }
        } else {
            this.drawItems = true;
            this.animationY = easeInOutQuint(currentTime, 0, state.cellSize, this.duration)
        }
    }

    draw() {
        const { sketch } = state
        sketch.push();
        sketch.translate(window.innerWidth / 2, window.innerWidth > 770 ? 400 : window.innerWidth > 440 ? 300 : 170)
        const halfSize = state.cellSize / 2
        this.particles.forEach(p => {
            p.update(sketch)
            p.draw(sketch)
        })
        if (this.drawItems) {
            sketch.image(state.images[2], - halfSize * 5, state.cellSize, state.cellSize, state.cellSize)
            sketch.image(state.images[2], - halfSize * 3, this.animationY, state.cellSize, state.cellSize)
            sketch.image(state.images[2], - halfSize, state.cellSize, state.cellSize, state.cellSize)
            sketch.image(state.images[2], halfSize, state.cellSize, state.cellSize, state.cellSize)
            sketch.image(state.images[2], halfSize * 3, state.cellSize, state.cellSize, state.cellSize)
        }
        sketch.pop()
    }
}