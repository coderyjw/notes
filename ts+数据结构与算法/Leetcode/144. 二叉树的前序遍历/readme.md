开启掘金成长之旅！这是我参与「掘金日新计划 · 2 月更文挑战」的第 13 天，[点击查看活动详情](https://juejin.cn/post/7194721470063312933)


# 前言

拒绝摆烂ヾ(◍°∇°◍)ﾉﾞ

从今天开始（`2023/02/12`），定一个小目标，先刷个 `300` 道 `Leetcode` 题目（之前刷的不计入）。

当然作为一个小前端，我选择的语言是 `TS`，而且刷的题目的难度会偏**中等**一些，大概按照 `简单3` `中等6` `困难1` 这样的题型分布吧。嗯，目前是这么打算的。

[本题 Github 地址](https://github.com/coderyjw/notes/tree/master/ts%2B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%88%B7%E9%A2%98/67.%20%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%B1%82%E5%92%8C)：因为比较喜欢 `vscode` 的界面，而且方便调试，所以 `AC` 完就顺便提到 `github` 了，也算做一个记录吧。



本篇是这个系列的第 `NO.2` 和 `NO.3` 篇，这是 `Leetcode` 上第 `76` 道题 [二进制求和](https://leetcode.cn/problems/add-binary/description/)， 和第 `125` 道题 [验证回文串](https://leetcode.cn/problems/valid-palindrome/description/)，难度都为 **简单**。

我们开始吧，Here We Go~

# 1. 二叉树的前序遍历

## 1.1 题目描述

给你二叉树的根节点 `root` ，返回它节点值的 **前序** 遍历。

**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4861598683a9441c8e07be442e4e344d~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： root = [1,null,2,3]
输出： [1,2,3]
```

**示例 2：**

```
输入： root = []
输出： []
```

**示例 3：**

```
输入： root = [1]
输出： [1]
```

**示例 4：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3f50a18ceb3479b9d70958344368059~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： root = [1,2]
输出： [1,2]
```

**示例 5：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e80b145022d545f189f7d4da856cc096~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： root = [1,null,2]
输出： [1,2]
```

**提示：**

-   树中节点数目在范围 `[0, 100]` 内
-   `-100 <= Node.val <= 100`

**进阶：** 递归算法很简单，你可以通过迭代算法完成吗？

## 1.2 解法一：递归

**树的先序遍历的过程：**

1.  优先访问**根节点**
2.  之后访问**左子树**
3.  最后访问**右子树**

这种递归地方法是一种很容易理解的方法，只要在访问左右子树之前将当前节点的值 `push` 到最终的 `ret` 数组中即可。

```ts
function preorderTraversal(root: TreeNode | null): number[] {
  let ret: number[] = [];
  function traversal(root: TreeNode | null) {
    if(!root) return
    root.val !== null && ret.push(root.val);
    traversal(root.left);
    traversal(root.right);
  }
  traversal(root);

  return ret;
}
```

**复杂度分析：**
- 时间复杂度：`O(n)`，其中 `n` 是二叉树的节点数。每一个节点恰好被遍历一次。
- 空间复杂度：`O(n)`，为递归过程中栈的开销，平均情况下为 `O(logn)`，最坏情况下树呈现链状，为 `O(n)`。

## 1.3 解法二：迭代

我们也可以用**迭代**的方式实现方法一的递归函数，两种方式是等价的，区别在于递归的时候隐式地维护了一个栈，而**我们在迭代的时候需要显式地将这个栈模拟出来**，其余的实现与细节都相同。


```ts
function preorderTraversal(root: TreeNode | null): number[] {
  let ret: number[] = [];

  if (!root) return [];
  let stack: TreeNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    if (node.val !== null) ret.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }

  return ret;
}
```

# 2. 二叉树的后序遍历

## 2.1 题目描述
给你一棵二叉树的根节点 `root` ，返回其节点值的 **后序遍历** 。

**示例 1：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b8b14edd95845498f67cef8e1ab85a8~tplv-k3u1fbpfcp-zoom-1.image)

```
输入： root = [1,null,2,3]
输出： [3,2,1]
```

**示例 2：**

```
输入： root = []
输出： []
```

**示例 3：**

```
输入： root = [1]
输出： [1]
```

**提示：**

-   树中节点的数目在范围 `[0, 100]` 内
-   `-100 <= Node.val <= 100`

**进阶：** 递归算法很简单，你可以通过迭代算法完成吗？

## 2.2 解法一：递归
**树的后序遍历的过程：**

1.  优先访问**左子树**
2.  之后访问**右子树**
3.  最后访问**根节点**

后续遍历递归的方法就是将遍历 `root.val` 的顺序放在了 **遍历左节点** 和 **遍历右节点** 之后

```ts
function postorderTraversal(root: TreeNode | null): number[] {
  let ret: number[] = [];
  function traversal(root: TreeNode | null) {
    if(!root) return
    traversal(root.left);
    traversal(root.right);
    root.val !== null && ret.push(root.val);
  }
  traversal(root);

  return ret;
}
```

复杂度分析：
- 时间复杂度：`O(n)`，其中 `n` 是二叉树的节点数。每一个节点恰好被遍历一次。
- 空间复杂度：`O(n)`，为递归过程中栈的开销，平均情况下为 `O(logn)`，最坏情况下树呈现链状，为 `O(n)`。


## 2.3 解法二：迭代

同样，我们也可以用迭代的方式实现方法一的递归函数，两种方式是等价的，区别在于递归的时候隐式地维护了一个栈，而我们在迭代的时候需要显式地将这个栈模拟出来，其余的实现与细节都相同。


```ts
function postorderTraversal(root: TreeNode | null): number[] {
  let ret: number[] = [];
  let stack: TreeNode[] = [];
  let current: TreeNode | null = root;
  let lastVisitedNode: TreeNode | null = null;
  while (stack.length || current !== null) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    current = stack[stack.length - 1];
    if (current.right === null || current.right === lastVisitedNode) {
      ret.push(current.val);
      lastVisitedNode = current;
      stack.pop();
      current = null;
    } else {
      current = current.right;
    }
  }

  return ret;
}
```

**复杂度分析：**
- 时间复杂度：`O(n)`，其中 `n` 是二叉树的节点数。每一个节点恰好被遍历一次。
- 空间复杂度：`O(n)`，为递归过程中栈的开销，平均情况下为 `O(logn)`，最坏情况下树呈现链状，为 `O(n)`。