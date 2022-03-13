var countBits = function (n) {
  const bits = [0];
  let highBit = 0;
  for (let i = 1; i <= n; i++) {
    if ((i & (i - 1)) === 0) {
      highBit = i;
    }
    bits[i] = bits[i - highBit] + 1;
  }
  return bits;
};
