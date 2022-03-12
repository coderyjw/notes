/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 made by yjw
 */
var getPermutation = function (n, k) {
  let count = 0;
  let result;
  const dfs = (str) => {
    if (result) return;
    if (str.length === n) {
      if (++count === k) result = str;
      return str;
    }
    for (let i = 1; i <= n; i++) {
      if (result) break;
      if (str.indexOf(i + "") === -1) dp(str + i);
    }
  };

  dfs("");
  return result;
};
