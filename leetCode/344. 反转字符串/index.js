/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 made by yjw
 */
var reverseString = function (s) {
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    const tmp = s[left];
    s[left] = s[right];
    s[right] = tmp;
    left++;
    right--;
  }
};
