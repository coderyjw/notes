/**
 * @param {number[]} nums
 * @return {number[][]}
 * 回溯
 * 递归模拟出所有情况
 * 保证接的数字都是后面的数字
 * O（n * 2^n）一共 2^n 个状态，每种状态需要 O(n) 的时间来构造子集。
 * O (n)  临时数组 tt 的空间代价是 O(n)，递归时栈空间的代价为 O(n)。
 */
var subsets = function (nums) {
  const res = [];
  const backtrack = (arr) => {
    res.push(arr);
    nums.forEach((n) => {
      if (arr.includes(n) || arr[arr.length - 1] > n) return;
      backtrack([...arr, n]);
    });
  };
  backtrack([]);
  return res;
};
