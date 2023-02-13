开启掘金成长之旅！这是我参与「掘金日新计划 · 2 月更文挑战」的第 14 天，[点击查看活动详情](https://juejin.cn/post/7194721470063312933)

# 前言

拒绝摆烂ヾ(◍°∇°◍)ﾉﾞ

从今天开始（`2023/02/12`），定一个小目标，先刷个 `300` 道 `Leetcode` 题目（之前刷的不计入）。

当然作为一个小前端，我选择的语言是 `TS`，而且刷的题目的难度会偏**中等**一些，大概按照 `简单3` `中等6` `困难1` 这样的题型分布吧。嗯，目前是这么打算的。

[本题 Github 地址](https://github.com/coderyjw/notes/tree/master/ts%2B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%88%B7%E9%A2%98/67.%20%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%B1%82%E5%92%8C)：因为比较喜欢 `vscode` 的界面，而且方便调试，所以 `AC` 完就顺便提到 `github` 了，也算做一个记录吧。

本篇的题目是这个系列的第 `NO.6` 和 `NO.7` 道，分别是 `Leetcode` 上第 `203` 道题 [移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/description/)， 和第 `145` 道题 [二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)，难度都为 **简单**。

我们开始吧，Here We Go~

# 1. 移除链表

## 1.1 题目描述

给你一个链表的头节点 `head` 和一个整数 `val` ，请你删除链表中所有满足 `Node.val == val` 的节点，并返回 **新的头节点** 。
 

**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d92e0bb8cb442f08f7a50ac19e2a06d~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,2,6,3,4,5,6], val = 6
输出： [1,2,3,4,5]
```

**示例 2：**

```
输入： head = [], val = 1
输出： []
```

**示例 3：**

```
输入： head = [7,7,7,7], val = 7
输出： []
```

**提示：**

- 列表中的节点数目在范围 `[0, 104]` 内
- `1 <= Node.val <= 50`
- `0 <= val <= 50`

## 1.2 解法：迭代

**思路：**

1. 遍历链表
2. 遍历到值相同时， 删除节点
   1. 要删除的节点位于头节点
   2. 要删除的节点不位于头节点
3. 遍历到值不相同时，继续遍历，记录 `previous`（上一个节点）

```ts
function removeElements(head: ListNode | null, val: number): ListNode | null {
  let ret: ListNode | null = head;
  let previous: ListNode | null = null;
  let current: ListNode | null = head;
  // 1. 遍历链表
  while (current) {
    if(current.val === val) {
      // 2. 遍历到值相同时， 删除节点
      if(previous === null) {
        // 1. 要删除的节点位于头节点
        current = current.next
        ret = current
      } else {
        // 2. 要删除的节点不位于头节点
        previous.next = previous?.next?.next ?? null
        current = previous.next
      }
    } else {
      // 3. 遍历到值不相同时，继续遍历，记录 previous（上一个节点）
      previous = current
      current = current.next
    }
  
  }
  return ret;
}
```

**复杂度分析：**

- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`
