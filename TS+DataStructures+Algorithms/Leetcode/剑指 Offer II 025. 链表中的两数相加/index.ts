//  Definition for singly-linked list.
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
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = curr?.next ?? null;

  while (curr && next) {
    curr.next = prev;
    prev = curr;
    curr = next;
    next = next.next;
    curr.next = prev;
  }
  return curr;
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  l1 = reverseList(l1);
  l2 = reverseList(l2);
  let tmp: number = 0;
  let ret = new ListNode();
  let p = ret;

  while (l1 && l2) {
    p.next = new ListNode((tmp + l1.val + l2.val) % 10);
    tmp = Math.floor((tmp + l1.val + l2.val) / 10);
    l1 = l1.next;
    l2 = l2.next;
    p = p.next;
  }

  while (l1) {
    p.next = new ListNode((tmp + l1.val) % 10);
    tmp = Math.floor((tmp + l1.val) / 10);
    l1 = l1.next;
    p = p.next;
  }

  while (l2) {
    p.next = new ListNode((tmp + l2.val) % 10);
    tmp = Math.floor((tmp + l2.val) / 10);
    l2 = l2.next;
    p = p.next;
  }

  if (tmp) p.next = new ListNode(tmp);
  return reverseList(ret.next);
}

export {};

const l1 = new ListNode(7);
let p = l1;
p.next = new ListNode(2);
p = p.next;
p.next = new ListNode(4);
p = p.next;
p.next = new ListNode(3);

const l2 = new ListNode(5);
p = l2;
p.next = new ListNode(6);
p = p.next;
p.next = new ListNode(4);

console.log(addTwoNumbers(l1, l2));
