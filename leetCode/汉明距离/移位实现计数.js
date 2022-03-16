/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 made by yjw
 */
var hammingDistance = function (x, y) {
  let s = x ^ y; // 按位异或
  let ret = 0;
  while (s != 0) {
    ret += s & 1; // 按位与
    s >>= 1;
  }
  return ret;
};
