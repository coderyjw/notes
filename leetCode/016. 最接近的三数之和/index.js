/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 排序+双指针 O（n2） O（n）
 */
var threeSumClosest = function (nums, target) {
  const length = nums.length;
  let result = 1000000;
  nums.sort((prev, next) => prev - next);
  for (let i = 0; i < length; i++) {
    let start = i + 1,
      end = length - 1;
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      result =
        Math.abs(target - sum) < Math.abs(target - result) ? sum : result;
      if (sum < target) start++;
      else if (sum > target) end--;
      else return sum;
    }
  }
  return result;
};
