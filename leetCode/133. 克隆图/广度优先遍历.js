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
  if (!node?.val) return new Node();

  const visited = new Map();
  const queue = [node];

  visited.set(node, new Node(node.val));
  while (queue.length) {
    const n = queue.shift();
    n.neighbors.forEach((c) => {
      if (!visited.has(c)) {
        queue.push(c);
        visited.set(c, new Node(c.val));
      }
      visited.get(n).neighbors.push(visited.get(c));
    });
  }

  return visited.get(node);
};
