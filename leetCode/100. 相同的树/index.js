/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!q && !p) return true;
  if (
    q &&
    p &&
    q.val === p.val &&
    isSameTree(q.left, p.left) &&
    isSameTree(q.right, p.right)
  ) {
    return true;
  }
  return false;
};
