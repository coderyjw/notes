/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let l = 0,
    r = height.length - 1;
  let maxNum = 0;
  while (l < r) {
    const area = (r - l) * Math.min(height[r], height[l]);
    maxNum = Math.max(area, maxNum);
    if (height[l] <= height[r]) l++;
    else r--;
  }

  return maxNum;
};
