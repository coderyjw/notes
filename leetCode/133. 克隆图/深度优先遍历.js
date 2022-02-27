/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  const visited = new Map();
  const dfs = function (n) {
    if (!n) return new Node();
    const newNode = new Node(n.val);
    visited.set(n, newNode);
    (n.neighbors || []).forEach((c) => {
      if (!visited.has(c)) {
        dfs(c);
      }
      newNode.neighbors.push(visited.get(c));
    });
  };
  dfs(node);
  return visited.get(node);
};
