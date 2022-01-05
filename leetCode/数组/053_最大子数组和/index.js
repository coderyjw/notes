/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let preSum = 0, maxSum = nums[0];
  const length = nums.length
  for(let i = 0; i < length; i++) {
    if(preSum < 0) {
      preSum = nums[i] 
    } else {
      preSum += nums[i]
    }

    if( preSum >= maxSum) {
      maxSum = preSum
    }
  }
  return maxSum;
};


console.log(maxSubArray( [5,4,-1,7,8]))