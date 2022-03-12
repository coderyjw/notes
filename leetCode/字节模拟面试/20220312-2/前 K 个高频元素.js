/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 made by yjw
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  const heap = new MiniHeap();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  for (let [value, count] of map.entries()) {
    heap.insert({ value, count });
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.heap.map((n) => n.value);
};

class MiniHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.size() - 1);
  }

  shiftUp(index) {
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].count > this.heap[index].count
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
      this.heap[index].count > this.heap[leftIndex].count
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] &&
      this.heap[index].count > this.heap[rightIndex].count
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftIndex(index) {
    return (index + 1) * 2 - 1;
  }

  getRightIndex(index) {
    return (index + 1) * 2;
  }

  size() {
    return this.heap.length;
  }

  swap(n1, n2) {
    const tmp = this.heap[n1];
    this.heap[n1] = this.heap[n2];
    this.heap[n2] = tmp;
  }
}
