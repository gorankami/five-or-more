/**
 * @desc finds solutions of five or more marbles of the same type in horizontal and returns found marbles
 * @param matrix
 * @returns {Array} Array of marbles that are destroyed
 */
export function findFiveOrMoreInMatrix(matrix) {
    let results = [];
    matrix.forEach(row => {
        let rowResults = [1];
        for (let col = 1; col < row.length; col++) {
            if (row[col] && row[col - 1]) {
                if (row[col].img === row[col - 1].img && !!row[col - 1].img) {
                    rowResults[col] = rowResults[col - 1] + 1;
                } else {
                    rowResults[col] = 1;
                }
            }
        }
        for (let i = rowResults.length - 1; i >= 0; i--) {
            if (rowResults[i] >= 5) {
                for (let j = rowResults[i]; j >= 1; j--) {
                    results.push(row[i]);
                    i--;
                }
            }
        }
    })
    
    return results;
}