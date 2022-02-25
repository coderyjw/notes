// 深度优先遍历： 尽可能深的搜索树的分支
// 广度优先遍历： 先访问离根节点最近的节点

const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        {
          val: "d",
          children: [],
        },
        {
          val: "e",
          children: [],
        },
      ],
    },
    {
      val: "c",
      children: [
        {
          val: "f",
          children: [],
        },
        {
          val: "g",
          children: [],
        },
      ],
    },
  ],
};

// 口诀： 1.先访问根节点 2.对根节点的children挨个进行深度优先遍历
const dfs = function (tree) {
  console.log(tree.val);
  tree.children.forEach(dfs);
};

console.log("-------对tree进行深度优先遍历---------");
dfs(tree);

/* 
  口诀
  1. 新建一个队列，把根节点入队
  2. 把队头出队并访问
  3. 把队头的children挨个入队
  4. 重复第二、三步，直到队列为空
*/
const bfs = function (tree) {
  const queue = [];
  queue.push(tree);
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node.val);
    node.children.forEach((child) => {
      queue.push(child);
    });
  }
};
console.log("-------对tree进行广度优先遍历---------");
bfs(tree);
