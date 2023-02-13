// Definition for a binary tree node.
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function preorderTraversal(root: TreeNode | null): number[] {
  let ret: number[] = [];
  function traversal(root: TreeNode | null) {
    if(!root) return
    root.val !== null && ret.push(root.val);
    traversal(root.left);
    traversal(root.right);
  }
  traversal(root);

  return ret;
}

export {}
