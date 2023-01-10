/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  //利用正则
  let result = str.trim().match(/^[-|+]{0,1}[0-9]+/);
  if (result != null) {
    if (result[0] > Math.pow(2, 31) - 1) {
      return Math.pow(2, 31) - 1;
    }
    if (result[0] < Math.pow(-2, 31)) {
      return Math.pow(-2, 31);
    }

    return result[0];
  }

  return 0;
};

console.log(myAtoi("4193 with words"));
console.log(myAtoi("words and 987"));
