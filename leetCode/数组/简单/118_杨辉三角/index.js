/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  const result = []
  if(numRows >= 1) {
    result[0] = [1]
  }
  for(let i = 1; i < numRows; i++) {
    const row = []
    for(let j = 0; j < i + 1; j++) {
      if(j === 0 || j === i ) {
        row[j] = 1
      } else {
        row[j] = result[i - 1][j-1] + result[i - 1][j]
      }
    }
    result[i] = row
  }
  return result
};

console.log(generate(5));