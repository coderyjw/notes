/**
 * @param {number} n
 * @return {number}
 * 爬到第n个台阶可以再第n-1阶爬一个台阶，或者在第n-2阶爬2个台阶
 * F(n) = F(n - 1) + F(n - 2)
 * 使用动态规划
 */
var climbStairs = function (n) {
  const cache = [0, 1, 2];
  const dp = (n) => {
    if (cache[n]) return cache[n];
    else {
      cache[n] = dp(n - 1) + dp(n - 2);
      return cache[n];
    }
  };
  return dp(n);
};

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n < 2) return 1;
  let dp0 = 1,
    dp1 = 1;
  for (let i = 2; i <= n; i++) {
    const tmp = dp0;
    dp0 = dp1;
    dp1 = tmp + dp1;
  }
  return dp1;
};
