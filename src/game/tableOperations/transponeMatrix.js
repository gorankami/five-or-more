/**
 * Matrix operation
 * @desc transpones a matrix
 * @example [[a11,a12],[a21,a22]] -> [[a11, a21],[a12,a22]]
 * @param normalTable
 * @returns {Array}
 */
export function transponeMatrix(matrix) {
    const transponedTable = [];
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
  