
import config from "../../game.config.json"

/**
 * Matrix operation
 * @desc rotates the matrix by 45 degrees making diagonals turn into rows. The direction is analog to forward slash
 * @example [[a11,a12],[a21,a22]] -> [[a11, null],[a12,a21],[null,a22]]
 * @param matrix nxm
 * @returns {Array} new matrix nxm with mirrored values
 */
export function diagonalizeMatrix(matrix) {
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