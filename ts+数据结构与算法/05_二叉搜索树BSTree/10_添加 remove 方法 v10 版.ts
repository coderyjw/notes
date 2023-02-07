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

  search(value: T): boolean {
    let current = this.root;
    while (current) {
      // 找到了节点
      if (current.value === value) return true;

      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }

    return false;
  }

  remove(value: T): boolean {
    // 1. 获取要删除的节点 current 和 其父节点 parent
    let current = this.root;
    let parent: TreeNode<T> | null = null;
    while (current) {
      // 找到了节点
      if (current.value === value) break;

      parent = current;

      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    // 如果没有找到要删除的节点返回 false
    if (!current) return false;

    // 2.  如果要删除的的节点是叶子结点
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        // current 是根节点
        this.root = null;
      } else if (parent?.left === current) {
        // current 在父节点的左边
        parent!.left = null;
      } else {
        // current 在父节点的右边
        parent!.right = null;
      }
    }

    // 3. 如果要删除的的节点只有一个左子节点
    else if (current.right === null) {
      if (current === this.root) {
        this.root = current.left;
      } else if (parent?.left === current) {
        // current 在父节点的左边
        parent!.left = current.left;
      } else {
        parent!.right = current.left;
      }
    }

    // 4. 如果要删除的的节点只有一个右子节点
    else if (current.left === null) {
      if (current === this.root) {
        this.root = current.right;
      } else if (parent?.left === current) {
        // current 在父节点的左边
        parent!.left = current.right;
      } else {
        parent!.right = current.right;
      }
    }

    // 5. 如果要删除的的节点有两个子节点
    else {
      const successor = this.getSuccessor(current);
      if (current === this.root) {
        this.root = successor;
      } else if (parent?.left === current) {
        parent!.left = successor;
      } else {
        parent!.right = successor;
      }
    }
    return true;
  }

  // 获取后继节点
  private getSuccessor(delNode: TreeNode<T>): TreeNode<T> {
    // 获取右子树
    let current = delNode.right;
    let successor: TreeNode<T> | null = null;
    while (current) {
      successor = current;
      current = current.left;
    }

    // 拿到了后继节点
    if (successor !== delNode.right) {
      delNode!.right!.left = successor?.right ?? null;
      successor!.right = delNode.right;
    }

    // 一定要进行的操作：将删除几点的 left 赋值给后继节点的 left
    successor!.left = delNode.left;

    return successor!;
  }
}

const bst = new BSTree<number>();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(9);
bst.insert(13);
bst.insert(20);
bst.insert(3);
bst.insert(8);
bst.insert(10);
bst.insert(12);
bst.insert(14);
bst.insert(18);
bst.insert(25);
bst.insert(19);

btPrint(bst.root);
bst.remove(14);

btPrint(bst.root);
// bst.remove(14);
// btPrint(bst.root);
// console.log(bst.getMaxValue());
// console.log(bst.getMinValue());
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
