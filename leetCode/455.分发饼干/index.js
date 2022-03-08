/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 * 局部最优：既能满足孩子，还消耗最少
 * 先讲“较小的饼干”分给胃口较小的孩子
 */
var findContentChildren = function (g, s) {
  g.sort((pre, next) => pre - next);
  s.sort((pre, next) => pre - next);
  let i = (j = 0);
  let num = 0;
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) {
      num++;
      j++;
      i++;
    } else {
      j++;
    }
  }
  return num;
};
