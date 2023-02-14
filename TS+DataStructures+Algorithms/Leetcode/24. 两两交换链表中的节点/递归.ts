//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
// 1 -> 2 -> 1 -> 2
// 1 -> 2 -> 3 -> 4       2 -> 1 -> 4 -> 3
function swapPairs(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let one: ListNode | null = head;
  let two: ListNode | null = one.next;
  let three: ListNode | null = two?.next ?? null;

  two!.next = one;
  one.next = swapPairs(three);

  return two;
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
