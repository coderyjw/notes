/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * "abc" "ahbgdc"
 * "axc" "ahbgdc"
 */

var isSubsequence = function (s, t) {
  const l = t.length;
  const n = s.length;
  const dp = new Array(l + 1);
  for (let i = 0; i <= l; i++) {
    dp[i] = new Array(26).fill(l);
  }

  for (let i = l - 1; i >= 0; i--) {
    for (let j = 0; j < 26; j++) {
      if (t[i].charCodeAt() === j + 97) {
        dp[i][j] = i;
      } else {
        dp[i][j] = dp[i + 1][j];
      }
    }
  }
  let add = 0;
  for (let i = 0; i < n; i++) {
    if (dp[add][s.charCodeAt(i) - 97] === l) {
      return false;
    }
    add = dp[add][s.charCodeAt(i) - 97] + 1;
  }
  return true;
};
