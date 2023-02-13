开启掘金成长之旅！这是我参与「掘金日新计划 · 2 月更文挑战」的第 12 天，[点击查看活动详情](https://juejin.cn/post/7194721470063312933)

# 前言

拒绝摆烂ヾ(◍°∇°◍)ﾉﾞ

从今天开始（`2023/02/12`），定一个小目标，先刷个 `300` 道 `Leetcode` 题目（之前刷的不计入）。

当然作为一个小前端，我选择的语言是 `TS`，而且刷的题目的难度会偏**中等**一些，大概按照 `简单3` `中等6` `困难1` 这样的题型分布吧。嗯，目前是这么打算的。

[本题 Github 地址](https://github.com/coderyjw/notes/tree/master/ts%2B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%88%B7%E9%A2%98/67.%20%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%B1%82%E5%92%8C)：因为比较喜欢 `vscode` 的界面，而且方便调试，所以 `AC` 完就顺便提到 `github` 了，也算做一个记录吧。



本篇是这个系列的第 `NO.1` 篇，这是 `Leetcode` 上第 `76` 道题 [二进制求和](https://leetcode.cn/problems/add-binary/description/)， 难度为 **简单**。

我们开始吧，Here We Go~

# 1. 题目描述

给你两个二进制字符串 `a` 和 `b` ，以二进制字符串的形式返回它们的和。

**示例 1：**

```
输入: a = "11", b = "1"
输出： "100"
```

**示例 2：**

```
输入： a = "1010", b = "1011"
输出： "10101"
```

 

**提示：**

-   `1 <= a.length, b.length <= 104`
-   `a` 和 `b` 仅由字符 `'0'` 或 `'1'` 组成
-   字符串如果不是 `"0"` ，就不含前导零


# 2. 解一：模拟

这是一种很容易理解的方法

我们可以借鉴「列竖式」的方法，末尾对齐，逐位相加。在十进制的计算中「逢十进一」，二进制中我们需要「逢二进一」。

具体的操作：
1. 我们先通过比较两个字符串的长度，通过 `padStart` 方法将它们的**长度补齐**（前面补 `0`）
，这样会利于相加操作。
2. 从后往前遍历两个字符串，对两个数字做**加法**操作，要注意溢出的数字对后一位数的影响
3. 判断最后是否有溢出，有的话在 `ret` 前面 `+1`

```ts
function addBinary(a: string, b: string): string {
  const n1: number = a.length;
  const n2: number = b.length;
  if (n1 > n2) {
    b = b.padStart(n1, "0");
  } else {
    a = a.padStart(n2, "0");
  }

  const n: number = a.length;
  let ret: string = "";
  let d: number = 0;
  for (let i = n - 1; i >= 0; i--) {
    const temp = parseInt(a[i]) + parseInt(b[i]) + d;
    ret = (temp % 2) + ret;
    d = Math.floor(temp / 2);
  }
  if (d > 0) ret = d + ret;
  return ret;
}
```

**复杂度分析**
- 时间复杂度：`O(n)`，这里的时间复杂度来源于顺序遍历 `a` 和 `b`。
- 空间复杂度：`O(1)`，除去答案所占用的空间，这里使用了常数个临时变量。


