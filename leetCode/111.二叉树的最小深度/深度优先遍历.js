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
 var minDepth = function(root) {
   let num = 100000
  const dfs = (root) => {
      if(!root) return
      if(!root.left && !root.right) {
        num = Math.min(l, num)
      }
      dfs(root.left)
      dfs(root.right)
  }
  return num
};