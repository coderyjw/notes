开启掘金成长之旅！这是我参与「掘金日新计划 · 2 月更文挑战」的第 14 天，[点击查看活动详情](https://juejin.cn/post/7194721470063312933)

# 前言

拒绝摆烂ヾ(◍°∇°◍)ﾉﾞ

从今天开始（`2023/02/12`），定一个小目标，先刷个 `300` 道 `Leetcode` 题目（之前刷的不计入）。

当然作为一个小前端，我选择的语言是 `TS`，而且刷的题目的难度会偏**中等**一些，大概按照 `简单3` `中等6` `困难1` 这样的题型分布吧。嗯，目前是这么打算的。

[本题 Github 地址](https://github.com/coderyjw/notes/tree/master/TS%2BDataStructures%2BAlgorithms)：因为比较喜欢 `vscode` 的界面，而且方便调试，所以 `AC` 完就顺便提到 `github` 了，也算做一个记录吧。

本篇的题目是这个系列的第 `NO.6` 、`NO.7` 和 `NO.8` 道，分别是 `Leetcode` 上第 `203` 道题 [移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/description/)， 第 `145` 道题 [二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/) 以及 第 `234` 道 [回文链表](https://leetcode.cn/problems/palindrome-linked-list/)，难度都为 **简单**。

我们开始吧，Here We Go~

# 1. 移除链表

## 1.1 题目描述

给你一个链表的头节点  `head`  和一个整数  `val` ，请你删除链表中所有满足  `Node.val == val`  的节点，并返回  **新的头节点** 。



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

- 列表中的节点数目在范围  `[0, 104]`  内
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
    if (current.val === val) {
      // 2. 遍历到值相同时， 删除节点
      if (previous === null) {
        // 1. 要删除的节点位于头节点
        current = current.next;
        ret = current;
      } else {
        // 2. 要删除的节点不位于头节点
        previous.next = previous?.next?.next ?? null;
        current = previous.next;
      }
    } else {
      // 3. 遍历到值不相同时，继续遍历，记录 previous（上一个节点）
      previous = current;
      current = current.next;
    }
  }
  return ret;
}
```

**复杂度分析：**

- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

# 2. 反转链表

## 2.1 题目描述

给你单链表的头节点  `head` ，请你反转链表，并返回反转后的链表。



**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6789782bd1e845a381da50da9543ea4a~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,2,3,4,5]
输出： [5,4,3,2,1]
```

**示例 2：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef2f7d6f3925455db7e2c429360b8f1b~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,2]
输出： [2,1]
```

**示例 3：**

```
输入： head = []
输出： []
```



**提示：**

- 链表中节点的数目范围是  `[0, 5000]`
- `-5000 <= Node.val <= 5000`



**进阶：** 链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

## 2.2 解一：迭代

举个例子，我们现在要将 `1 2 3 4 5 6` 反转成 `6 5 4 3 2 1`，我们的步骤应该是：

1. 我们将目标拆小成将 `1 -> 2` 变为 `1 <- 2`
2. 定义 `prev` `curr` `next` 三个变量分别只想上一个节点、当前节点、下一个节点
3. 循环遍历链表
4. 第一次循环：此时 `prev` 为 `null`，`curr` 为 `1`，`next` 为 `2`
5. 将 `1.next` 指向 `prev`
6. `prev` 赋值为 `1`
7. `curr` 赋值为 `2` 进行下一个循环
8. 直到遍历完链表

```ts
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}
```

**复杂度分析**

- 时间复杂度：`O(n)`，其中  `n`  是链表的长度。需要遍历链表一次。
- 空间复杂度：`O(1)`。

## 2.3 解二：递归

递归的写法稍微有点难理解

举个例子，我们现在要将 `1 2 3 4 5 6` 反转成 `6 5 4 3 2 1`，按照递归的方法我们的步骤应该是：

1. 先递归的拿到链表尾部的 `5 -> 6` 变为 `6 -> 5`，再拿到 `4 -> 5` 变为 `5 -> 4` 再拿到 `3 -> 4` 变为 `4 -> 3` ........直到拿到 `1 -> 2` 变为 `2 -> 1`
2. 所以我们将目标缩小成将`5 -> 6` 变为 `6 -> 5`
3. 递归到最里面一层，此时 `head` 为 `5`, `newHead` 为 `6`
4. 通过 `head.next.next = 5; 5.next = null` 的方法将 `5 -> 6 变为 6 -> 5`
5. 后续都使用相同办法直到链表完全反转

**注意**：在第 `4` 步这里的`head.next.next = 5` 不能变为 `newHead.next = 5`，因为 `newHead` 是最终返回的链表头节点，在这一步中你虽然将 `6 指向了 5`，但是在下一个循环中 `head` 为 `4`，这样赋值就会变成 `6 指向 4`

```ts
function reverseList(head: ListNode | null): ListNode | null {
  // 1. 判断节点为 null，或者只要一个节点，那么直接返回即可
  if (head === null || head.next === null) {
    return head;
  }

  const newHead = reverseList(head.next);

  head.next.next = head;
  head.next = null;
  return newHead;
}
```

复杂度分析

- 时间复杂度：`O(n)`，其中 `n` 是链表的长度。需要对链表的每个节点进行反转操作。

- 空间复杂度：`O(n)`，其中 `n` 是链表的长度。空间复杂度主要取决于递归调用的栈空间，最多为 `n` 层。

# 2. 回文链表

## 2.1 题目描述

给你一个单链表的头节点  `head` ，请你判断该链表是否为回文链表。如果是，返回  `true` ；否则，返回  `false` 。

**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62a1b5895c6942368b48fee517feacdc~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,2,2,1]
输出： true
```

