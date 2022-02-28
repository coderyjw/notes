class MiniHeap {
  constructor() {
    this.heap = [];
  }

  /* 插入一个节点 */
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
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
  swap(a, b) {
    const tmp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = tmp;
  }

  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(index - 1);
    }
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] > this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] > this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  pop() {
    if (this.heap.length === 1) {
      this.heap.pop();
      return;
    }
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  size() {
    return this.heap.length
  }

  peek() {
    return this.heap[0]
  }
}

const heap = new MiniHeap();
console.log("--------------inset插入方法和shiftUp上移方法----------------");
heap.insert(3);
heap.insert(2);
heap.insert(1);
console.log(heap);

console.log("--------------删除堆顶----------------");
heap.pop();
heap.pop();
heap.pop();
console.log(heap);
