/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const res = [];
  const backtrack = (arr, i) => {
    if (i > n + 1) return;
    if (arr.length == k) {
      res.push(arr);
      return;
    }
    backtrack([...arr, i], i + 1);
    backtrack(arr, i + 1);
  };
  backtrack([], 1);
  return res;
};
