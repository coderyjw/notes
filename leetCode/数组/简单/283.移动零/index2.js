/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {
  let num = 0
  const arr = nums.filter(v => {
    if(v === 0) num++
    return v !== 0
  })
  nums.splice(0,nums.length, ...[...arr, ...new Array(num).fill(0)])
  return nums
}
console.log(moveZeroes([0,0,1]));