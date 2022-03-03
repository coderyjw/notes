/* 
 选择排序 时间复杂度 O(n2)
*/
Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let minIndex = i;
    for (let j = 0 + i; j < this.length; j++) {
      if (this[j] < this[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      const tmp = this[i];
      this[i] = this[minIndex];
      this[minIndex] = tmp;
    }
  }
};

const arr = [1, 4, 2, 6, 3, 7, 5, 8, 9];
console.log("---------选择排序----------");
console.log(arr);
arr.selectionSort();
console.log(arr);
