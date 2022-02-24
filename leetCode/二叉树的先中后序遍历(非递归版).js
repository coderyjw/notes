const bt = {
  val: "a",
  left: {
    val: "b",
    left: {
      val: "d",
      left: null,
      right: null,
    },
    right: {
      val: "e",
      left: null,
      right: null,
    },
  },
  right: {
    val: "c",
    left: {
      val: "f",
      left: null,
      right: null,
    },
    right: {
      val: "g",
      left: null,
      right: null,
    },
  },
};

const preorder = function (tree) {
  if (!tree) return;
  const stack = [tree];
  while (stack.length) {
    const node = stack.pop();
    console.log(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
};
console.log("----------preorder先序遍历---------");
preorder(bt); // a b d e c f g

const inorder = function (tree) {
  if (!tree) return;
  const stack = [];
  let p = tree;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const node = stack.pop();
    console.log(node.val);
    p = node.right;
  }
};
console.log("----------inorder中序遍历---------");
inorder(bt); // d b e a f c f

const postorder = function (tree) {
  const stack = [tree];
  const outputStack = [];
  while (stack.length) {
    const node = stack.pop();
    outputStack.push(node);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  while (outputStack.length) {
    const node = outputStack.pop();
    console.log(node.val);
  }
};

console.log("----------postorder后序遍历---------");
postorder(bt); // d e b f g c a
