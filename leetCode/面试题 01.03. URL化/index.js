/**
 * @param {string} S
 * @param {number} length
 * @return {string}
 */
var replaceSpaces = function(S, length) {
  let result = ''
  for(let i = 0; i < S.length; i++) {
    if(S[i] === ' ' && i < length) {
      result += '%20'
    }else {
      result +=S[i]
    }
  }
  return result.trim()
};

console.log(replaceSpaces('Mr John Smith    ', 13));
console.log(replaceSpaces('     ', 5));