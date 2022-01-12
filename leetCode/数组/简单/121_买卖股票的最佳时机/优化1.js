/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
  let inDay = maxNum = 0
  let outDay = 1
  const len = prices.length
  for(let i = 1;i < len; i++,outDay++) {
    const earnings = prices[outDay] - prices[inDay]
    maxNum = Math.max(earnings, maxNum)

    if(prices[i] < prices[inDay] ) {
      inDay = outDay = i
    }
    
  }
  return maxNum
};

console.log(maxProfit([2,4,1]));