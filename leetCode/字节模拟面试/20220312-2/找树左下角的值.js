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
 made by yjw
 */
var findBottomLeftValue = function (root) {
  const queue = [root];
  let result = root.val;
  while (queue.length) {
    const node = queue.shift();
    if (node.right) {
      queue.push(node.right);
      result = node.right.val;
    }
    if (node.left) {
      queue.push(node.left);
      result = node.left.val;
    }
  }

  return result;
};