**示例 2：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da9c94aa8be64c43aaa37f08368d5df2~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,2]
输出： false
```

**提示：**

- 链表中节点数目在范围`[1, 105]`  内
- `0 <= Node.val <= 9`

## 2.2 解一：复制到数组中转成字符串比较

这种是最简单的方法

循环遍历链表，将链表的节点赋值到数组中，将数组转换为字符串比较，接下来就是[验证回文串](https://juejin.cn/post/7199465410776531002)了

```ts
function isPalindrome(head: ListNode | null): boolean {
  const arr: number[] = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }

  return arr.join("") === arr.reverse().join("");
}
```

**复杂度分析：**

- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

## 2.3 解法二：快慢指针 + 反转链表

避免使用  `O(n)`  额外空间的方法就是改变输入。

避免使用 `O(n)` 额外空间的方法就是改变输入。

我们可以将链表的后半部分反转（修改链表结构），然后将前半部分和后半部分进行比较。比较完成后我们应该将链表恢复原样。虽然不需要恢复也能通过测试用例，但是使用该函数的人通常不希望链表结构被更改。

该方法虽然可以将空间复杂度降到 `O(1)`，但是在并发环境下，该方法也有缺点。在并发环境下，函数运行时需要锁定其他线程或进程对链表的访问，因为在函数执行过程中链表会被修改。

整个流程可以分为以下五个步骤：

1.  找到前半部分链表的尾节点。
2.  反转后半部分链表。
3.  判断是否回文。
4.  恢复链表。
5.  返回结果。

```ts
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

function endOfFirstHalf(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast.next && fast?.next.next) {
    fast = fast.next?.next ?? null;
    slow = slow!.next;
  }
  return slow;
}

function isPalindrome(head: ListNode | null): boolean {
  if (head == null) return true;

  // 1. 找到前半部分链表的尾节点并反转后半部分链表
  const firstHalfEnd = endOfFirstHalf(head);
  const secondHalfStart = reverseList(firstHalfEnd!.next);

  // 2. 判断是否回文
  let p1: ListNode | null = head;
  let p2: ListNode | null = secondHalfStart;
  while (p1 && p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  // 还原链表并返回结果
  firstHalfEnd!.next = reverseList(secondHalfStart);

  return true;
}
```
