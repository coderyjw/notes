/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 * 1 2 3 5
 */
var kthSmallestPrimeFraction = function (arr, k) {
  const heap = new BigHeap();
  const allNum = (arr.length * (arr.length - 1)) / 2;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      heap.insert({ start: i, end: j, val: arr[i] / arr[j] });
      if (heap.size() > allNum - k) {
        heap.pop();
      }
    }
  }
  console.log(heap);
  return heap.heap[0];
};

class BigHeap {
  constructor() {
    this.heap = [];
  }

  insert(obj) {
    this.heap.push(obj);
    this.shiftUp(this.size());
  }

  shiftUp(index) {
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].val <= this.heap[index].val
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].val >= this.heap[index].val
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }

    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].val >= this.heap[index].val
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftIndex(index) {
    return index * 2 + 1;
  }
  getRightIndex(index) {
    return index * 2 + 2;
  }

  swap(n1, n2) {
    const tmp = this.heap[n1];
    this.heap[n1] = this.heap[n2];
    this.heap[n2] = tmp;
  }

  size() {
    return this.heap.length - 1;
  }
}
