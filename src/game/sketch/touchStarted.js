import { findPath } from "../tableOperations";
import { state, GAME_STATE_INSTRUCTIONS, GAME_STATE_TIMER, GAME_STATE_PLAYING } from "../state";
import { MovingMarble } from "../entities/MovingMarble";
import { getThreeRandomSprites } from "../getThreeRandomSprites";
import { next } from "../next";

export function touchStarted() {
    switch (state.gameState) {
        case GAME_STATE_INSTRUCTIONS:
            state.gameState = GAME_STATE_PLAYING;
            return;
        case GAME_STATE_TIMER:
            return;
        default:
            touchStartedPlaying()
    }
}

function touchStartedPlaying() {
    const { sketch } = state;
    if (!state.isUserInputAllowed) return;
    const { mouseX, mouseY } = sketch;
    let found = false;
    for (let i = 0; i < state.table.length; i++) {
        for (let j = 0; j < state.table.length; j++) {
            const e = state.table[i][j];
            if (e.position.x <= mouseX && mouseX < e.position.x + state.cellSize && e.position.y <= mouseY && mouseY < e.position.y + state.cellSize) {
                found = true;
                if (e === state.selected) {
                    state.selected = undefined;
                } else {
                    if (e.img === undefined && state.selected) {
                        //move selected marble
                        state.isUserInputAllowed = false;
                        let startPoint = sketch.createVector(Number(state.selected.i), Number(state.selected.j));
                        let endPoint = sketch.createVector(Number(e.i), Number(e.j));

                        let path = findPath(state.table, startPoint, endPoint);
                        if (path && path.length) {
                            state.movingMarble = new MovingMarble(state.selected.i, state.selected.j, state.selected.img, e)
                            state.movingMarble.startAnimation(path.map(({ x, y }) => ({ i: y, j: x })))

                            state.selected.img = undefined
                            state.selected = undefined;
                        }
                    } else if (e.img) {
                        state.selected = e;
                    }
                }
                break;
            }
        }
        if (found) break;
    }
    // state.table.forEach(r => r.forEach(c => c.draw(sketch)))
}