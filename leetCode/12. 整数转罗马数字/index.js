/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
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

  let ret = "";
  while (num > 0) {
    let index = arr.findIndex((i) => i.value <= num);
    index = index > 0 ? index : 0;
    num = num - arr[index].value;
    ret += arr[index].key;
  }
  return ret;
};

console.log(intToRoman(3));
console.log(intToRoman(4));
console.log(intToRoman(9));
console.log(intToRoman(1994));
