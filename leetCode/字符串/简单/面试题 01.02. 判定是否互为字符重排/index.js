/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 var CheckPermutation = function(s1, s2) {
  if(s1.length !== s2.length) {
    return false
  }
  const str1 = s1.split('').sort((pre,next) => pre.charCodeAt() - next.charCodeAt()).join()
  const str2 = s2.split('').sort((pre,next) => pre.charCodeAt() - next.charCodeAt()).join()
  if(str1 !== str2) {
    return false
  }

  return true
};

console.log(CheckPermutation("abc", "bca"));