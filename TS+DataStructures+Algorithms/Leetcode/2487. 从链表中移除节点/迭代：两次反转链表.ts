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
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = head?.next ?? null;

  if (!curr || !next) return head;

  while (curr && next) {
    curr.next = prev;
    prev = curr;
    curr = next;
    next = next?.next;
    curr.next = prev;
  }
  return curr;
}

// 5 -> 2 -> 13 -> 3 -> 8
// 8 -> 3 -> 13 -> 2 -> 5
//13 -> 8
function removeNodes(head: ListNode | null): ListNode | null {
  let newHead = reverseList(head);
  let curr: ListNode | null = newHead;
  while (curr && curr.next) {
    while (curr && curr.next && curr.val > curr.next.val) curr.next = curr.next.next;
    curr = curr.next;
  }
  newHead = reverseList(newHead);
  return newHead;
}

const arr = [2, 13, 3, 8];
const listNode = new ListNode(5);
let p = listNode;
for (let value of arr) {
  p.next = new ListNode(value);
  p = p.next;
}

console.log(removeNodes(listNode));

export {};
