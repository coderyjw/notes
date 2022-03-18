var numDistinct = function (s, t) {
  const sLen = s.length,
    tLen = t.length;
  const memo = new Array(sLen + 1)
    .fill(0)
    .map(() => new Array(tLen + 1).fill(0));
  for (let i = 0; i < sLen + 1; i++) {
    for (let j = 0; j < tLen + 1; j++) {
      if (j == 0) {
        dp[i][j] = 1;
      } else if (i == 0) {
        dp[i][j] = 0;
      } else {
        if (s[i - 1] == t[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
  }
  return dp[sLen][tLen];
};
