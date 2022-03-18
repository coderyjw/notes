/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  const len = nums.length;
  let end = 0,
    maxPosition = 0,
    step = 0;
  for (let i = 0; i < len - 1; i++) {
    maxPosition = Math.max(maxPosition, i + nums[i]);
    if (i != end) continue;
    end = maxPosition;
    step++;
  }
  return step;
};
