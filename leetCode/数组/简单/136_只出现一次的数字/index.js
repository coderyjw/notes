/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  nums.sort((pre, next) => pre - next)
  const len = nums.length
  if(nums[0] !== nums[1]) {
    return nums[0]
  }
  if(nums[len - 2] !== nums[len - 1]) {
    return nums[len - 1]
  }
 for(let i = 1; i < len - 2; i++) {
   if(nums[i] !== nums[i-1] && nums[i] !== nums[i+1]) {
     return  nums[i]
   }
 }
};

console.log(singleNumber([4,1,2,1,2]))