import { findPath } from "../tableOperations";
import {
  state,
  GAME_STATE_INSTRUCTIONS,
  GAME_STATE_TIMER,
  GAME_STATE_PLAYING,
} from "../state";
import { MovingMarble } from "../entities/MovingMarble";

export function touchStarted() {
  switch (state.gameState) {
    case GAME_STATE_INSTRUCTIONS:
      state.gameState = GAME_STATE_PLAYING;
      return;
    case GAME_STATE_TIMER:
      return;
    default:
      touchStartedPlaying();
  }
}

function findCollidingCell(mouseX, mouseY) {
  const { table, cellSize } = state;
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table.length; j++) {
      //   const e = table[i][j];
      const { x, y } = table[i][j].position;
      if (
        x <= mouseX &&
        mouseX < x + cellSize &&
        y <= mouseY &&
        mouseY < y + cellSize
      ) {
        return table[i][j];
      }
    }
  }
}

function touchStartedPlaying() {
  const { sketch, table } = state;
  if (!state.isUserInputAllowed) return;

  const e = findCollidingCell(sketch.mouseX, sketch.mouseY);
  if (e) {
    if (e === state.selected) {
      e.deselect();
      state.selected = undefined;
      console.log(1);
    } else {
      if (e.img === undefined && state.selected) {
        console.log(2);
        //move selected marble
        state.isUserInputAllowed = false;
        let startPoint = sketch.createVector(
          Number(state.selected.i),
          Number(state.selected.j)
        );
        let endPoint = sketch.createVector(Number(e.i), Number(e.j));

        let path = findPath(table, startPoint, endPoint);
        if (path && path.length) {
          state.movingMarble = new MovingMarble(
            state.selected.i,
            state.selected.j,
            state.selected.img,
            e
          );
          state.movingMarble.startAnimation(
            path.map(({ x, y }) => ({ i: y, j: x }))
          );

          state.selected.img = undefined;
          state.selected = undefined;
          if (state.tapDestinationSound) state.tapDestinationSound.play();
        } else {
          if (state.badDestinationSound) state.badDestinationSound.play();
          state.isUserInputAllowed = true;
        }
      } else if (e.img) {
        if(state.selected) state.selected.deselect();
        state.selected = e;
        e.select();
        if (state.selectSound) state.selectSound.play();
      }
    }
  }
}
