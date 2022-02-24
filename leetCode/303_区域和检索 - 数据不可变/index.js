/**
 * @param {number[]} nums
 */
 var NumArray = function(nums) {
  const len = nums.length
  this.nums = new Array(len).fill(0)
  for(let i = 0; i< len; i++) {
      this.nums[i + 1] = this.nums[i] + nums[i]
  }
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    return this.nums[right + 1] - this.nums[left]
};

