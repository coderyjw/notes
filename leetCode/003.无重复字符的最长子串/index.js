/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let number = 0;
  let maxNumber = 0;
  const map = new Map();
  let l1 = 0,
    l2 = 0;
  while (l2++ < s.length) {
    if (!map.has(s[l2])) {
      number++;
      map.set(s[l2], l2);
    } else {
      const index = map.get(s[l2]) - l1;
      if (index >= 0) {
        number = number - index;
        l1 += index + 1;
      } else if (index < 0) {
        number++;
      }
      map.set(s[l2], l2);
    }
    maxNumber = Math.max(maxNumber, number);
  }
  return maxNumber;
};

lengthOfLongestSubstring("bbtablud");
