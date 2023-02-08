class Graph<T> {
  verteces: T[] = [];
  adjList: Map<T, T[]> = new Map();

  constructor() {}

  /* 添加顶点的方法 */
  addVertex(vertex: T) {
    // 将顶点添加数组中保存
    this.verteces.push(vertex);
    // 创建一个邻接表中的数组
    this.adjList.set(vertex, []);
  }

  /* 添加边的方法 */
  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2);
    this.adjList.get(v2)?.push(v1);
  }

  traverse() {
    this.verteces.forEach((vertex) => {
      const edges = this.adjList.get(vertex);

      console.log(`${vertex} -> ${edges?.join(" ")}`);
    });
  }

  dfs() {
    // 1. 判断是否有顶点
    if (this.verteces.length === 0) return;

    // 2. 创建队列结构访问每一个顶点
    const stack: T[] = [];
    stack.push(this.verteces[0]);

    // 3. 创建 Set 结构，记录某一个顶点是否被访问过
    const visited = new Set<T>();
    visited.add(this.verteces[0]);

    // 4. 从第一个顶点开始访问
    while (stack.length) {
      const vertex = stack.pop()!;
      console.log(vertex);

      const neighbors = this.adjList.get(vertex);
      if (!neighbors) continue;
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const nei = neighbors[i];
        if (!visited.has(nei)) {
          visited.add(nei);
          stack.push(nei);
        }
      }
    }
  }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "D");
graph.addEdge("B", "B");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("C", "D");
graph.addEdge("F", "A");

graph.traverse();
graph.dfs();
export {};
