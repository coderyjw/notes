var judgeSquareSum = function (c) {
  for (let a = 0; a * a <= c; a++) {
    const b = Math.sqrt(c - a * a);
    if (b === parseInt(b)) {
      return true;
    }
  }
  return false;
};
