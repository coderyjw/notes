/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) {
      let p = (q = mid);
      while (nums[p] === nums[mid]) p--;
      while (nums[q] === nums[mid]) q++;
      return [p + 1, q - 1];
    } else if (nums[mid] > target) {
      mid = r - 1;
    } else if (nums[mid] < target) {
      mid = l + 1;
    }
  }
  return [-1, -1];
};
