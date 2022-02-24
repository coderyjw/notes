/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let result = 0
  const len = prices.length
  let num = 0
  for(let i = 0; i < len - 1; i++) {
    for(let j = i + 1; j < len; j++) {
      const earnings = prices[j] - prices[i]
      if(earnings > result) {
        result = earnings
      }
      num++
    }
  }
  console.log({num})
  return result
};

console.log(maxProfit([7,6,4,3,1]));
// console.log(maxProfit([7,1,5,3,6,4]));