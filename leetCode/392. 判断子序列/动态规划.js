/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * "abc" "ahbgdc"
 */
var isSubsequence = function (s, t) {
  if (s === "") return true;
  let result = false;
  const dp = (i, str) => {
    const index = str.indexOf(s[i]);
    if (index === -1) return;
    if (i === s.length - 1) {
      result = true;
      return;
    }

    dp(i, str.slice(index + 1));
    dp(i + 1, str.slice(index + 1));
  };
  dp(0, t);
  return result;
};
