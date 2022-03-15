/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const length = s.length;
  let start = (end = 0);
  if (length <= 1) return s;
  for (let i = 0; i < length; i++) {
    const len1 = expandAroundCenter(s, i, i);
    const len2 = expandAroundCenter(s, i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + len / 2;
    }
  }
  return s.slice(start, end + 1);
};

const fexpandAroundCenter = (s, left, right) => {
  let l = left,
    r = right;
  while (l >= 0 && r < s.length && s[l] == s[r]) {
    l--;
    r++;
  }
  return r - l - 1;
};
