# 1. 题目

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明**:  叶子节点是指没有子节点的节点。

**示例：**
给定二叉树 [3,9,20,null,null,15,7]，

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度  3 。

# 2.解：广度优先遍历

**思路：**

1. 新建一个变量 num，记录最大深度
2. 深度遍历整颗树，记录每个节点的层级，并不断刷新最大深度
3. 遍历结束，返回最大深度的变量

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  let num = 0;
  const dfs = (root, l) => {
    if (!root) return;
    // 判断是否是叶子节点
    if (!root.left && !root.right) {
      num = Math.max(num, l + 1);
    }
    dfs(root.left, l + 1);
    dfs(root.right, l + 1);
  };
  dfs(root, num);
  return num;
};
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c98b15e3d8848bfbd5bd973041a45f8~tplv-k3u1fbpfcp-watermark.image?)

**复杂度分析**

- 时间复杂度：O(n)，其中  nn  为二叉树节点的个数。每个节点在递归中只被遍历一次。
- 空间复杂度：O(height) 其中  \textit{height}height  表示二叉树的高度。递归函数需要栈空间，而栈空间取决于递归的深度，因此空间复杂度等价于二叉树的高度。
