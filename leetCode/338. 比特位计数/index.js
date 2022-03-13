/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const result = [];
  for (let i = 0; i <= n; i++) {
    let j = i;
    let count = 0;
    while (j > 0) {
      if (j % 2 === 1) {
        count++;
      }
      j = Math.floor(j / 2);
    }
    result.push(count);
  }
  return result;
};
