/**
 * @param {number} rowIndex
 * @return {number[]}
 */
 var getRow = function(rowIndex) {
  const result = []
  if(rowIndex + 1 >= 1) {
    result[0] = [1]
  }
  for(let i = 1; i < rowIndex + 1; i++) {
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
  return result[rowIndex]
};
//     1
//.   1 1
//.  1.2.1
//. 1 3 3 1
//.1 4 6 4 1

// 1
// 1 1
// 1 2 1
// 1 3 3 1
// 1 4 6 4 1
// 1 5 10 10 5 1
// row[i] = row[i - 1] * (rowIndex - i + 1) / i;

// row[3][2] = row[2][1] + row[2][2]
// = row[1][0] + row[1][1] + row[1][1] + row[1][2]
// = 