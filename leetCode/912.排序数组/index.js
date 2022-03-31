/**
 * @param {number[]} nums
 * @return {number[]}
 made by yjw
 */
var sortArray = function (nums) {
  return nums.sort((prev, next) => prev - next);
};

// 冒泡
Array.prototype.bubbleSort = function () {
  const len = this.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        const tmp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = tmp;
      }
    }
  }
};

// 选择
Array.prototype.selectionSort = function () {
  const len = this.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      minIndex = this[minIndex] > this[j] ? j : minIndex;
    }
    if (minIndex != i) {
      const tmp = this[minIndex];
      this[minIndex] = this[i];
      this[i] = tmp;
    }
  }
};

// 插入
Array.prototype.inserttionSort = function () {
  let len = this.length;
  for (let i = 1; i < len; i++) {
    let j = i;
    let tmp = this[j];
    while (j > 0) {
      if (this[j - 1] > tmp) {
        this[j] = this[j - 1];
      } else {
        break;
      }
      j--;
    }
    this[j] = tmp;
  }
};

// 归并
Array.prototype.mergeSort = function () {
  const merge = function (list) {
    const len = list.length;
    if (len <= 1) return list;
    const mid = Math.floor(len / 2);
    const left = list.slcie(0, mid);
    const right = list.slcie(mid);
    let leftIndex = 0,
      rightIndex = 0;
    const result = [];
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
  const result = merge(this);
  result.forEach((n, i) => (this[i] = n));
};

// 快排
Array.prototype.quickSort = function () {
  const rec = function (list) {
    if (list <= 1) return list;
    const left = [];
    const right = [];
    const mid = list[0];
    for (let i = 1; i < list.length; i++) {
      if (list[i] < mid) {
        left.push(list[i]);
      } else {
        right.push(list[i]);
      }
    }
    return [...rec(left), mid, ...rec(right)];
  };
  const result = rec(this);
  result.forEach((n, i) => (this[i] = n));
};
