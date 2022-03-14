/**
 * @param {number} n
 * @return {number}
 */
var getMaximumGenerated = function (n) {
  if (n === 0) return 0;
  const nums = [0, 1];
  for (let i = 2; i <= n; i++) {
    if (i % 2 === 0) {
      nums[i] = nums[i / 2];
    } else {
      const j = Math.floor(i / 2);
      nums[i] = nums[j] + nums[j + 1];
    }
  }
  return Math.max(...nums);
};
