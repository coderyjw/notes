var maxEnvelopes = function (envelopes) {
  if (envelopes.length === 0) {
    return 0;
  }

  const n = envelopes.length;
  // 第一位升序 第二位降序
  envelopes.sort((e1, e2) => {
    if (e1[0] - e2[0]) {
      return e1[0] - e2[0];
    } else {
      return e2[1] - e1[1];
    }
  });

  
  const f = [envelopes[0][1]];
  // 遍历数组 可得到envelopes[i][1] > f[f.length - 1]时 envelopes[i][0] 必定大于0 envelopes[i - 1][0]
  for (let i = 1; i < n; ++i) {
    const num = envelopes[i][1];
    if (num > f[f.length - 1]) {
      f.push(num);
    } else {
      const index = binarySearch(f, num);
      f[index] = num;
    }
  }
  return f.length;
};
// 二分查找替换位置
const binarySearch = (f, target) => {
  let low = 0,
    high = f.length - 1;
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low;
    if (f[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};
