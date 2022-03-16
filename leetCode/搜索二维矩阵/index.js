/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 made by yjw
 */
var searchMatrix = function (matrix, target) {
  const colNum = matrix[0].length,
    rowNum = matrix.length;
  let left = 0,
    right = rowNum * colNum - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const x = matrix[Math.floor(mid / colNum)][mid % colNum];
    if (x === target) return true;
    else if (x < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
};
