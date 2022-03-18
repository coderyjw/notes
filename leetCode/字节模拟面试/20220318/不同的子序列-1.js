var numDistinct = function (s, t) {
  const sLen = s.length,
    tLen = t.length;
  const memo = new Array(sLen + 1)
    .fill(0)
    .map(() => new Array(tLen + 1).fill(0));
  function helper(i, j) {
    if (j < 0) {
      return 1;
    }
    if (i < 0) {
      return 0;
    }
    if (memo[i][j] != -1) {
      return memo[i][j];
    }
    if (s[i] == t[j]) {
      memo[i][j] = helper(i - 1, j) + helper(i - 1, j - 1);
    } else {
      memo[i][j] = helper(i - 1, j);
    }
    return memo[i][j];
  }
  return helper(sLen - 1, tLen - 1);
};
