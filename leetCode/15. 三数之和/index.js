/**
 * @param {number[]} nums
 * @return {number[][]}
 * 时间 O（n2）
 * 空间O(logN)
 */
var threeSum = function (nums) {
  nums.sort((prev, next) => prev - next);
  const length = nums.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let start = i + 1,
      end = length - 1;
    let prevNum, nextNum;
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      if (sum < 0 || nums[start] === prevNum) {
        prevNum = nums[start++];
        continue;
      }
      if (sum > 0 || nums[end] === nextNum) {
        nextNum = nums[end--];
        continue;
      }

      if (sum === 0) {
        result.push([nums[i], nums[start], nums[end]]);
        prevNum = nums[start++];
        nextNum = nums[end--];
      }
    }
  }
  return result;
};
