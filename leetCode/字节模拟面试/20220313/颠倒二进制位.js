/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 made by yjw
 */
var reverseBits = function (n) {
  let result = 0;
  let binaryStr = "";
  while (n > 0) {
    binaryStr = (n % 2) + binaryStr;
    n = Math.floor(n / 2);
  }
  binaryStr = binaryStr.padStart(32, "0");
  for (let i = 0; i < binaryStr.length; i++) {
    result += Math.pow(2, i) * binaryStr[i];
  }
  return result;
};
