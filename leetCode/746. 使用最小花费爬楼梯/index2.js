/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let prev = (cur = 0);
  for (let i = 2; i <= cost.length; i++) {
    let next = Math.min(p + cost[i - 2], q + cost[i - 1]);
    prev = cur;
    cur = next;
  }
  return cur;
};
