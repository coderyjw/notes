/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const str1 = s
    .split("")
    .sort((x, y) => x.charCodeAt() - y.charCodeAt())
    .join("");
  const str2 = t
    .split("")
    .sort((x, y) => x.charCodeAt() - y.charCodeAt())
    .join("");
  return str1 === str2;
};

console.log(isAnagram("anagram", "nagaram"));
