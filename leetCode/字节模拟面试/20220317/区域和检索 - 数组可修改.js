class Bit {
  constructor(arr) {
    this.t = new Array(arr.length + 1).fill(0);
    for (let i = 0; i < arr.length; i++) {
      this.update(i + 1, arr[i]);
    }
  }
  lowbit(x) {
    return x & -x;
  }
  update(index, value) {
    for (let i = index; i < this.t.length; i += this.lowbit(i)) {
      this.t[i] += value;
    }
  }
  query(index) {
    let ans = 0;
    for (let i = index; i > 0; i -= this.lowbit(i)) {
      ans += this.t[i];
    }
    return ans;
  }
}
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.bit = new Bit(nums);
  this.origin = nums;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (index, val) {
  let diff = val - this.origin[index];
  this.origin[index] = val;
  this.bit.update(index + 1, diff);
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  return this.bit.query(right + 1) - this.bit.query(left);
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
