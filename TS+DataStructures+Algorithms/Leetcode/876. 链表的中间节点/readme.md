开启掘金成长之旅！这是我参与「掘金日新计划 · 2 月更文挑战」的第 14 天，[点击查看活动详情](https://juejin.cn/post/7194721470063312933)


# 前言

拒绝摆烂ヾ(◍°∇°◍)ﾉﾞ

从今天开始（`2023/02/12`），定一个小目标，先刷个 `300` 道 `Leetcode` 题目（之前刷的不计入）。

当然作为一个小前端，我选择的语言是 `TS`，而且刷的题目的难度会偏**中等**一些，大概按照 `简单3` `中等6` `困难1` 这样的题型分布吧。嗯，目前是这么打算的。

[本题 Github 地址](https://github.com/coderyjw/notes/tree/master/TS%2BDataStructures%2BAlgorithms)：因为比较喜欢 `vscode` 的界面，而且方便调试，所以 `AC` 完就顺便提到 `github` 了，也算做一个记录吧。



本篇的题目是这个系列的第

1. `NO.9`：[876. 链表的中间节点](https://leetcode.cn/problems/middle-of-the-linked-list/)
2. `NO.10`：[面试题 02.02. 返回倒数第 k 个节点](https://leetcode.cn/problems/kth-node-from-end-of-list-lcci/description/)
3. `NO.11`：[剑指 Offer 06. 从尾到头打印链表](https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/description/)


难度都为 **简单**。

我们开始吧，Here We Go~

# 1. 链表的中间节点

## 1.1 题目描述

给定一个头结点为 `head` 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

**示例 1：**

```
输入： [1,2,3,4,5]
输出： 此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
```

**示例 2：**

```
输入： [1,2,3,4,5,6]
输出： 此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

**提示：**

-   给定链表的结点数介于 `1` 和 `100` 之间。

## 1.2 解：快慢指针

思路：定量一个快指针 fast，一个慢指针 slow，快指针每次都指向下下个节点，慢指针每次都指向下个节点，直到 `fast.next 为 null` 或者 `fast.next.next 为 null`

注意：当 `fast.next 不为 null` 且 `fast.next.next 为 null`（即链表的长度为偶数时），最终的 slow 还要往后移以为。


```ts
function middleNode(head: ListNode | null): ListNode | null {
  let fast: ListNode | null = head
  let slow: ListNode | null = head

  while(fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }

  return slow
}
```

**复杂度分析：**
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`


# 2. 面试题 02.02. 返回倒数第 k 个节点

## 2.1 题目描述

实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。

**注意：** 本题相对原题稍作改动

**示例：**

```
输入： 1->2->3->4->5 和 k = 2
输出： 4
```

**说明：**

给定的 *k* 保证是有效的。

## 2.2 解

这道题比较简单，思路就是先遍历一遍链表获取链表的长度 `len`，随后再遍历一次链表，找到第 `len - k` 位节点就是所求节点。

```ts
function kthToLast(head: ListNode | null, k: number): number {
  let len: number = 0;

  let current: ListNode | null = head;
  while (current) {
    len++;
    current = current.next;
  }
  current = head;
  for (let i = 0; i <= len; i++) {
    if (i == len - i) return current.val;
    current = current.next;
  }
}
```
# 3. 面试题06. 从尾到头打印链表

## 3.1 题目描述

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

 

**示例 1：**

```
输入： head = [1,3,2]
输出： [2,3,1]
```

 

**限制：**

`0 <= 链表长度 <= 10000`

## 3.2 解

这题比较简单，我们只要遍历链表然后从头部插入数组即可。
```ts
function reversePrint(head: ListNode | null): number[] {
  const ret: number[] = []

  let current: ListNode | null = head
  while(current) {
    ret.unshift(current.val)
    current = current.next
  }

  return ret
};
```

**复杂度分析：**
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`