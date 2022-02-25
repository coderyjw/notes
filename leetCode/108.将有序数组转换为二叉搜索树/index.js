/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// var sortedArrayToBST = function(nums) {
  
//   if(!nums.length) {
//     return null
//   }
//   const mid = nums.length >> 1

//   return new TreeNode(
//     nums[mid],
//     sortedArrayToBST(nums.slice(0, mid)),
//     sortedArrayToBST(nums.slice(mid + 1))
//   )
// };

var sortedArrayToBST = function(nums) {
  
  if(!nums.length) {
    return null
  }
  const mid = nums.length >> 1

  return new TreeNode(
    nums[mid],
    sortedArrayToBST(nums.slice(0, mid)),
    sortedArrayToBST(nums.slice(mid + 1))
  )
};