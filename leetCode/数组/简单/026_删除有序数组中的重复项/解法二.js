/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
  let slow = 0
  let fast = 1
  const length = nums.length
  if(length === 0) {
    return 0
  }
  while(fast < length) {
    if(nums[slow] !== nums[fast]) {
      nums[++slow] = nums[fast]
    }
    fast++
  }
  return slow + 1
};