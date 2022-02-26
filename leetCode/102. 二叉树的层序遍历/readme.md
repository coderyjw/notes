# 1.题目

给你二叉树的根节点  `root` ，返回其节点值的  **层序遍历** 。 （即逐层地，从左到右访问所有节点）。



**示例 1：**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35c6807a1d5e4cbb88ebfc58ad197637~tplv-k3u1fbpfcp-watermark.image?)

```
输入： root = [3,9,20,null,null,15,7]
输出： [[3],[9,20],[15,7]]
```

**示例 2：**

```
输入：root = [1]
输出：[[1]]
```

**示例 3：**

```
输入：root = []
输出：[]
```

**提示：**

- 树中节点数目在范围 [0, 2000] 内
- -1000 <= Node.val <= 1000

# 2. 解：广度优先遍历

思路：

- 使用广度优先遍历
- 在遍历的过程中，记录每个节点层级，并将其添加到不同的数组中取

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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const queue = [[root, 0]];
  const result = [];
  while (queue.length) {
    const [node, depth] = queue.shift();
    result[depth] ? result[depth].push(node.val) : result.push([node.val]);
    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }
  return result;
};
```

**优化：**
在广度优先遍历中，我们可以发现，我们在不断把老的节点出队，新的节点入队。如果我们可以在每次 while 循环的迭代里把所有老的节点出队再将他们的孩子节点入队，就可以保证每次 while 循环进来的时候都是同一层节点了。这样就可以不用为每个节点记录层级了。

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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const queue = [root];
  const result = [];
  while (queue.length) {
    result.push([]);
    let len = queue.length;
    while (len--) {
      const node = queue.shift();
      result[result.length - 1].push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
};
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86943ff194a548b0987559d8bcf958e2~tplv-k3u1fbpfcp-watermark.image?)

复杂度分析：

- 时间复杂度：O(n)，每个点进队出队各一次，故渐进时间复杂度为 O(n)。
- 空间复杂度： O(n)，队列中元素的个数不超过  nn  个，故渐进空间复杂度为 O(n)。
