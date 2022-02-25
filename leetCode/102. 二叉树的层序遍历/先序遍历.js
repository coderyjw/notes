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
  const result = [];
  const inorder = function (root, deepth) {
    if (!root) return;
    result[deepth]
      ? result[deepth].push(root.val)
      : result.push([root.val]);

    if (root.left) inorder(root.left, deepth + 1);
    if (root.right) inorder(root.right, deepth + 1);
  };
  inorder(root, 0);
  return result;
};
