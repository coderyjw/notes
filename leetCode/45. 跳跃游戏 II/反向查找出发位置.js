/**
 * @param {number[]} nums
 * @return {number}
 * 3 1 1 3 1 1 4
 */
var jump = function (nums) {
  let position = nums.length - 1;
  let step = 0;
  while (position > 0) {
    for (let i = 0; i < position; i++) {
      if (i + nums[i] >= position) {
        step++;
        position = i;
        break;
      }
    }
  }
  return step;
};
