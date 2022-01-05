/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

 var searchInsert = function(nums, target) {
  function binarySearch(left, right) {
    if(left > right) {
      return left
    }
    const mid = (left + right) >> 1
    if(nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      return binarySearch(0, mid - 1)
    } else if (nums[mid] < target) {
      return binarySearch(mid + 1, right)
    }
  }
  return binarySearch(0, nums.length - 1)
};

console.log(searchInsert([1], 0))

