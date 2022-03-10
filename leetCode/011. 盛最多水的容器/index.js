/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  const length = height.length;
  let maxNum = 0;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      const area = (j - i) * Math.min(height[i], height[j]);
      maxNum = Math.max(area, maxNum);
    }
  }
  return maxNum
};
