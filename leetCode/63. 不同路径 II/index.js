/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid[0].length;
  const n = obstacleGrid.length;
  const dp = new Array(n).fill(0).map(() => new Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (obstacleGrid[i][j] == 1) {
        dp[i][j] = 0;
      } else {
        if (i == 0 && j == 0) dp[i][j] = 1;
        else if (i == 0 && j != 0) dp[i][j] = dp[i][j - 1];
        else if (i != 0 && j == 0) dp[i][j] = dp[i - 1][j];
        else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[n - 1][m - 1];
};
