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
  lists.forEach((node) => {
    while (node) {
      h.insert(node.val);
      node = node.next;
    }
  });
  let result = new ListNode();
  const copy = result;
  while (h.size() > 0) {
    const newNode = new ListNode(h.peek());
    h.pop();
    result.next = newNode;
    result = result.next;
  }
  return copy.next;
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
