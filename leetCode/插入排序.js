/* 
  时间复杂度：O(n2)
*/
Array.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    const tmp = this[i];
    let j = i;
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

const arr = [4, 1, 2, 6, 3, 7, 5, 8, 9];
console.log("---------插入排序----------");
console.log(arr);
arr.insertionSort();
console.log(arr);
