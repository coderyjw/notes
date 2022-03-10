/**
 * @param {number[]} nums
 * @return {number[][]}
 * 回溯算法
 * 时间复杂度 O（n!）
 * 空间复杂度 O（n） 递归的深度就是nums.length
 */
var permute = function (nums) {
  const res = [];
  const backtrack = (path) => {
    if (path.length === nums.length) res.push(path);
    nums.forEach((n) => {
      if (path.includes(n)) return;
      backtrack([...path, n]);
    });
  };

  backtrack([]);
  return res;
};
