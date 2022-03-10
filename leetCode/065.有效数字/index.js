/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
  const graph = {
    0: { blank: 0, sign: 1, ".": 2, dight: 6 },
    1: { dight: 6, ".": 2 },
    2: { dight: 3 },
    3: { dight: 3, e: 4 },
    4: { dight: 5, sign: 7 },
    5: { dight: 5 },
    6: { dight: 6, ".": 3, e: 4 },
    7: { dight: 5 },
  };

  let state = 0;
  for (let c of s.trim()) {
    if (c >= "0" && c <= "9") {
      c = "dight";
    } else if (c == "+" || c == "-") {
      c = "sign";
    } else if (c == " ") {
      c = "blank";
    } else if (c == "e" || c == "E") {
      c = "e";
    }
    state = graph[state][c];
    if (state === undefined) return false;
  }
  if ([3, 5, 6].includes(state)) return true;
  else return false;
};
