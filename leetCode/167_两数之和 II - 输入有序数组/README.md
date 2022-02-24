# 1. 题目

给定一个已按照 非递减顺序排列   的整数数组  numbers ，请你从数组中找出两个数满足相加之和等于目标数  target 。

函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。numbers 的下标 从 1 开始计数 ，所以答案数组应当满足 1 <= answer[0] < answer[1] <= numbers.length 。

你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

**示例 1：**

```
输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

**示例 2：**

```
输入：numbers = [2,3,4], target = 6
输出：[1,3]
```

**示例 3：**

```
输入：numbers = [-1,0], target = -1
输出：[1,2]
```



**提示：**

- 2 <= numbers.length <= 3 \* 104
- -1000 <= numbers[i] <= 1000
- numbers 按 非递减顺序 排列
- -1000 <= target <= 1000
- 仅存在一个有效答案
- 通过次数 345,963 提交次数 58

# 2. 前言

这道题可以使用[1. 两数之和](https://juejin.cn/post/7048603650440036388)的解法，使用 O(n<sup>2</sup>)的时间复杂度和 O(1) 的空间复杂度暴力求解，或者借助哈希表使用 O(n) 的时间复杂度和 O(n) 的空间复杂度求解。但是这两种解法都是针对无序数组的，没有利用到输入数组有序的性质。利用输入数组有序的性质，可以得到时间复杂度和空间复杂度更优的解法。

# 3.二分查找

先固定一个数，另一位数通过二分法来查找

```javascript
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  const len = numbers.length;
  for (let i = 0; i < len - 1; i++) {
    let left = i + 1;
    let right = len - 1;
    const needNum = target - numbers[i];
    while (left <= right) {
      const mid = (left + right) >> 1;
      if (numbers[mid] === needNum) {
        return [i + 1, mid + 1];
      } else if (numbers[mid] < needNum) {
        left = mid + 1;
      } else if (numbers[mid] > needNum) {
        right = mid - 1;
      }
    }
  }
};
```

复杂度分析：

- 时间复杂度：O(nlogn)
- 空间复杂度：O(1)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af5dd0d3c9ef44d2bfa693a4b96795f4~tplv-k3u1fbpfcp-watermark.image?)

# 4. 双指针

初始时两个指针分别指向第一个元素位置和最后一个元素的位置。每次计算两个指针指向的两个元素之和，并和目标值比较。如果两个元素之和等于目标值，则发现了唯一解。如果两个元素之和小于目标值，则将左侧指针右移一位。如果两个元素之和大于目标值，则将右侧指针左移一位。移动指针之后，重复上述操作，直到找到答案。

```JAVASCRIPT
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(numbers, target) {
  let left = 0,right = numbers.length - 1
  while(left < right) {
    const sum = numbers[left] + numbers[right]
    if(sum > target) {
      right--
    } else if(sum < target) {
      left++
    } else {
      return [left + 1, right + 1]
    }
  }
};
```

**复杂度分析**

- 时间复杂度：O(n)，其中  nn  是数组的长度。两个指针移动的总次数最多为  n  次。
- 空间复杂度：O(1)。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/923e2e91a60e409fb124a09717ec480e~tplv-k3u1fbpfcp-watermark.image?)
