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
export {};
