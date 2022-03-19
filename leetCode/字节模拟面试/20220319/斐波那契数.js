/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 0) return 0;
  let p = 0,
    q = 1,
    r = 1;
  for (let i = 2; i <= n; i++) {
    r = p + q;
    p = q;
    q = r;
  }
  return r;
};
