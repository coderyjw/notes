# 1.题目
给定一个非负整数 *`numRows`，* 生成「杨辉三角」的前 *`numRows`* 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ff4187fc39045e390307c67d9046f53~tplv-k3u1fbpfcp-zoom-1.image)

**示例 1:**

```
输入: numRows = 5
输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```
**示例 2:**

```
输入: numRows = 1
输出: [[1]]
```
 

提示:

-   `1 <= numRows <= 30`

# 2. 解
这题比较简单，直接上代码了。
```javascript
/**
 * @param {number} numRows
 * @return {number[][]}
 */

var generate = function(numRows) {
  const result = []
  for(let i = 0; i < numRows; i++) {
    const line = []
    for(let j = 0; j < i + 1; j++) {
      if(j === 0 || j === i ) {
        line[j] = 1
      } else {
        line[j] = result[i - 1][j-1] + result[i - 1][j]
      }
    }
    result[i] = line
  }
  return result
};

```


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/638cafc33eba42f08391abe45117d730~tplv-k3u1fbpfcp-watermark.image?)
**复杂度分析**：
- 时间复杂度：O(numRows<sup>2</sup>)。
- 空间复杂度：O(1)。不考虑返回值的空间占用。

