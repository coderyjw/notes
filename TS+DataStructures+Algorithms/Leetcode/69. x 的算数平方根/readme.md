开启掘金成长之旅！这是我参与「掘金日新计划 · 2 月更文挑战」的第 13 天，[点击查看活动详情](https://juejin.cn/post/7194721470063312933)


# 前言

拒绝摆烂ヾ(◍°∇°◍)ﾉﾞ

从今天开始（`2023/02/12`），定一个小目标，先刷个 `300` 道 `Leetcode` 题目（之前刷的不计入）。

当然作为一个小前端，我选择的语言是 `TS`，而且刷的题目的难度会偏**中等**一些，大概按照 `简单3` `中等6` `困难1` 这样的题型分布吧。嗯，目前是这么打算的。

[本题 Github 地址](https://github.com/coderyjw/notes/tree/master/ts%2B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%88%B7%E9%A2%98/67.%20%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%B1%82%E5%92%8C)：因为比较喜欢 `vscode` 的界面，而且方便调试，所以 `AC` 完就顺便提到 `github` 了，也算做一个记录吧。



本篇是这个系列的第 `NO.2` 和 `NO.3` 篇，这是 `Leetcode` 上第 `76` 道题 [二进制求和](https://leetcode.cn/problems/add-binary/description/)， 和第 `125` 道题 [验证回文串](https://leetcode.cn/problems/valid-palindrome/description/)，难度都为 **简单**。

我们开始吧，Here We Go~

# 1. x 的平方根

## 1.1 题目描述
给你一个非负整数  `x` ，计算并返回  `x`  的  **算术平方根** 。

由于返回类型是整数，结果只保留  **整数部分** ，小数部分将被  **舍去 。**

**注意：** 不允许使用任何内置指数函数和算符，例如  `pow(x, 0.5)`  或者  `x ** 0.5` 。

**示例 1：**

```
输入： x = 4
输出： 2
```

**示例 2：**

```
输入： x = 8
输出： 2
解释： 8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
```

**提示：**

- `0 <= x <= 231 - 1`

## 1.2. 解法

这题设置一个变量 `i = 0`,通过 `while` 循环判断 `i * i` 是否小于等于 `x`，当 `i * i` 大于 `x` 的时候，`i -1` 就是所需的值。

```ts
function mySqrt(x: number): number {
  let i: number = 0;
  while (i * i <= x) {
    i++;
  }

  return i - 1;
}
```

**复杂度分析**

- 时间复杂度：`O(logn)`
- 空间复杂度：`O(1)`

## 1.3 最后

提交通过之后，去看了一眼题解，发现很多的解法都没有我这一种，很奇怪。

因为我觉得我这种解法也并没有违反题目所说的【不允许使用任何内置指数函数和算符 `pow` 和 `**`】

基于 `O(logn)` 的时间复杂度 & 抱着 `AC` 就 `OK` 的心情结束了这道题


# 2. 验证会问字符串

## 2.1 题目描述

如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 **回文串** 。

字母和数字都属于字母数字字符。

给你一个字符串 `s`，如果它是 **回文串** ，返回 `true` **；否则，返回 **`false` **。

**示例 1：**

```
输入: s = "A man, a plan, a canal: Panama"
输出： true
解释： "amanaplanacanalpanama" 是回文串。
```

**示例 2：**

```
输入： s = "race a car"
输出： false
解释： "raceacar" 不是回文串。
```

**示例 3：**

```
输入： s = " "
输出： true
解释： 在移除非字母数字字符之后，s 是一个空字符串 "" 。
由于空字符串正着反着读都一样，所以是回文串。
```

**提示：**

-   `1 <= s.length <= 2 * 105`
-   `s` 仅由可打印的 ASCII 字符组成

## 2.2 解法

1. 【筛选 + 判断 】：这题最通俗的解法就是循环遍历字符串，做一些 `if` 条件判断，但是这样子代码总是很繁琐。

2. 【正则 + `Array.prototype.reverse`】：通过 `replace` 将字符串中非字母数字的字符移除，在通过数组的 `reverse` 方法取反与字符串 `s` 比较，这样子基本上两行代码就能解决。


```ts
function isPalindrome(s: string): boolean {
  s = s.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
  const ret = s.split("").reverse().join("");
  return ret === s;
}
```

**复杂度分析**
- 时间复杂度：`O(|s|)`，`|s|` 为字符串 `s` 的长度
- 空间复杂度：`O(|s|)`。`|s|` 为 字符串字母数字的长度