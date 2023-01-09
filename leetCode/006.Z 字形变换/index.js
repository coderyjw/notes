/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows == 1) return s;
  const arr = Array.from(new Array(numRows), () => new Array());
  let num = 0;
  const len = s.length;
  let i = 0,
    j = 0;
  let type = "add";

  while (num <= len) {
    arr[i][j] = s[num++];

    if (i === numRows - 1) type = "sub";
    else if (i === 0) type = "add";

    if (i === numRows - 1 || (i !== 0 && !arr[i - 1][j])) j++;

    if (type === "add") i++;
    else i--;
  }

  let ret = "";
  for (let i = 0; i < arr.length; i++) {
    for (j = 0; j < arr[i].length; j++) {
      if (arr[i][j]) ret += arr[i][j];
    }
  }

  return ret;
};
