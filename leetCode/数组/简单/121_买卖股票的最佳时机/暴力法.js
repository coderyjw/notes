/**
 * @param {number[]} prices
 * @return {number}
 */
// O(n2)
var maxProfit = function(prices) {
  let result = 0
  const len = prices.length
  for(let i = 0; i < len - 1; i++) {
    for(let j = i + 1; j < len; j++) {
      if(prices[j] - prices[i] > result) {
        result = prices[j] - prices[i]
      }
    }
  }
  return result
};

console.log(maxProfit([7,6,4,3,1]));
console.log(maxProfit([7,1,5,3,6,4]));