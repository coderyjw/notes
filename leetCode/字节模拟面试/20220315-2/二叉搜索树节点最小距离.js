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
var minDiffInBST = function (root) {
  let miniDiff = 100000;
  const arr = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    arr.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  arr.sort((prev, next) => prev - next);
  for (let i = 1; i < arr.length; i++) {
    miniDiff = Math.min(Math.abs(arr[i - 1] - arr[i]), miniDiff);
  }
  return miniDiff;
};
