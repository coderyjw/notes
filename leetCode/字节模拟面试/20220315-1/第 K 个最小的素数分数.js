/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 * 1 2 3 5
 */
var kthSmallestPrimeFraction = function (arr, k) {
  const len = arr.length;
  const frac = [];
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      frac.push([arr[i], arr[j]]);
    }
  }
  console.log(frac);
  frac.sort((prev, next) => prev[0] * next[1] - next[0] * prev[1]);
  return frac[k - 1];
};
