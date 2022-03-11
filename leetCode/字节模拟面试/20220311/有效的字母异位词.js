// /**
//  * @param {string} s
//  * @param {string} t
//  * @return {boolean}
//  * made by yjw
//  */
//  var isAnagram = function (s, t) {
//   if (s.length !== t.length) return false;
//   const sMap = new Map();
//   const tMap = new Map();
//   for (let i = 0; i < s.length; i++) {
//     sMap.set(s[i], sMap.get(s[i]) ? sMap.get(s[i]) + 1 : 1);
//   }
//   for (let i = 0; i < t.length; i++) {
//     tMap.set(t[i], tMap.get(t[i]) ? tMap.get(t[i]) + 1 : 1);
//   }
//   for(let i of sMap.entries()) {
//     if(tMap.get(i[0]) !== i[1]) return false
//   }
// };

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * made by yjw
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const dic = {};

  for (let i = 0; i < s.length; i++) {
    dic[s[i]] = dic[s[i]] ? dic[s[i]] + 1 : 1;
  }
  for (let i = 0; i < t.length; i++) {
    if (!dic[t[i]]) return false;
    dic[t[i]]--;
  }

  for (let key in dic) {
    if (dic[key] !== 0) return false;
  }
  return true;
};
