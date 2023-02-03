class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // 1. 判断节点为 null，或者只要一个节点，那么直接返回即可
  if (head === null || head.next === null) return head;

  // 2. 反转链表结构
  let newHead: ListNode | null = null
  while(head) {
    const current: ListNode | null = head.next
    head.next = newHead
    newHead = head
    head = current
  }
  return newHead
}

const l = new ListNode()
export {};
