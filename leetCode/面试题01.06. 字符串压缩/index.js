/**
 * @param {string} S
 * @return {string}
 */
var compressString = function(S) {
  let result = ''
  let indexStr = ''
  let count = 0
  const len = S.length
  for(let i = 0; i < len; i++) {
    if(indexStr === S[i]) {
      count++
    } else {
      if(count) {
        result = result + indexStr + count
      }
      indexStr = S[i]
      count = 1
    }
  }
  result += indexStr + count
  return result.length >= len ? S : result
};

console.log(compressString('aabcccccaaa'));