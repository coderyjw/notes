/* 
  冒泡排序 时间复杂度 O(n2)
*/
Array.prototype.bubbleSort = function () {
  for (let j = 0; j < this.length - 1; j++) {
    for (let i = 0; i < this.length - 1 - j; i++) {
      if (this[i] > this[i + 1]) {
        const tmp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = tmp;
      }
    }
  }
};
const arr = [1, 4, 2, 6, 3, 7, 5, 8, 9];
console.log("---------冒泡排序----------");
console.log(arr);
arr.bubbleSort();
console.log(arr);
