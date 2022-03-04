/**
 * 归并排序：一种典型的分而治之思想的算法
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n).
 * 是否稳定： 是
 * @param {number[]} nums
 * @returns {number[]}
 */
function mergeSort(nums) {
  const result = [];

  if (nums.length < 2) {
    return nums;
  }
  const mid = nums.length >> 1;
  const leftArr = mergeSort(nums.slice(0, mid));
  const rightArr = mergeSort(nums.slice(mid));

  let leftIndex = (rightIndex = 0);
  const leftLength = leftArr.length;
  const rightLength = rightArr.length;

  while (leftIndex < leftLength && rightIndex < rightLength) {
    if (leftArr[leftIndex] <= rightArr[rightIndex]) {
      result[leftIndex + rightIndex] = leftArr[leftIndex++];
    } else {
      result[leftIndex + rightIndex] = rightArr[rightIndex++];
    }
  }

  while (leftIndex < leftLength) {
    result[leftIndex + rightIndex] = leftArr[leftIndex++];
  }

  while (rightIndex < rightLength) {
    result[leftIndex + rightIndex] = rightArr[rightIndex++];
  }
  return result;
}

Array.prototype.mergeSort = function () {
  const merge = function (lists) {
    if (lists.length < 2) return lists;
    const mid = lists.length >> 1;
    const left = merge(lists.slice(0, mid));
    const right = merge(lists.slice(mid));
    const result = [];
    let leftIndex = (rightIndex = 0);
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result[leftIndex + rightIndex] = left[leftIndex++];
      } else {
        result[leftIndex + rightIndex] = right[rightIndex++];
      }
    }
    while (leftIndex < left.length) {
      result[leftIndex + rightIndex] = left[leftIndex++];
    }
    while (rightIndex < right.length) {
      result[leftIndex + rightIndex] = right[rightIndex++];
    }
    return result;
  };
  const res = merge(this);
  res.forEach((n, i) => (this[i] = n));
};
let arr = [3, 5, 7, 8, 6, 2, 1, 9, 0, 4];
arr.mergeSort();
// arr = mergeSort(arr)
console.log(arr);
