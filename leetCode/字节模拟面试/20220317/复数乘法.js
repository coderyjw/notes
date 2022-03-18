/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 made by yjw
 */
var complexNumberMultiply = function (num1, num2) {
  const [n1, m1] = num1
    .slice(0, -1)
    .split("+")
    .map((i) => parseInt(i));
  const [n2, m2] = num2
    .slice(0, -1)
    .split("+")
    .map((i) => parseInt(i));
  const r1 = n1 * n2 + m1 * m2 * -1;
  const r2 = n1 * m2 + n2 * m1;
  return `${r1}+${r2}i`;
};
