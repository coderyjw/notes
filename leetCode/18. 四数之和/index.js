/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 * 双指针 + 排序 O(n3) O(logn)
 */
var fourSum = function (nums, target) {
  const length = nums.length;
  nums.sort((prev, next) => prev - next);
  const result = [];
  let p1, p2;
  for (let i = 0; i < length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break;
    }
    if (nums[i] + nums[length] + nums[length - 1] + nums[length] < target) {
      continue;
    }
    for (let j = i + 1; j < length; j++) {
      let start = j + 1,
        end = length - 1;
      let prevNum, nextNum;
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break;
      }
      if (nums[i] + nums[j] + nums[length - 1] + nums[length] < target) {
        continue;
      }
      if (nums[i] === p1 && nums[j] === p2) {
        continue;
      }

      while (start < end) {
        const sum = nums[i] + nums[j] + nums[start] + nums[end];
        if (sum < target || prevNum === nums[start]) {
          prevNum = nums[start++];
          continue;
        }
        if (sum > target || nextNum === nums[end]) {
          nextNum = nums[end--];
          continue;
        }
        if (sum === target) {
          p1 = nums[i];
          p2 = nums[j];
          result.push([nums[i], nums[j], nums[start], nums[end]]);
          prevNum = nums[start++];
          nextNum = nums[end--];
        }
      }
    }
  }
  return result;
};
