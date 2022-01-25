/**
 * @param {string} S
 * @param {number} length
 * @return {string}
 */
 var replaceSpaces = function(S, length) {
  S = S.slice(0,length)
  S = S.replace(/ /g,'%20');
  return S;
};



console.log(replaceSpaces('Mr John Smith    ', 13));
console.log(replaceSpaces('     ', 5));