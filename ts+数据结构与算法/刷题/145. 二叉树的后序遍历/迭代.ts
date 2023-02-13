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

function postorderTraversal(root: TreeNode | null): number[] {
  let ret: number[] = [];
  let stack: TreeNode[] = [];
  let current: TreeNode | null = root;
  // let lastVisitedNode: TreeNode | null = null;
  while (stack.length || current !== null) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    current = stack[stack.length - 1];
    // if (current.right === null || current.right === lastVisitedNode) {
    if (current.right === null) {
      ret.push(current.val);
      // lastVisitedNode = current;
      stack.pop();
      current = null;
    } else {
      current = current.right;
    }
  }

  return ret;
}

// const treeNode = new TreeNode(3, new TreeNode(1), new TreeNode(2));
const treeNode = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));

console.log(postorderTraversal(treeNode), treeNode);
export {};
