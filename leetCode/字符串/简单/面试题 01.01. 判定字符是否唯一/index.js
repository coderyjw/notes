/**
 * @param {string} astr
 * @return {boolean}
 */
 var isUnique = function(astr) {
  const s = new Set(astr.split(''))
  if(s.size < astr.length) {
    return false
  }
  return true
};

console.log(isUnique('leetcode'));