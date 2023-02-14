// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 1 -> 2 -> 3 -> 4 -> 5
// 1 <- 2 <- 3 <- 4 <- 5
function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return head;
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = head.next;
  while (curr && next) {
    curr.next = prev;
    prev = curr;
    curr = next;
    next = next.next;
  }
  curr.next = prev;

  return curr;
}

// 1 -> 2 -> 3 -> 4 -> 5
// LEFT:2 RIGHT:4
// 1 <- 4 <- 3 <- 2 <- 5
function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  let curr: ListNode | null = head;
  let count: number = 1;
  let lefTail: ListNode | null = null;
  let rightHead: ListNode | null = null;
  let reverseHead: ListNode | null = null;

  if ((curr && !curr.next) || left === right) return head;

  while (curr) {
    if (count === left - 1) lefTail = curr;
    if (count === right + 1) rightHead = curr;
    curr = curr.next;
    count++;
  }
  curr = head;
  count = 1;
  while (curr) {
    if (count === left) reverseHead = curr;

    if (count === right) curr.next = null;

    curr = curr.next;
    count++;
  }
  reverseHead = reverseList(reverseHead);
  
  if (lefTail) lefTail!.next = reverseHead;
  else head = reverseHead;

  let reverseTail: ListNode | null = reverseHead;
  while (reverseTail && reverseTail.next) {
    reverseTail = reverseTail.next;
  }
  reverseTail!.next = rightHead;
  return head;
}

// const listNode = new ListNode(1);
// let l = listNode;
// l.next = new ListNode(2);
// l = l.next;
// l.next = new ListNode(3);
// l = l.next;
// l.next = new ListNode(4);
// l = l.next;
// l.next = new ListNode(5);
// l = l.next;

const listNode = new ListNode(3);
let l = listNode;
l.next = new ListNode(5);
l = l.next;

console.log(reverseBetween(listNode, 1, 2));

export {};
