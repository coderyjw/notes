/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  if (!heights || !heights[0]) return [];
  const m = heights.length;
  const n = heights[0].length;
  const flow1 = Array.from({ length: m }, () => Array.from(n).fill(false));
  const flow2 = Array.from({ length: m }, () => Array.from(n).fill(false));

  const dfs = (r, c, flow) => {
    flow[r][c] = true;
    [
      [r - 1, c],
      [r + 1, c],
      [r, c + 1],
      [r, c - 1],
    ].forEach(([nr, nc]) => {
      if (
        nr >= 0 &&
        nr < m &&
        nc >= 0 &&
        nc < n &&
        !flow[nr][nc] &&
        heights[nr][nc] >= heights[r][c]
      ) {
        dfs(nr, nc, flow);
      }
    });
  };

  for (let i = 0; i < m; i++) {
    dfs(i, 0, flow1);
    dfs(i, n - 1, flow2);
  }
  for (let i = 0; i < n; i++) {
    dfs(0, i, flow1);
    dfs(m - 1, i, flow2);
  }
  const res = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (flow1[r][c] && flow2[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
};
