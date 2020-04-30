import { state } from "./state";
import { random } from "./random";
import { getThreeRandomSprites } from "./getThreeRandomSprites";

export function next(table) {
    state.nextThree.forEach(img => {
        const tableCell = getAnyClearMarble(table);
        if (tableCell) {
            tableCell.img = img;
            tableCell.startTime = (new Date()).getTime()
        }
    });

    state.nextThree = getThreeRandomSprites();
}


function getAnyClearMarble(table) {
    let arrayOfCells = [];
    table.forEach(function (row) {
        arrayOfCells = arrayOfCells.concat(row);
    });
    let clearCells = arrayOfCells
        .filter(marble => !marble.img)
    if (clearCells.length) {
        return clearCells[random(clearCells.length - 1)];
    } else {
        return null;
    }
}
