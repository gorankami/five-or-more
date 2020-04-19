/**
 * Matrix operation
 * @desc creates a mirror image of a matrix by y coordinate. Doesn't change the input
 * @example [[a11,a12],[a21,a22]] -> [[a12,a11],[a22,a21]]
 * @param matrix nxm
 * @returns {Array} new matrix nxm mirrored
 */
export function mirrorMatrix(matrix) {
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