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

  if (!root) return [];
  let stack: TreeNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    if (node.val !== null) ret.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }

  return ret;
}

const treeNode = new TreeNode(3, new TreeNode(1), new TreeNode(2));

console.log(preorderTraversal(treeNode),treeNode);
export {};
