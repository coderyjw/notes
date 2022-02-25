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
  let num = 0
const dfs = (root, l) => {
  if (!root) return;
  if(!root.left && !root.right) {
      num = Math.max(num, l + 1)
  }
  dfs(root.left, l + 1);
  dfs(root.right, l + 1);
};
dfs(root, num)
return num
};
