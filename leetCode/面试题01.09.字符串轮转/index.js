/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 var isFlipedString = function(s1, s2) {
  const len1 = s1.length
  const len2 = s2.length
  if(len1 !== len2) {
      return false
  }
  if(len1 === 0) {
    return true
  }
  for(let i = 0; i < len1; i++) {
    if(s1.slice(0, i) === s2.slice(len1 - i, len1) && s1.slice(i,len1) === s2.slice(0, len1 - i)) {
      return true
    }
  }
  return false
};

console.log(isFlipedString('waterbottle','erbottlewat'));
console.log('waterbottle'.slice(0, 3), 'erbottlewat'.slice(8,11));
console.log('waterbottle'.slice(3, 11), 'erbottlewat'.slice(0,3));


