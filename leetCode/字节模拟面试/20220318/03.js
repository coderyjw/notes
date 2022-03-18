/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  let count = 0;
  if (s.length < t.length) return count;
  const backtrack = (str, i) => {
    if (str === t) count++;
    if (!t.includes(str) || str.length >= t.length || i >= s.length) return;
    backtrack(str, i + 1);
    backtrack(str + s[i], i + 1);
  };
  backtrack("", 0);
  return count;
};
