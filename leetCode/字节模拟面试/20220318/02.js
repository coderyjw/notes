/**
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */
var numSmallerByFrequency = function (queries, words) {
  const ret = [];
  for (let i = 0; i < queries.length; i++) {
    let count = 0;
    for (let j = 0; j < words.length; j++) {
      if (f(queries[i]) < f(words[j])) count++;
    }
    ret.push(count);
  }
  return ret;
};

const f = (str) => {
  let n = 123;
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < n) {
      n = c;
      count = 1;
    } else if (c === n) {
      count++;
    }
  }
  return count;
};
