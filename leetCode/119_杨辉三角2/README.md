# 1.题目

给定一个非负索引  `rowIndex`，返回「杨辉三角」的第  `rowIndex` 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ade0a7b7039247e0812298a132790111~tplv-k3u1fbpfcp-zoom-1.image)
**示例 1:**

```
输入: rowIndex = 3
输出: [1,3,3,1]
```

**示例 2:**

```
输入: rowIndex = 0
输出: [1]
```

**示例 3:**

```
输入: rowIndex = 1
输出: [1,1]
```

**提示:**

- `0 <= rowIndex <= 33`

# 2. 解一

因为上一步[Javascript 刷 LeetCode:118.杨辉三角](https://juejin.cn/post/7051505045577138212)我们直接生成了「杨辉三角」的前  *`numRows`*  行。
而取第  `rowIndex`  行就简单多了

```javascript
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  const result = [];
  if (rowIndex + 1 >= 1) {
    result[0] = [1];
  }
  for (let i = 1; i < rowIndex + 1; i++) {
    const row = [];
    for (let j = 0; j < i + 1; j++) {
      if (j === 0 || j === i) {
        row[j] = 1;
      } else {
        row[j] = result[i - 1][j - 1] + result[i - 1][j];
      }
    }
    result[i] = row;
  }
  return result[rowIndex];
};
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ff6e5c3fea74ac9b5f6872fa2f4c253~tplv-k3u1fbpfcp-watermark.image?)
**复杂度分析**

- 时间复杂度：O(rowIndex<sup>2</sup>)。
- 空间复杂度：O(1)。不考虑返回值的空间占用。

# 3. 解二

好吧，我承认，下面这种解法我是看了答案才知道的，因为只要知道一条组合数公式就能解决，奈何本菜鸡数学已经全还给老师了 😮‍💨
反正我到现在也还没搞懂这公式是怎么出来的。有懂哥可以留言一下哈。

- 公式就是
  $$
  row[m][n] = row[m][n-1] * (n - m + 1) / m
  $$

```javascript
var getRow = function (rowIndex) {
  const row = new Array(rowIndex + 1).fill(0);
  row[0] = 1;
  for (let i = 1; i <= rowIndex; ++i) {
    row[i] = (row[i - 1] * (rowIndex - i + 1)) / i;
  }
  return row;
};
```

**复杂度分析**

- 时间复杂度：O(\textit{rowIndex})O(rowIndex)。
- 空间复杂度：O(1)O(1)。不考虑返回值的空间占用。
