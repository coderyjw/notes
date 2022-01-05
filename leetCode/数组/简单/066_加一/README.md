# 1. 题目
给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

 

- **示例 1：**

```
输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。
```
- **示例 2：**

```
输入：digits = [4,3,2,1]
输出：[4,3,2,2]
解释：输入数组表示数字 4321。
```


**- 示例 3：**

```
输入：digits = [0]
输出：[1]
```


**提示：**

- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`


# 2. 解题
思路：就按照数学中加法运算就行了。从数组最后一位开始加，遇到9就进一位。
```JAVASCRIPT
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  const length = digits.length
  for(let i = length - 1; i >= 0; i--) {
    if(digits[i] !== 9) {
      ++digits[i]
      return digits
    } else {
      digits[i] = 0
      if(i === 0) {
        return [1, ...digits]
      }
    }
  }
};
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06c1b118f399412685414311fbe6b236~tplv-k3u1fbpfcp-watermark.image?)
- 复杂度分析：
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)