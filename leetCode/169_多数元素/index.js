/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  const a = []
  const n = nums.length >> 1
  for(let index in nums) {
    a[nums[index]] = a[nums[index]] !== undefined ? ++a[nums[index]] : 1
    if(a[nums[index]] > n) {
      return nums[index]
    }
  }
};
