/**
 * @param {number[]} cont
 * @return {number[]}
 made by yjw

 */
var fraction = function (cont) {
  if (cont.length === 1) return [cont[0], 1];

  const rec = (n) => {
    let numerator, denominator;
    if (n === cont.length - 1) {
      numerator = cont[n - 1] * cont[n] + 1;
      denominator = cont[n];
      return [denominator, numerator];
    }

    [numerator, denominator] = rec(n + 1);
    numerator = cont[n - 1] * denominator + numerator;

    return [denominator, numerator];
  };
  const [numerator, denominator] = rec(1);
  return [denominator, numerator];
};
