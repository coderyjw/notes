/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function (nums) {
  nums.sort(
    (pre, next) => parseInt(pre + "" + next) - parseInt(next + "" + pre)
  );
  return nums.join("");
};
