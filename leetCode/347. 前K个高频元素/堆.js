class MiniHeap {
  constructor() {
    this.heap = [];
  }

  insert(values) {
    this.heap.push(values);
    this.shiftUp(this.size() - 1);
  }

  pop() {
    if (this.size() <= 1) {
      this.heap.pop();
      return;
    }
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex].value >= this.heap[index].value) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].value <= this.heap[index].value
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }

    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].value <= this.heap[index].value
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  swap(n1, n2) {
    const tmp = this.heap[n1];
    this.heap[n1] = this.heap[n2];
    this.heap[n2] = tmp;
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

  size() {
    return this.heap.length;
  }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (let i of nums) {
    map.set(i, map.has(i) ? map.get(i) + 1 : 1);
  }

  const heap = new MiniHeap();
  map.forEach((value, key) => {
    heap.insert({ value, key });
    if (heap.size() > k) {
      heap.pop();
    }
  });

  return heap.heap.map((a) => a.key);
};

console.log(topKFrequent([-1, 1, 4, -4, 3, 5, 4, -2, 3, -1], 3));
