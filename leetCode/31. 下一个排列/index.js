/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 思路：1. 双指针找到p,q 满足nums[q] > nums[p] 而且nums[q]要是最小的
 * 2. 交换nums[p]和nums[q] 数组从p+1起由小到大排序
 */
var nextPermutation = function (nums) {
  if (nums.length === 1) return;
  let p = (q = 0);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      q = i;
      p = i - 1;
    } else if (nums[i] < nums[i - 1] && nums[i] > nums[p]) {
      q = i;
    }
  }
  if (p === q) {
    nums.sort((prev, next) => prev - next);
  } else {
    const tmp = nums[q];
    nums[q] = nums[p];
    nums[p] = tmp;
    const result = selectionSort(nums.slice(p + 1));
    result.forEach((n, i) => (nums[i + p + 1] = n));
  }

  function selectionSort(nums) {
    if (nums.length <= 1) {
      return nums;
    }
    const left = [];
    const right = [];
    let mid = nums[0];
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < mid) {
        left.push(nums[i]);
      } else {
        right.push(nums[i]);
      }
    }
    return [...selectionSort(left), mid, ...selectionSort(right)];
  }
};
