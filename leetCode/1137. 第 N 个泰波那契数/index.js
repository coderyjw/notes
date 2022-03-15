/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  let a = 0,
    b = 1,
    c = 1,
    r;
  for (let i = 3; i <= n; i++) {
    r = a + b + c;
    a = b;
    b = c;
    c = r;
  }
  return r;
};
