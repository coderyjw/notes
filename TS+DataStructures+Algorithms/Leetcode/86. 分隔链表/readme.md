开启掘金成长之旅！这是我参与「掘金日新计划 · 2 月更文挑战」的第 14 天，[点击查看活动详情](https://juejin.cn/post/7194721470063312933)


# 前言

拒绝摆烂ヾ(◍°∇°◍)ﾉﾞ

从今天开始（`2023/02/12`），定一个小目标，先刷个 `300` 道 `Leetcode` 题目（之前刷的不计入）。

当然作为一个小前端，我选择的语言是 `TS`，而且刷的题目的难度会偏**中等**一些，大概按照 `简单3` `中等6` `困难1` 这样的题型分布吧。嗯，目前是这么打算的。

[本题 Github 地址](https://github.com/coderyjw/notes/tree/master/TS%2BDataStructures%2BAlgorithms)：因为比较喜欢 `vscode` 的界面，而且方便调试，所以 `AC` 完就顺便提到 `github` 了，也算做一个记录吧。



本篇的题目是这个系列的第

1. `NO.12`：[24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/)
2. `NO.13`：[61. 旋转链表](https://leetcode.cn/problems/rotate-list/description/)
3. `NO.14`：[82. 删除排序链表中的重复元素 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/description/)
4. `NO.15`：[86. 分隔链表](https://leetcode.cn/problems/partition-list/description/)
5. `no.16`：[92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/description/)

# 1. 两辆交换链表中的节点

## 1.1 题目描述

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。


**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45fdb28d08ad4303bbc2e8772e55d9b8~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,2,3,4]
输出： [2,1,4,3]
```

**示例 2：**

```
输入： head = []
输出： []
```

**示例 3：**

```
输入： head = [1]
输出： [1]
```

**提示：**

-   链表中节点的数目在范围 `[0, 100]` 内
-   `0 <= Node.val <= 100`



## 1.2 解法一： 迭代

**思路：**

1. 定义 `prev` `curr` `next` 三个变量。一般来说交换两个节点我们只需要定义 **当前节点 `curr`** 以及 **下一个节点 `next`** 即可，通过 `curr.next = next.next.next; next.next = curr` ，但是考虑到交换两个节点对前后节点的影响，我们还需要一个 `prev` 表示上一个节点。
2. 当 `curr` 和 `next` 为 `null` 时，直接返回 `head`
3. 对第一个和第二个节点的交换做特殊处理，因为只有第一个和第二个节点交换时会改变 `head` 的指向


```ts
function swapPairs(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = head?.next ?? null;
  let flag: boolean = true;
  if (!curr || !next) return head;

  while (curr && next) {
    if (flag) {
      flag = false;
      curr.next = next.next;
      next.next = curr;
      head = next;
    } else {
      curr.next = next.next;
      next.next = curr;
      prev!.next = next;
    }
    prev = curr;
    curr = curr.next;
    next = curr?.next || null;
  }

  return head;
}
```

**复杂度分析：**
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`


## 1.2 解法二：递归

我们可以用递归的方法解决

递归要考虑的三点：
1. 返回值：返回两个节点交换后的头节点（比如 1 -> 2 返回 2 -> 1 中的 2）
2. 递归终止条件：当要交换的节点小于两个时
3. 递归的单层逻辑：将 第二的节点指向第一个节点，第一个节点指向下一次递归返回的头节点


```ts
function swapPairs(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let one: ListNode | null = head;
  let two: ListNode | null = one.next;
  let three: ListNode | null = two?.next ?? null;

  two!.next = one;
  one.next = swapPairs(three);

  return two;
}
```


**复杂度分析：**
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`


# 2. 旋转链表

## 2.1 题目描述

给你一个链表的头节点 `head` ，旋转链表，将链表每个节点向右移动 `k` **个位置。

 

**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02b1d96a936445bc8fc59d308a32c899~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,2,3,4,5], k = 2
输出： [4,5,1,2,3]
```

**示例 2：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c57711ddd4641ec97de9d8ef80a003e~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [0,1,2], k = 4
输出： [2,0,1]
```

 

**提示：**

-   链表中节点的数目在范围 `[0, 500]` 内
-   `-100 <= Node.val <= 100`
-   `0 <= k <= 2 * 109`


## 2.2 解


链表只要肯画图，而且舍得用变量就问题不大

思路：我们可以将题目中 `最后一个节点往前移 k 个位置 的问题` 转换为 `第一个节点往后移动 len - k 个位置`。因为我们在移动完第一个节点后第二个节点是很好拿到的，而移动完最后一个节点，倒数第二个节点很难拿到（又要在遍历一遍）

步骤：
1. 定义一个指向第一个节点的 `curr` 变量 和指向尾部节点的 `curr` 变量
2. 循环遍历一遍链表，拿到链表的长度 `len`
3. 在遍历一遍将前面的节点往尾部移

```ts
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if(!head || !head.next) return head
  let curr: ListNode | null = head;
  let tail: ListNode | null = null;
  let len = 0;
  while (curr) {
    curr = curr.next;
    len++;

    if (curr && !curr?.next) {
      tail = curr;
    }
  }
  curr = head;
  k = k % len;
  for (let i = 0; i < len - k; i++) {
    /* 前面的换后移 */ 
    head = head?.next ?? null;
    tail!.next = curr;
    curr!.next = null;
    tail = curr;
    curr = head
  }

  return head;
}
```

**复杂度分析：**
- 时间复杂度：`O(n)`，最坏的情况下遍历两遍链表
- 空间复杂度：`O(1)`，我们只需要常数的空间存储若干变量


# 3. 删除排序链表中的重复元素 II

## 3.1 题目描述

给定一个已排序的链表的头 `head` ， *删除原始链表中所有重复数字的节点，只留下不同的数字* 。返回 *已排序的链表* 。

 

**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3340ddf314b34fc787a53504df764373~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,2,3,3,4,4,5]
输出： [1,2,5]
```

**示例 2：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57a271036ed14d1588e2be4a7650c176~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,1,1,2,3]
输出： [2,3]
```

 

**提示：**

-   链表中节点数目在范围 `[0, 300]` 内
-   `-100 <= Node.val <= 100`
-   题目数据保证链表已经按升序 **排列**


## 3.2 题解

**思路：**

因为题目明确了链表时顺序排列的，所以我们只要循环一次遍历即可

**步骤：**
1. 定义 `prevNode` `currNode` `nextNode` 三个变量节点
2. 遍历链表，当碰到相同节点时，继续往后遍历，因为相同的节点有可能有多个，拿到最后一个相同的节点
    1. 这时还要判断一下相同的节点是否与头节点相同，如果相同说明相同的节点全部集中在头部，此时 `prevNode` 为 `null`，也就是没有前面的节点
    2. 如果不相同，则删除这几个相同的节点即可
3. 没找到相同的节点就继续往后遍历，知道链表的全部节点遍历完成

```ts
function deleteDuplicates(head: ListNode | null): ListNode | null {
  let prevNode: ListNode | null = null;
  let currNode: ListNode | null = head;
  let nextNode: ListNode | null = head?.next ?? null;

  if (!nextNode) return head;

  while (currNode && nextNode) {
    if (currNode.val === nextNode.val) {
      while (nextNode.next && nextNode.next.val === currNode.val) {
        nextNode = nextNode.next;
      }
      if (head!.val === currNode.val) {
        head = nextNode.next;
        prevNode = null
      } else {
        prevNode!.next = nextNode.next;
      }

      currNode = nextNode.next;
      nextNode = nextNode.next?.next ?? null;
    } else {
      prevNode = currNode;
      currNode = currNode.next;
      nextNode = nextNode.next;
    }
  }
  return head;
}
```

**复杂度分析：**

- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`


# 4. 分隔链表

## 4.1 题目描述

给你一个链表的头节点 `head` 和一个特定值 **`x` ，请你对链表进行分隔，使得所有 **小于** `x` 的节点都出现在 **大于或等于** `x` 的节点之前。

你应当 **保留** 两个分区中每个节点的初始相对位置。

 

**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a21d007b77ab43f2a25d295c88f688ac~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]
```

**示例 2：**

```
输入： head = [2,1], x = 2
输出：[1,2]
```

 

**提示：**

-   链表中节点的数目在范围 `[0, 200]` 内
-   `-100 <= Node.val <= 100`
-   `-200 <= x <= 200`

## 4.2 解

我可以直接说看完这题的时候我是没思路的，还在想要怎么将小的节点换到前面，打的节点换到后面，后来感觉太麻烦了，就去瞄了一眼答案，才恍然大悟。

思路：这题直接构建新的链表会简单很多，一个 `small` 链表，一个 `large` 链表，分别存放比 `k` 小的节点和比 `k` 大的节点，最后只要拼接一下这两个链表就行了。

```ts
function partition(head: ListNode | null, x: number): ListNode | null {
  let small: ListNode | null = new ListNode();
  const smallHead: ListNode | null = small;
  let large: ListNode | null = new ListNode();
  const largeHead: ListNode | null = large;

  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next
  }
  large.next = null
  small.next = largeHead.next
  return smallHead.next
}
```

# 5. 反转链表 II

## 5.1 题目描述
给你单链表的头指针 `head` 和两个整数 `left` 和 `right` ，其中 `left <= right` 。请你反转从位置 `left` 到位置 `right` 的链表节点，返回 **反转后的链表** 。

**示例 1：**

![]()

```
输入： head = [1,2,3,4,5], left = 2, right = 4
输出： [1,4,3,2,5]
```

**示例 2：**

```
输入： head = [5], left = 1, right = 1
输出： [5]
```

**提示：**

-   链表中节点数目为 `n`
-   `1 <= n <= 500`
-   `-500 <= Node.val <= 500`
-   `1 <= left <= right <= n`

**进阶：**  你可以使用一趟扫描完成反转吗？

## 5.2 解

思路：这道题可以先将要反转的部分捞出来，在通过 [206. 反转链表](https://juejin.cn/post/7199702913501036600#heading-4) 的方法将捞出来的部分反转，再拼接回去。因为要拼接回去，就要记录**拼接左边链表的尾节点**以及**拼接右边链表的头结点**。


1. 第一次循环拿到 `lefTail` 和 `rightHead`
2. 第二次循环拿到 `reverseHead`，移除不需要翻转的节点
3. `reverseList` 翻转节点 再拿到翻转节点的头结点和尾节点 `reverseHead` `reverseTail`
4. 最后拼接上去

```ts
// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 1 -> 2 -> 3 -> 4 -> 5
// 1 <- 2 <- 3 <- 4 <- 5
function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return head;
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = head.next;
  while (curr && next) {
    curr.next = prev;
    prev = curr;
    curr = next;
    next = next.next;
  }
  curr.next = prev;

  return curr;
}

// 1 -> 2 -> 3 -> 4 -> 5
// LEFT:2 RIGHT:4
// 1 <- 4 <- 3 <- 2 <- 5
function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  let curr: ListNode | null = head;
  let count: number = 1;
  let lefTail: ListNode | null = null;
  let rightHead: ListNode | null = null;
  let reverseHead: ListNode | null = null;

  if ((curr && !curr.next) || left === right) return head;
 

  while (curr) {
    if (count === left - 1) lefTail = curr;
    if (count === right + 1) rightHead = curr;
    curr = curr.next;
    count++;
  }
  curr = head;
  count = 1;
  
  while (curr) {
    if (count === left) reverseHead = curr;

    if (count === right) curr.next = null;

    curr = curr.next;
    count++;
  }
  reverseHead = reverseList(reverseHead);
  
  if (lefTail) lefTail!.next = reverseHead;
  else head = reverseHead;

  let reverseTail: ListNode | null = reverseHead;
  while (reverseTail && reverseTail.next) {
    reverseTail = reverseTail.next;
  }
  reverseTail!.next = rightHead;
  return head;
}
```

**复杂度分析**

- 时间复杂度：`O(N)`，最坏遍历了三次链表

- 空间复杂度：`O(1)`。只使用到常数个变量。

