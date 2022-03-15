/**
 * @param {string} s
 * @return {string}
 * babad cbdd
 */
 var longestPalindrome = function (s) {
  const len = s.length;
  if (len < 2) return s;

  let begin = 0;
  let maxLen = 1;
  const dp = [];
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len);
    dp[i][i] = true;
  }

  for (let j = 1; j <= len; j++) {
    for (let i = 0; i < j; i++) {
      if(s[i] !== s[j]){
        dp[i][j] = false
      } else {
        if(j - i < 3) {
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i+1][j-1]
        }
      }
      if(dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1
        begin = i
      }
    }
  }
  return s.slice(begin, begin + maxLen);
};
