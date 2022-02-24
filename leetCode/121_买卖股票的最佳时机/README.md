# 1. 题目

给定一个数组 prices ，它的第  i 个元素  prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

**示例 1：**

```
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**示例 2：**

```
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

**提示：**

- `1 <= prices.length <= 105`
- `0 <= prices[i] <= 104`

# 2. 解一：暴力法

这种方法简单明了，就是套两个循环，将每种情况下的收入算出取最大值。

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let result = 0;
  const len = prices.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      const earnings = prices[j] - prices[i];
      if (earnings > result) {
        result = earnings;
      }
    }
  }
  return result;
};
```

**复杂度分析：**

- 时间复杂度：O(n<sup>2</sup>)
- 空间复杂度：O(1)
  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af90ee7f6e854a79ba3da692edca3503~tplv-k3u1fbpfcp-watermark.image?)
  可以看到直接超时了

# 3. 解二：动态规划(Dynamic programming)

我们假设我们来买股票，那么什么时候会有更高的收益呢? 那肯定是股价最低的时候买入，股价最高的时候卖出。
而且这里有个前提就是股价最高的点要在最低之后。

我们可以定义两个指针变量`InDay=0`和`outDay=1`分别表示买入的时间点和卖出的时间点
最大收益`maxNum=0`
我们就可以开始遍历数组在遇到股价比之前记录的低的点的时候，重新开始计算最大利润。

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let inDay = (maxNum = 0);
  let outDay = 1;
  const len = prices.length;
  for (let i = 1; i < len; i++, outDay++) {
    const earnings = prices[outDay] - prices[inDay];
    maxNum = Math.max(earnings, maxNum);

    if (prices[i] < prices[inDay]) {
      inDay = outDay = i;
    }
  }
  return maxNum;
};
```

**复杂度分析：**

- 时间复杂度：O(n)
- 空间复杂度：O(1)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f5fec6baad943cb8ab518138154602e~tplv-k3u1fbpfcp-watermark.image?)
