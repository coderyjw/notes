/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
  const length = nums.length
  let count = 0
  for(let i = 0; i < nums.length; i++) {
    for(let l = i + 1; l < nums.length; l++) {
      if(nums[l] < nums[i]) {
        count++
      }
    }
  }
  return count
};

console.log(reversePairs([1, 3, 5, 7, 9, 8, 4, 2, 6, 10 ]))