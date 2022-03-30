/**
 * @param {number[][]} envelopes
 * @return {number}
 made by yjw
 */
var maxEnvelopes = function (envelopes) {
  envelopes.sort((prev, next) => {
    if (prev[0] !== next[0]) {
      return prev[0] - next[0];
    } else {
      return prev[1] - next[1];
    }
  });
  const dp = new Array(n).fill(1);
  const len = envelopes.length;
  let ans = 1;
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (
        envelopes[i][0] > envelopes[j][0] &&
        envelopes[i][1] > envelopes[j][1]
      ) {
        dp[i] = Math.max(dp[i], 1 + dp[j]);
      }
    }
    ans = Math.max(ans, dp[i]);
  }

  return dp[0];
};
