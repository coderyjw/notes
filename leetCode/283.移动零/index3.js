/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  const len = nums.length
  let left = 0, right = 0
  while (right < len) {
    if (nums[right]) {
        const temp = nums[right]
        nums[right] = nums[left]
        nums[left] = temp
        left++;
    }
    right++;
  }
  return nums
}
// console.log(moveZeroes([0,0,1]));
console.log(moveZeroes( [0,1,0,3,12]));