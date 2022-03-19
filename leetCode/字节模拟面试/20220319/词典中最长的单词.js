/**
 * @param {string[]} words
 * @return {string}
 * made by yjw
 */
var longestWord = function (words) {
  const set = new Set();
  let maxStr = "";

  const helper = (str) => {
    if (set.has(str)) return true;

    if (str.length === 1) {
      if (words.includes(str)) {
        set.add(str);
        return true;
      } else {
        return false;
      }
    }

    const str1 = str.slice(0, -1);
    if (!words.includes(str1)) {
      return false;
    } else {
      if (helper(str1)) {
        set.add(str);
        return true;
      } else {
        return false;
      }
    }
  };

  const judgeSmaller = (str1, str2) => {
    if (str1.length < str2.length) {
      str1 = str2;
    } else if (str1.length == str2.length) {
      for (let i = 0; i < str1.length; i++) {
        const c1 = str1.charCodeAt(i);
        const c2 = str2.charCodeAt(i);
        if (c1 > c2) {
          str1 = str2;
          break;
        } else if (c1 < c2) {
          break;
        }
      }
    }
    return str1;
  };

  words.forEach((n) => {
    if (helper(n)) {
      maxStr = judgeSmaller(maxStr, n);
    }
  });

  return maxStr;
};
