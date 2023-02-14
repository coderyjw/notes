//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 1 -> 2 -> 3 -> 4
// 2 -> 1 -> 3 -> 4
// 2 -> 1 -> 4 -> 3
function swapPairs(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = head?.next ?? null;
  let flag: boolean = true;
  if (!curr || !next) return head;

  while (curr && next) {
    if (flag) {
      flag = false;
      curr.next = next.next;
      next.next = curr;
      head = next;
    } else {
      curr.next = next.next;
      next.next = curr;
      prev!.next = next;
    }
    prev = curr;
    curr = curr.next;
    next = curr?.next || null;
  }

  return head;
}
const listNode = new ListNode(1);
let tmp: ListNode | null = listNode;
tmp.next = new ListNode(2);
tmp = tmp.next;
tmp.next = new ListNode(3);
tmp = tmp?.next ?? null;
tmp.next = new ListNode(4);
tmp = tmp?.next ?? null;

console.log(swapPairs(listNode));

export {};
