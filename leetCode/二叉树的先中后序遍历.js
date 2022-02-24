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

// 先序遍历 根 -> 左 -> 右
const preorder = function (tree) {
  if (!tree) return;
  console.log(tree.val);
  preorder(tree.left);
  preorder(tree.right);
};
console.log("----------preorder先序遍历---------");
preorder(bt); // a b d e c f g

// 中序  左 -> 中 -> 右
const inorder = function(tree) {
  if (!tree) return;
  inorder(tree.left);
  console.log(tree.val);
  inorder(tree.right);
}
console.log("----------inorder中序遍历---------");
inorder(bt); // d b e a f c f

// 后序  左 -> 右 -> 中
const postorder = function(tree) {
  if (!tree) return;
  postorder(tree.left);
  postorder(tree.right);
  console.log(tree.val);
}
console.log("----------inorder中序遍历---------");
postorder(bt); // d e b f g c a


