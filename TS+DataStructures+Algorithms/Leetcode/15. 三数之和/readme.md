开启掘金成长之旅！这是我参与「掘金日新计划 · 2 月更文挑战」的第 18 天，[点击查看活动详情](https://juejin.cn/post/7194721470063312933)

# 前言

拒绝摆烂ヾ(◍°∇°◍)ﾉﾞ

从今天开始（`2023/02/12`），定一个小目标，先刷个 `300` 道 `Leetcode` 题目（之前刷的不计入）。

当然作为一个小前端，我选择的语言是 `TS`，而且刷的题目的难度会偏**中等**一些，大概按照 `简单3` `中等6` `困难1` 这样的题型分布吧。嗯，目前是这么打算的。

[本题 Github 地址](https://github.com/coderyjw/notes/tree/master/TS%2BDataStructures%2BAlgorithms)：因为比较喜欢 `vscode` 的界面，而且方便调试，所以 `AC` 完就顺便提到 `github` 了，也算做一个记录吧。

本篇的题目是这个系列的第

1. `NO.26`：[15.  三数之和](https://leetcode.cn/problems/3sum/description/)
2. `NO.27`：[16.  最接近的三数之和](https://leetcode.cn/problems/3sum-closest/)
3. `NO.28`：[18.  四数之和](https://leetcode.cn/problems/4sum/)

# 1. 三数之和

## 1.1 题目描述

给你一个整数数组  `nums` ，判断是否存在三元组  `[nums[i], nums[j], nums[k]]`  满足  `i != j`、`i != k`  且  `j != k` ，同时还满足  `nums[i] + nums[j] + nums[k] == 0` 。请

你返回所有和为  `0`  且不重复的三元组。

**注意：** 答案中不可以包含重复的三元组。

**示例 1：**

```
输入： nums = [-1,0,1,2,-1,-4]
输出： [[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
```

**示例 2：**

```
输入： nums = [0,1,1]
输出： []
解释： 唯一可能的三元组和不为 0 。
```

**示例 3：**

```
输入： nums = [0,0,0]
输出： [[0,0,0]]
解释： 唯一可能的三元组和为 0 。
```

**提示：**

- `3 <= nums.length <= 3000`
- `-105 <= nums[i] <= 105`

## 1.2 解：排序 + 双指针

这道题的难点在于如何去除重复解

我们的思路是这样的

1. 首先将数组从小到大排序
2. 然后遍历数组
3. 在一层遍历的的内部定义两个指针，一个 `start`指针指向剩下部分的头，另一个 `end`指针指向剩余部分的尾部
4. 接着判断三个数相加，如果小于 `0` 时 `start` 指针 `+1`，如果大于 `0` 时 `end` 指针 `-1`，如果等于 `0` 且 `start` 和 `end` 指针不等于上一个值时说明当前三个数肯定不重合即得到我们需要的组合

```ts
function threeSum(nums: number[]): number[][] {
  nums = nums.sort((prev, next) => prev - next);
  const ret: number[][] = [];
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    let start = i + 1;
    let end = nums.length - 1;
    let prevStartNum, prevEndNum;
    if (nums[i] === nums[i - 1]) continue;
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      if (sum < 0) {
        prevStartNum = nums[start];
        start++;
      }
      if (sum > 0) {
        prevEndNum = nums[end];
        end--;
      }

      if (sum === 0) {
        if (prevEndNum !== nums[end] && prevStartNum !== nums[start]) {
          ret.push([nums[i], nums[start], nums[end]]);
        }
        prevStartNum = nums[start];
        prevEndNum = nums[end];
        start++;
        end--;
      }
    }
  }
  return ret;
}
```

复杂度分析：

- 时间复杂度：这里的时间复杂度比较复杂，数组排序 O(nlogn)，遍历数组 O(n)，双指针 O(n)，最终的时间复杂度为 O(n`<sup>`2`</sup>`)
- 空间复杂度：O(1)

# 2. 最接近的三数之和

## 2.1 题目描述

给你一个长度为  `n`  的整数数组  `nums` **和一个目标值  `target`。请你从  `nums`**中选出三个整数，使它们的和与  `target`  最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。

**示例 1：**

```
输入： nums = [-1,2,1,-4], target = 1
输出： 2
解释： 与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
```

**示例 2：**

```
输入： nums = [0,0,0], target = 1
输出： 0
```

**提示：**

- `3 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`
- `-104 <= target <= 104`

## 2.2 解：排序+双指针

这道题和上一道很相似，只不过上题的目标是找相等的，这题的目标是找最接近的。

我们依然可以使用上面的排序+双指针，这次定义一个无限大的值 `ret`，当找到 **三数和与 `target` 的差比 `ret` 小的时候** 就改变 `ret`，直到**遍历完数组**或 **找到相加三数和与 target 相等**

```ts
function threeSumClosest(nums: number[], target: number): number {
  const length = nums.length;
  let ret = Infinity;
  nums.sort((prev, next) => prev - next);
  for (let i = 0; i < length; i++) {
    let start = i + 1,
      end = length - 1;
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      ret = Math.abs(target - sum) < Math.abs(target - ret) ? sum : ret;
      if (sum < target) start++;
      else if (sum > target) end--;
      else return sum;
    }
  }
  return ret;
}
```

复杂度与上一题相似就不分析了。

# 3. 四数之和

## 3.1 题目描述

给你一个由  `n`  个整数组成的数组  `nums` ，和一个目标值  `target` 。请你找出并返回满足下述全部条件且**不重复**的四元组  `[nums[a], nums[b], nums[c], nums[d]]` （若两个四元组元素一一对应，则认为两个四元组重复）：

- `0 <= a, b, c, d < n`
- `a`、`b`、`c`  和  `d` **互不相同**
- `nums[a] + nums[b] + nums[c] + nums[d] == target`

你可以按  **任意顺序**  返回答案 。

**示例 1：**

```
输入： nums = [1,0,-1,0,-2,2], target = 0
输出： [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

**示例 2：**

```
输入： nums = [2,2,2,2,2], target = 8
输出： [[2,2,2,2]]
```

**提示：**

- `1 <= nums.length <= 200`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`

## 3.2 解
