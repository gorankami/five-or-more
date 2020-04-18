import { Graph, astar } from "javascript-astar"
import config from "../game.config.json"

/**
 * Uses A* path finding alghoritm to check if there is a path between startPoint and endPoint
 * @param startPoint {Point}
 * @param endPoint {Point}
 * @returns {Boolean} true if there is a path
 */
export function findPath(table, startPoint, endPoint) {

  let grid = []
  for (let i = 0; i < config.columns; i++) {
    grid[i] = [];
    for (let j = 0; j < config.rows; j++) {
      grid[i][j] = !table[j][i].img ? 1 : 0;
    }
  }

  let graph = new Graph(grid);
  let start = graph.grid[startPoint.y][startPoint.x];
  let end = graph.grid[endPoint.y][endPoint.x];
  return astar.search(graph, start, end);
}

/**
 * Simple point object for matrix coordinates
 * @param x {Integer}
 * @param y {Integer}
 * @constructor
 */
export function Point(x, y) {
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
    cell.img = undefined;
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
        if (matrix[row][col].img === matrix[row][col - 1].img && !!matrix[row][col - 1].img) {
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
  for (let j = 0; j < config.columns + config.rows - 1; j++) {
    let row = [];
    for (let i = j; i >= 0; i--) {
      if (i < config.rows && (j - i) < config.columns) {
        row.push(matrix[i][j - i]);
      } else {
        row.push(null);
      }
    }
    diagonalizedTable.push(row);
  }
  //fix missing cells
  for (let i = 0; i < config.columns + config.rows - 1; i++) {
    for (let j = 0; j < config.columns + config.rows - 1; j++) {
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
