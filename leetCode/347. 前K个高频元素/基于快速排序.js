/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  nums.sort((prev, next) => prev - next);
  const map = [];
  for (let i of nums) {
    const item = map.find((v) => v.key === i);
    if (item) {
      item.value++;
    } else {
      map.push({
        value: 1,
        key: i,
      });
    }
  }
  map.sort((prev, next) => next.value - prev.value);
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(map[i].key);
  }
  return result;
};
