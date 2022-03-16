/**
 * @param {number[]} prices
 * @return {number[]}
 made by yjw
 */
var finalPrices = function (prices) {
  const result = [];
  const len = prices.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j <= len; j++) {
      if (j === len) {
        result.push(prices[i]);
        break;
      }
      if (prices[j] <= prices[i]) {
        result.push(prices[i] - prices[j]);
        break;
      }
    }
  }
  return result;
};
