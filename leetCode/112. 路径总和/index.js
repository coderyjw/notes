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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  let flag = false;
  const dfs = function (root, value) {
    if (!root) return;
    value += root.val;
    if (!root.left && !root.right && value === targetSum) flag = true;
    if (root.left) dfs(root.left, value);
    if (root.right) dfs(root.right, value);
  };
  dfs(root, 0);
  return flag;
};
