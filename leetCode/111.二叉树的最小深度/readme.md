# 1.题目

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明：** 叶子节点是指没有子节点的节点。



**示例 1：**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/431020acc2de4089b238bc81ae3c2727~tplv-k3u1fbpfcp-watermark.image?)

```
输入：root = [3,9,20,null,null,15,7]
输出：2
```

**示例 2：**

```
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
```

**提示：**

- 树中节点数的范围在 [0, 10<sup>5</sup>] 内
- -1000 <= Node.val <= 1000

# 2.解一:深度优先遍历

**思路：**

1. 定义一个变量 num=10<sup>5</sup>记录最小深度
2. 对树进行深度遍历，不断刷新最小深度
3. 遍历结束，返回 num

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
var minDepth = function (root) {
  let num = 100000;
  const dfs = (root) => {
    if (!root) return;
    // 当节点为叶子节点时返回最小深度
    if (!root.left && !root.right) {
      num = Math.min(l, num);
    }
    dfs(root.left);
    dfs(root.right);
  };
  return num;
};
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8c33490c96e4833ad2c92207b6222fc~tplv-k3u1fbpfcp-watermark.image?)

**复杂度分析**

- 时间复杂度：O(N)，其中  NN  是树的节点数。对每个节点访问一次。
- 空间复杂度: O(H)，其中 HH 是树的高度。空间复杂度主要取决于递归时栈空间的开销，最坏情况下，树呈现链状，空间复杂度为 O(N)。平均情况下树的高度与节点数的对数正相关，空间复杂度为 O(logN)。

# 解二: 广度优先遍历

**思路：**

1. 在广度优先遍历中，遇到叶子节点就停止遍历
2. 返回叶子节点的层级

```
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
 var minDepth = function (root) {
  if (!root) return 0;
    // 建立一个队列存放当前当前节点以及该节点所属的层级
    const queue = [[root, 1]];
    while (queue.length) {
      const [node, l] = queue.shift();

      if (!node.left && !node.right) return l;
      if (node.left) queue.push([node.left, l + 1]);
      if (node.right) queue.push([node.right, l + 1]);
    }

};

```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ccc34eaf9834557a1f3f672f072dda4~tplv-k3u1fbpfcp-watermark.image?)
**复杂度分析**

- 时间复杂度：O(N)O(N)，其中 NN 是树的节点数。对每个节点访问一次。

- 空间复杂度：O(N)O(N)，其中 NN 是树的节点数。空间复杂度主要取决于队列的开销，队列中的元素个数不会超过树的节点数。
