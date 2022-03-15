/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        result[i] = nums[j];
        break;
      }
    }
    if (result[i] !== undefined) continue;
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[i]) {
        result[i] = nums[j];
        break;
      }
    }
    if (result[i] !== undefined) continue;
    result.push(-1);
  }
  return result;
};
