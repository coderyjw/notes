/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 1) return strs[0];
  if (strs.includes("")) return "";
  let ret = "";

  let s0 = strs[0];

  for (let i = 1; i <= s0.length; i++) {
    const flag = strs.find((str) => !str.startsWith(s0.slice(0, i)));
    if (flag) break;
    else ret += s0[i - 1];
  }

  return ret;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
console.log(longestCommonPrefix(["flower", "flower", "flower", "flower"]));
console.log(longestCommonPrefix(["abab", "aba", ""]));
