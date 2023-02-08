import { btPrint } from "hy-algokit";

class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class BSTree<T> {
  root: TreeNode<T> | null = null;

  insert(value: T) {
    // 1. 根据传入 value 创建 TreeNode 节点
    const newNode = new TreeNode(value);

    // 2. 判断当前是否已经有了根节点
    if (!this.root) {
      // 当前树为空
      this.root = newNode;
    } else {
      // 树中已经有其他值
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      // 去左边查找空白位置
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // 去右边查找空白位置
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }

  private preOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value);
      this.preOrderTraverseNode(node.left);
      this.preOrderTraverseNode(node.right);
    }
  }

  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }

  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left);
      console.log(node.value);
      this.inOrderTraverseNode(node.right);
    }
  }

  postOrderTraverse() {
    let stack: TreeNode<T>[] = [];
    let current: TreeNode<T> | null = this.root;
    let lastVisitedNode: TreeNode<T> | null = null;

    while (current !== null || stack.length !== 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }

      current = stack[stack.length - 1];
      if (current.right === null || current.right === lastVisitedNode) {
        console.log(current.value);
        lastVisitedNode = current;
        stack.pop();
        current = null;
      } else {
        current = current.right;
      }
    }
  }
}

const bst = new BSTree<number>();

bst.insert(20);
bst.insert(30);
bst.insert(18);
bst.insert(14);
bst.insert(12);
bst.insert(19);
bst.insert(22);

bst.postOrderTraverse();
//                20
//         ┌───────┴───────┐
//        18              30
//     ┌───┴───┐       ┌───┘
//    14      19      22
//   ┌─┘
//  12

export {};
