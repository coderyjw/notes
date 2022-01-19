/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let num = 0,i = 0
  while(i < nums.length) {
    if(nums[i] === 0){
      nums.splice(i,1)
      num++
    } else {
      i++
    }
  }
  nums.splice(nums.length,0, ...new Array(num).fill(0))
  return nums
};
console.log(moveZeroes([0,0,1]));