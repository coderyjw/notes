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
  
    const queue = [[root, 1]];
    while (queue.length) {
      const [node, l] = queue.shift();

      if (!node.left && !node.right) return l;
      if (node.left) queue.push([node.left, l + 1]);
      if (node.right) queue.push([node.right, l + 1]);
    }

};
