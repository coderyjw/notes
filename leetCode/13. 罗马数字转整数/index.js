/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const arr = [
    { key: "M", value: 1000 },
    { key: "CM", value: 900 },
    { key: "D", value: 500 },
    { key: "CD", value: 400 },
    { key: "C", value: 100 },
    { key: "XC", value: 90 },
    { key: "L", value: 50 },
    { key: "XL", value: 40 },
    { key: "X", value: 10 },
    { key: "IX", value: 9 },
    { key: "V", value: 5 },
    { key: "IV", value: 4 },
    { key: "I", value: 1 },
  ];

  let num = 0;

  for (let i = 0; i < s.length; i++) {
    arr.forEach((item) => {
      if (item.key === s.slice(i, i + 1)) {
        num += item.value;
        return;
      }

      if (item.key === s.slice(i, i + 2)) {
        num += item.value;
        i++;
      }
    });
  }

  return num;
};

console.log(romanToInt("MCMXCIV"));
console.log(romanToInt("III"));
