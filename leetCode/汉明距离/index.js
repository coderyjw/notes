/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 made by yjw
 */
var hammingDistance = function (x, y) {
  let count = 0;
  while (x && y) {
    if (x % 2 !== y % 2) {
      count++;
    }
    x = Math.floor(x / 2);
    y = Math.floor(y / 2);
  }
  while (x) {
    if (x % 2 !== 0) count++;
    x = Math.floor(x / 2);
  }
  while (y) {
    if (y % 2 !== 0) count++;
    y = Math.floor(y / 2);
  }
  return count;
};
