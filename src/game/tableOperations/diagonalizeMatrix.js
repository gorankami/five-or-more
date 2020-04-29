
import config from "../../game.config.json"

export function diagonalizeMatrix(matrix) {
  let diagonalizedTable = [];
  let min = 0
  let max = 0
  while (min < config.columns) {
    let row = [];
    if (max < config.columns - 1) {
      for (let i = min; i <= max; i++) {
        row.push(matrix[max - i][i])
      }
      max++;
    } else {
      for (let i = 0; i <= max - min; i++) {
        row.push(matrix[max - i][i + min])
      }
      min++;
    }

    diagonalizedTable.push(row);
  }
  for (let i = 0; i < config.columns; i++) {
    for (let j = 0; j < config.columns; j++) {
      if (!diagonalizedTable[i][j]) diagonalizedTable[i][j] = null;
    }
  }

  return diagonalizedTable;
}
