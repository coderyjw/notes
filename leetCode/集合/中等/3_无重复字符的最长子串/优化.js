/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let l = 0,
    res = 0;
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      l = Math.max(l, map.get(s[i]) + 1);
    }
    map.set(s[i], i);
    res = Math.max(res, i - l + 1);
  }
  return res;
};

lengthOfLongestSubstring("abcabcbb");
