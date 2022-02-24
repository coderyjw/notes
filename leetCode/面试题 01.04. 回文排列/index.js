/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function(s) {
  const arr = {}
  for(let i = 0; i < s.length; i++) {
    arr[s[i]] = arr[s[i]] === undefined ?  1 : arr[s[i]] + 1
  }

  let j = 0
  for(let key in arr) {
    if(arr[key] % 2 !== 0) {
      j++
    }
  }
  if(j > 1) {
    return false
  }
  return true
};

console.log(canPermutePalindrome('tactcoa'));