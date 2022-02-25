/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */


var twoSum = function(nums, target) {
  const record = []
  for(let i = 0; i < nums.length; i++) {
    if(record[nums[i]]) {
      continue
    }
    for(let l = i + 1; l < nums.length; l++) {
      if(nums[i] + nums[l] === target) {
        return [i, l]
      }
    }
    record[nums[i]] = true
  }
};

console.log(twoSum([1,1,1,1,1,4,1,1,1,1,1,7,1,1,1,1,1],11))