import { state } from "./state";
import { random } from "./random";

export function getThreeRandomSprites() {
    return [state.images[random(6)], state.images[random(6)], state.images[random(6)]];
}