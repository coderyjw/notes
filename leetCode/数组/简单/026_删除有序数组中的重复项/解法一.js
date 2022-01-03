var removeDuplicates = function(nums) {
  let slow = 0
  let fast = 1
  while(fast < nums.length) {
    if(nums[slow] === nums[fast]) {
      nums.splice(fast, 1)
    } else {
      slow = fast++
    }
  }
  return nums.length
};