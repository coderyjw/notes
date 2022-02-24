/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const l = s.length;
  if (l % 2 === 1) return false;
  const stack = [];
  for (let i = 0; i < l; i++) {
    const c = s[i];
    if (["(", "[", "{"].includes(c)) {
      stack.push(s[i]);
    } else if (c === ")") {
      if (stack.pop() !== "(") return false;
    } else if (c === "]") {
      if (stack.pop() !== "[") return false;
    } else if (c === "}") {
      if (stack.pop() !== "{") return false;
    }
  }
  return stack.length === 0;
};

console.log(isValid("()[]{}"));
