import { Graph, astar } from "javascript-astar"
import config from "../../game.config.json"
import { mirrorMatrix } from "./mirrorMatrix";
import { diagonalizeMatrix } from "./diagonalizeMatrix";
import { transponeMatrix } from "./transponeMatrix";
import { findFiveOrMoreInMatrix } from "./findFiveOrMoreInMatrix";

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

  return results;
}


