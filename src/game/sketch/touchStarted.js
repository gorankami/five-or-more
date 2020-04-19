import { findPath } from "../tableOperations";
import { state } from "../state";
import { MovingMarble } from "../entities/MovingMarble";

export function touchStarted() {
    if (!state.isUserInputAllowed) return;
    const { mouseX, mouseY } = this;
    let found = false;
    for (let i = 0; i < state.table.length; i++) {
        for (let j = 0; j < state.table.length; j++) {
            const e = state.table[i][j];
            if (e.x <= mouseX && mouseX < e.x + state.cellSize && e.y <= mouseY && mouseY < e.y + state.cellSize) {
                found = true;
                if (e === state.selected) {
                    state.selected = undefined;
                } else {
                    if (e.img === undefined && state.selected) {
                        //move selected marble
                        state.isUserInputAllowed = false;
                        let startPoint = this.createVector(Number(state.selected.i), Number(state.selected.j));
                        let endPoint = this.createVector(Number(e.i), Number(e.j));

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
    state.table.forEach(r => r.forEach(c => c.draw(this)))
}