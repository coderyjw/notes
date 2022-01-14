/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var containsNearbyDuplicate = function(nums, k) {
  const hashArr = [] 
  for(let i in nums) {
    if(hashArr[nums[i]] === undefined) {
      hashArr[nums[i]] = i
    } else {
      if(i - hashArr[nums[i]] <= k) {
        return true
      } else {
        hashArr[nums[i]] = i
      }
    }
  }
  return false
};

console.log(containsNearbyDuplicate([1,2,3,1,2,3], 2));