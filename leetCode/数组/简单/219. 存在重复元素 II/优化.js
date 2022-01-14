/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var containsNearbyDuplicate = function(nums, k) {
  const set = new Set()
  for(let i in nums) {
    if(set.has(nums[i])) {
      return true
    }
    set.add(nums[i])
    if(set.size > k) {
      set.delete(nums[i - k])
    }
  }
  return false
};

console.log(containsNearbyDuplicate([1,2,3,1], 3));

