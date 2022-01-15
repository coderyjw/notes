/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function(nums) {
  const len = nums.length 
  const arr = []
  if(len === 1) {
    return [`${nums[0]}`]
  }
  for(let j = 1,i = 0; j < len; j++) {
    const diff = nums[j] - nums[j-1]
    if(diff === 1 && j === len - 1) {
      arr.push(`${nums[i]}->${nums[j]}`)
    } 
    if(diff > 1) {
      const value = j - i > 1 ? `${nums[i]}->${nums[j-1]}` : `${nums[i]}`
      arr.push(value)
      i = j
      if(j === len - 1) {
        arr.push(`${nums[j]}`)
      }
    }
  }
  return arr
};

console.log(summaryRanges([-1]))