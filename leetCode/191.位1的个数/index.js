/**
 * @param {number} n - a positive integer
 * @return {number}
 made by yjw
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n > 0) {
    count = n % 2 == 1 ? count + 1 : count;
    n = Math.floor(n / 2);
  }
  return count;
};
