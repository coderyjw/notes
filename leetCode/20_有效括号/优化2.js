var isValid = function (s) {
  const l = s.length;
  if (l % 2 === 1) return false;
  const stack = [];
  const map = new Map();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  for (let i = 0; i < l; i++) {
    if (map.has(s[i])) stack.push(s[i]);
    else if (!map.has(s[i]) && s[i] !== map.get(stack.pop())) return false;
  }
  return stack.length === 0;
};

console.log(isValid("()[]{}"));
