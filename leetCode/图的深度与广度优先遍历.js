// 深度优先遍历口诀
// - 访问根节点
// - 对根节点的没有访问过的相邻节点挨个进行深度优先遍历

const graph = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3],
};

const visited = new Set();

const dfs = function (n) {
  console.log(n);
  visited.add(n);
  graph[n].forEach((c) => {
    if (!visited.has(c)) {
      dfs(c);
    }
  });
};

console.log("----------图的深度优先遍历----------");

dfs(2);

console.log("----------图的广度优先遍历----------");

/* 
  图的广度优先遍历口诀
  1. 新建一个队列，把根节点入队
  2. 把队头出队并访问
  3. 把队头的没访问过的相邻节点入队
  4. 重复第二、三不，知道队列为空
*/

const bfs = function (n) {
  const visited = new Set();
  visited.add(n);
  const q = [n];
  while (q.length) {
    const node = q.shift();
    console.log(node);
    graph[node].forEach((c) => {
      if (!visited.has(c)) {
        visited.add(c);
        q.push(c);
      }
    });
  }
};

bfs(2);
