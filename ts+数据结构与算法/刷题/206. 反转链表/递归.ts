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
  // 1. 判断节点为 null，或者只要一个节点，那么直接返回即可
  if (head === null || head.next === null) {
    return head;
  }

  const newHead = reverseList(head.next);

  head.next.next = head;
  head.next = null;
  return newHead;
}

const listNode = new ListNode(1);
listNode.push(2);
listNode.push(3);
listNode.push(4);
listNode.push(5);
listNode.push(6);

reverseList(listNode);
export {}