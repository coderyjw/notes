const arr = [1, 4, 3, 8, 0, 5, 6, 2, 9, 7];

/**
 * 冒泡排序 时间复杂度 O(n2)
 */
Array.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        const tmp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = tmp;
      }
    }
  }
};

// arr.bubbleSort();
// console.log(arr);

/**
 * 选择排序 时间复杂度 O(n2)
 */
Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < this.length; j++) {
      minIndex = this[j] < this[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) {
      const tmp = this[i];
      this[i] = this[minIndex];
      this[minIndex] = tmp;
    }
  }
};

// arr.selectionSort();
// console.log(arr);

/**
 * 插入排序 时间复杂度 O(n2)
 */
Array.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    let j = i;
    const tmp = this[j];
    while (j > 0) {
      if (this[j - 1] > tmp) {
        // 往后排，先不插入
        this[j] = this[j - 1];
      } else {
        break;
      }
      j--;
    }
    this[j] = tmp;
  }
};

// arr.insertionSort();
// console.log(arr);

/**
 * 归并排序：一种典型的分而治之思想的算法
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n).
 */
Array.prototype.mergeSort = function () {
  const merge = function (lists) {
    if (lists.length === 1) return lists;
    const mid = lists.length >> 1;
    const left = merge(lists.slice(0, mid));
    const right = merge(lists.slice(mid));
    let leftIndex = (rightIndex = 0);
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
  const res = merge(this);
  res.forEach((n, i) => (this[i] = n));
};

// arr.mergeSort();
// console.log(arr);

/**
 * 快速排序 时间复杂度 O(nlogn)
 */
Array.prototype.quickSort = function () {
  const rec = function (arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const left = [];
    const right = [];
    const mid = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...rec(left), mid, ...rec(right)];
  };

  const result = rec(this);
  result.forEach((n, i) => (this[i] = n));
};

arr.quickSort();
console.log(arr);
