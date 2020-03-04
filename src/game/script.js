import { Graph, astar } from "javascript-astar"
import { CELL_CLASS } from './CELL_CLASS';
import { MARBLE_CLASS } from './MARBLE_CLASS';
/**
 * @desc Array of marble colors
 * @type {MARBLE_CLASS[]}
 */
export const marbleClasses = [
  MARBLE_CLASS.RED,
  MARBLE_CLASS.GREEN,
  MARBLE_CLASS.ORANGE,
  MARBLE_CLASS.LIGHT_BLUE,
  MARBLE_CLASS.BLUE,
  MARBLE_CLASS.YELLOW,
  MARBLE_CLASS.PURPLE
];

let tableWidth = 9,
  tableHeight = 9;

export function getThreeRandomMarbleClasses() {
  return [marbleClasses[random(6)], marbleClasses[random(6)], marbleClasses[random(6)]];
}

/**
 * Sets next three random marbles
 */
export function setThreeRandomMarbleClasses(nextThreeMarbleClasses) {
  for (let i in nextThreeMarbleClasses) {
    document.getElementById("next-" + i).className = "next-marble " + nextThreeMarbleClasses[i];
  }
}

/**
 * Prepares next three random marbles
 */
export function setThreeRandomMarbles(table, nextThreeMarbleClasses) {
  for (let marbleClass in nextThreeMarbleClasses) {
    const m = getRandomClearMarble(table);
    if (m) m.className = nextThreeMarbleClasses[marbleClass];
  }
  setThreeRandomMarbleClasses()
}

/**
 * Random number from 0 to max
 * @param max {Integer}
 * @returns {Integer}
 */
