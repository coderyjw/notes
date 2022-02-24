/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (["(", "[", "{"].includes(s[i])) {
      stack.push(s[i]);
    } else if (s[i] === ")") {
      if (stack.pop() !== "(") return false;
    } else if (s[i] === "]") {
      if (stack.pop() !== "[") return false;
    } else if (s[i] === "}") {
      if (stack.pop() !== "{") return false;
    }
  }
  return stack.length === 0;
};

console.log(isValid("()[]{}"));
