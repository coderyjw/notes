/**
 * @param {number[]} nums
 * @return {number[][]}
 * 回溯算法
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
