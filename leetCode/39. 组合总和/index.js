/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 搜索回溯
 * 思路：
 */
// [2,3,6,7] 7
var combinationSum = function (candidates, target) {
  const res = [];
  /**
   *
   * @param {*} target 表示还剩需要组合的数
   * @param {*} combine 已经组合的列表
   * @param {*} idx 数组的第 idx 位
   * @returns
   */
  const dfs = (target, combine, idx) => {
    // 递归的终止条件为 target <= 0 或者 candidates 数组被全部用完。
    if (idx === candidates.length) {
      return;
    }
    if (target === 0) {
      res.push(combine);
      return;
    }

    // 1. 直接跳过
    dfs(target, combine, idx + 1);
    // 2. 选择当前数
    if (target - candidates[idx] >= 0) {
      dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
    }
  };
  dfs(target, [], 0);
  return res;
};
