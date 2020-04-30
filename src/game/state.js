export const GAME_STATE_INSTRUCTIONS = 1
export const GAME_STATE_TIMER = 2
export const GAME_STATE_PLAYING = 3


export const state = {
    nextThree: [],
    isUserInputAllowed: true,
    table: [],
    movingMarble: undefined,
    particles: [],
    selected: undefined,
    images: [],
    points: [],
    cellSize: undefined,
    score: undefined,
    gameState: GAME_STATE_INSTRUCTIONS
}
