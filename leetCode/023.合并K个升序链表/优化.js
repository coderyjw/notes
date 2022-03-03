/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const h = new MiniHeap();
  let result = new ListNode();
  const p = result;
  lists.map((v) => {
    if (v) h.insert(v);
  });
  while (h.size()) {
    const n = h.pop();
    result.next = new ListNode(n.val);
    result = result.next;
    if (n.next) h.insert(n.next);
  }
  return p.next;
};

class MiniHeap {
  constructor() {
    this.heap = [];
  }

  insert(values) {
    this.heap.push(values);
    this.shiftUp(this.size() - 1);
  }

  pop() {
    if (this.size() === 1) return this.heap.shift();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    return top;
  }

  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex].val >= this.heap[index].val) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].val <= this.heap[index].val
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }

    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].val <= this.heap[index].val
    ) {
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
