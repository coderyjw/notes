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
  return curr
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

  l1 = reverseList(l1)
  l2 = reverseList(l2)
  let tmp:number = 0
  const newL = new ListNode(0)
  while(l1 && l1.next && l2 && l2.next) {

  }
}

export {};
