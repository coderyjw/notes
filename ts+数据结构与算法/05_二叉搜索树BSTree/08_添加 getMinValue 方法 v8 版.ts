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
    this.postOrderTraverseNode(this.root);
  }

  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left);
      this.postOrderTraverseNode(node.right);
      console.log(node.value);
    }
  }

  levelOrderTraverse() {
    // 1. 如果没有根节点，那么不需要遍历
    if (!this.root) return;

    // 2. 创建队列结构
    const queue: TreeNode<T>[] = [];

    // 第一个节点是根节点
    queue.push(this.root);

    // 3. 遍历队列中所有的节点（依次出队）
    while (queue.length) {
      // 3.1 访问节点的过程
      const current = queue.shift()!;
      console.log(current.value);

      // 3.2 将左子节点放入到队列
      if (current.left) {
        queue.push(current.left);
      }

      // 3.3 将右子节点放入到队列
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  getMaxValue(): T | null {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }

    return current?.value ?? null;
  }

  getMinValue(): T | null {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }

    return current?.value ?? null;
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

console.log(bst.getMaxValue());
console.log(bst.getMinValue());
// bst.levelOrderTraverse();
// bst.postOrderTraverse();
//                20
//         ┌───────┴───────┐
//        18              30
//     ┌───┴───┐       ┌───┘
//    14      19      22
//   ┌─┘
//  12

export {};
