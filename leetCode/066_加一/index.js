/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  const length = digits.length
  for(let i = length - 1; i >= 0; i--) {
    if(digits[i] !== 9) {
      ++digits[i]
      return digits
    } else {
      digits[i] = 0
      if(i === 0) {
        return [1, ...digits]
      }
    }
  }
};

console.log(plusOne([9]))