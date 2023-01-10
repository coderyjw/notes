/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  if (x == 0) return x;

  const flag = x > 0 ? true : false;
  let s = flag ? x.toString() : x.toString().slice(1);

  const arr = s.split("").reverse();
  const index = arr.findIndex((i) => i != 0);

  const ret = (flag ? "" : "-") + arr.slice(index).join("");

  if (Math.abs(parseInt(ret)) > Math.pow(2, 31) - 1) return 0;

  return ret;
};

console.log(reverse(123));
console.log(reverse(321));
console.log(reverse(120));
console.log(reverse(0));
console.log(reverse(90100));
console.log(reverse(1534236469));
console.log(Math.pow(2, 31) - 1);
