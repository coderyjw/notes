/**
 * @param {number} n
 * @return {boolean}
 */
var divisorGame = function (n) {
  const dp = new Array(n + 1);
  dp[1] = false;
  dp[2] = true;
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < n; j++) {
      if (i % j === 0 && !dp[i - j]) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
};
