/**
 * @param {number[]} prices
 * @return {number[]}
 */
 var finalPrices = function (prices) {
  let stack = [0];
  let result = [...prices];
  for (let i = 1; i < prices.length; i++) {
    while (prices[stack[stack.length - 1]] >= prices[i]) {
      result[stack[stack.length - 1]] =
        prices[stack[stack.length - 1]] - prices[i];
      stack.pop();
    }
    stack.push(i);
  }
  return result;
};