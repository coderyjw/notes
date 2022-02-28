/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 时间复杂度 O(nlogK)
 * 空间复杂度：O(K)
 */
var findKthLargest = function (nums, k) {
  class MiniHeap {
    constructor() {
      this.heap = [];
    }

    insert(values) {
      this.heap.push(values);
      this.shiftUp(this.size() - 1);
    }

    pop() {
      if (this.size() === 1) {
        this.heap.pop();
        return;
      }
      this.heap[0] = this.heap.pop();
      this.shiftDown(0);
    }

    shiftUp(index) {
      if (index === 0) return;
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(parentIndex, index);
        this.shiftUp(parentIndex);
      }
    }

    shiftDown(index) {
      const leftIndex = this.getLeftIndex(index);
      const rightIndex = this.getRightIndex(index);
      if (this.heap[leftIndex] < this.heap[index]) {
        this.swap(leftIndex, index);
        this.shiftDown(leftIndex);
      }

      if (this.heap[rightIndex] < this.heap[index]) {
        this.swap(rightIndex, index);
        this.shiftDown(rightIndex);
      }
    }

    getParentIndex(index) {
      return (index - 1) >> 1;
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
      return this.heap.length;
    }
    peek() {
      return this.heap[0];
    }
  }

  const heap = new MiniHeap();
  for (let n of nums) {
    heap.insert(n);
    if (heap.size() > k) {
      heap.pop();
    }
  }

  return heap.peek();
};

findKthLargest([3, 2, 1, 5, 6, 4], 2);
findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4);
