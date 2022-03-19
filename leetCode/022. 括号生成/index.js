/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = [];
  const backtrack = (s, p, q) => {
    // console.log(s)
    if (p === n && q == n) {
      if (isValid(s, n)) result.push(s);
      return;
    }
    if (p < n) {
      backtrack(s + "(", p + 1, q);
    }
    if (q < n && q < p) {
      backtrack(s + ")", p, q + 1);
    }
  };
  backtrack("", 0, 0);
  return result;
};

const isValid = (s, n) => {
  const stack = [];
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(s[i]);
    } else if (s[i] === ")") {
      const c = stack.pop();
      if (c === "(") {
        count++;
      } else {
        break;
      }
    }
  }
  return count === n;
};
console.log(generateParenthesis(3));
