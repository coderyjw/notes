/**
 * @param {number[][]} triangle
 * @return {number}
 made by yjw
 */
var minimumTotal = function (triangle) {
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      if (j === 0) {
        triangle[i][j] += triangle[i - 1][j];
      } else if (j === triangle[i].length - 1) {
        triangle[i][j] += triangle[i - 1][j - 1];
      } else {
        triangle[i][j] += Math.min(triangle[i - 1][j], triangle[i - 1][j - 1]);
      }
    }
  }
  triangle[triangle.length - 1].sort((prev, next) => prev - next);
  return triangle[triangle.length - 1][0];
};
