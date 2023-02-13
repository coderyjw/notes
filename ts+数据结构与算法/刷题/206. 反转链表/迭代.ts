//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  push(val?: number) {
    const newNode: ListNode | null = new ListNode(val);
    let current: ListNode = this;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}

// 1 2 3 4 5 6     ->      6 5 4 3 2 1
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev
}

const listNode = new ListNode(1);
listNode.push(2);
listNode.push(3);
listNode.push(4);
listNode.push(5);
listNode.push(6);

reverseList(listNode);

export {};
