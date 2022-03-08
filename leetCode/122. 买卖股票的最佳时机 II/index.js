/**
 * @param {number[]} prices
 * @return {number}
 * 经典贪心算法
 * 前提：上帝视角，知道未来的价格
 * 局部最优：见好就收，见差就不动，不做任何长远打算
 */
var maxProfit = function (prices) {
  let buy = 0,
    sell = 0;
  let inCome = 0;
  for (let i = 1; i < prices.length; i++, sell++) {
    if (
      prices[i] < prices[buy] ||
      (prices[i] >= prices[buy] && prices[i] < prices[sell])
    ) {
      inCome += prices[sell] - prices[buy];
      buy = i;
    }
  }
  if (prices[sell] > prices[buy]) inCome += prices[sell] - prices[buy];
  return inCome;
};
