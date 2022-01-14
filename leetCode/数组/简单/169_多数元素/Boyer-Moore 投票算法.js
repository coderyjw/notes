/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  let count = 0, candidate
  for(let i in nums) {
    if(count === 0) {
      candidate = nums[i]
    }
    count +=  (nums[i] === candidate) ? 1 : -1
  }
  return candidate
};

console.log(majorityElement([3,3,4,5,6]));