function random(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Gets a random space that is not occupied with a marble
 * @returns {HTMLElement}
 */
function getRandomClearMarble(table) {
  let arrayOfCells = [];
  table.forEach(function (row) {
    arrayOfCells = arrayOfCells.concat(row);
  });
  let clearCells = arrayOfCells.map(function (cell) {
    return cell.children ? cell.children[0] : null;
  }).filter(function (marble) {
    return !!marble && marble.className === MARBLE_CLASS.CLEAR;
  });
  if (clearCells.length) {
    return clearCells[random(clearCells.length - 1)];
  } else {
    return null;
  }
}

export function getAnyClearMarble(table) {
  let arrayOfCells = [];
  table.forEach(function (row) {
    arrayOfCells = arrayOfCells.concat(row);
  });
  let clearCells = arrayOfCells
    .filter(marble => marble.marbleType === MARBLE_CLASS.CLEAR)
  if (clearCells.length) {
    return clearCells[random(clearCells.length - 1)];
  } else {
    return null;
  }
}


/**
 * Currently selected cell
 * @type {null}
 */
let selected = null;

/**
 * Reacts to use move and renders a new state
 * @param event {event}
 */
export const click = table => event => {
  let marble = event.target;
  let cell = marble.parentNode;

  if (!selected) {
    //first selection
    select(cell);
  } else if (cell === selected) {
    //selected same cell, just deselect
    deselect(cell);
  } else {
    //selected one but
    if (isMarble(selected) && !isMarble(cell)) {
      let startPoint = new Point(Number(selected.dataset.x), Number(selected.dataset.y));
      let endPoint = new Point(Number(cell.dataset.x), Number(cell.dataset.y));
      // let finish        = pathFinder(selectedPoint, marble);
      let isPathFund = findPath(table, startPoint, endPoint);
      if (isPathFund) {
        moveMarble(selected, cell);
        if (!clearFiveOrMore(table)) {
          setThreeRandomMarbles(table);
          //if random marbles complete a line by accident
          clearFiveOrMore(table);
        }
      }
      deselect(selected);

    } else {
      deselect(selected);
      select(cell);
    }
  }
}

/**
 * Uses A* path finding alghoritm to check if there is a path between startPoint and endPoint
 * @param startPoint {Point}
 * @param endPoint {Point}
 * @returns {Boolean} true if there is a path
 */
function findPath(table, startPoint, endPoint) {
  let grid = table.map(function (row) {
    return row.map(function (cell) {
      return cell.children[0].className === MARBLE_CLASS.CLEAR ? 1 : 0;
    });
  });

  let graph = new Graph(grid);
  let start = graph.grid[startPoint.y][startPoint.x];
  let end = graph.grid[endPoint.y][endPoint.x];
  return !!astar.search(graph, start, end).length;
}

/**
 * Marks table cell as selected
 * @param element {HTMLElement}
 */
function select(element) {
  selected = element;
  element.className = CELL_CLASS.SELECTED;
}

/**
 * Clears DOM element from any marble class
 * @param element {HTMLElement}
 */
function deselect(element) {
  selected = null;
  element.className = CELL_CLASS.CLEAR;
}

/**
 * Moves a marble from start to finish
 * @param start {HTMLElement}
 * @param finish {HTMLElement}
 */
function moveMarble(start, finish) {
  let startMarble = start.children[0];
  let finishMarble = finish.children[0];
  finishMarble.className = startMarble.className;
  startMarble.className = MARBLE_CLASS.CLEAR;
}

/**
 * Short check if current marble position holds a marble
 * @param element {HTMLElement}
 * @returns {boolean} true if it is a marble
 */
function isMarble(element) {
  let marble = element.children[0];
  return marble.className !== MARBLE_CLASS.CLEAR;
}

/**
 * Simple point object for matrix coordinates
 * @param x {Integer}
 * @param y {Integer}
 * @constructor
 */
function Point(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * @desc finds solutions of five or more marbles of the same type in 4 directions vertical, horizontal, and both diagonal
 * @returns {Boolean} true if any marble is destroyed
 */
export function clearFiveOrMore(table) {
  let transponedTable = transponeMatrix(table);
  let diagonalizedTable = diagonalizeMatrix(table);
  let transponedDiagonalTable = diagonalizeMatrix(mirrorMatrix(table));

  let results = [
    ...findFiveOrMoreInMatrix(table),
    ...findFiveOrMoreInMatrix(transponedTable),
    ...findFiveOrMoreInMatrix(diagonalizedTable),
    ...findFiveOrMoreInMatrix(transponedDiagonalTable)
  ];

  results.forEach(function (cell) {
    cell.marbleType = MARBLE_CLASS.CLEAR;
  });

  return !!results.length;
}

/**
 * @desc finds solutions of five or more marbles of the same type in horizontal and returns found marbles
 * @param matrix
 * @returns {Array} Array of marbles that are destroyed
 */
function findFiveOrMoreInMatrix(matrix) {
  let results = [];
  for (let row = 0; row < matrix.length; row++) {
    let rowResults = [1];
    for (let col = 1; col < matrix[row].length; col++) {
      if (matrix[row][col] && matrix[row][col - 1]) {
        if (matrix[row][col].marbleType === matrix[row][col - 1].marbleType && matrix[row][col - 1].marbleType !== MARBLE_CLASS.CLEAR) {
          rowResults[col] = rowResults[col - 1] + 1;
        } else {
          rowResults[col] = 1;
        }
      }
    }
    for (let i = rowResults.length - 1; i >= 0; i--) {
      if (rowResults[i] >= 5) {
        for (let j = rowResults[i]; j >= 1; j--) {
          results.push(matrix[row][i]);
          i--;
        }
      }
    }
  }
  return results;
}

/**
 * Matrix operation
 * @desc transpones a matrix
 * @example [[a11,a12],[a21,a22]] -> [[a11, a21],[a12,a22]]
 * @param normalTable
 * @returns {Array}
 */
function transponeMatrix(matrix) {
  let transponedTable = [];
  matrix[0].forEach(function (i, index) {
    transponedTable[index] = [];
  });
  for (let indexRow = 0; indexRow < matrix.length; indexRow++) {
    for (let indexCol = 0; indexCol < matrix[indexRow].length; indexCol++) {
      transponedTable[indexCol][indexRow] = matrix[indexRow][indexCol];
    }
  }

  return transponedTable;
}

/**
 * Matrix operation
 * @desc rotates the matrix by 45 degrees making diagonals turn into rows. The direction is analog to forward slash
 * @example [[a11,a12],[a21,a22]] -> [[a11, null],[a12,a21],[null,a22]]
 * @param matrix nxm
 * @returns {Array} new matrix nxm with mirrored values
 */
function diagonalizeMatrix(matrix) {
  let diagonalizedTable = [];
  for (let j = 0; j < tableWidth + tableHeight - 1; j++) {
    let row = [];
    for (let i = j; i >= 0; i--) {
      if (i < tableHeight && (j - i) < tableWidth) {
        row.push(matrix[i][j - i]);
      } else {
        row.push(null);
      }
    }
    diagonalizedTable.push(row);
  }
  //fix missing cells
  for (let i = 0; i < tableWidth + tableHeight - 1; i++) {
    for (let j = 0; j < tableWidth + tableHeight - 1; j++) {
      if (!diagonalizedTable[i][j]) diagonalizedTable[i][j] = null;
    }
  }
  return diagonalizedTable;
}

/**
 * Matrix operation
 * @desc creates a mirror image of a matrix by y coordinate. Doesn't change the input
 * @example [[a11,a12],[a21,a22]] -> [[a12,a11],[a22,a21]]
 * @param matrix nxm
 * @returns {Array} new matrix nxm mirrored
 */
function mirrorMatrix(matrix) {
  let mirroredMatrix = [];
  matrix.forEach(function (row) {
    let mirroredRow = [];
    for (let i = row.length - 1; i >= 0; i--) {
      mirroredRow.push(row[i]);
    }
    mirroredMatrix.push(mirroredRow);
  });
  return mirroredMatrix;
}
