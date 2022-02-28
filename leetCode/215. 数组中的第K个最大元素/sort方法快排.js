/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  nums.sort((pre, next) => next - pre);
  return nums[k - 1]
};

console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
