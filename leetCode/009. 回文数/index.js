/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  x = x.toString();
  for (let i = 0, j = x.length - 1; i <= j; i++, j--) {
    if (x[i] !== x[j]) return false;
  }
  return true;
};

console.log(isPalindrome(-121));
console.log(isPalindrome(121));
