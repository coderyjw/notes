class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
// [1,4,3,2,5,2]
// 3
// [1,2,2,4,3,5]
function partition(head: ListNode | null, x: number): ListNode | null {
  let small: ListNode | null = new ListNode();
  const smallHead: ListNode | null = small;
  let large: ListNode | null = new ListNode();
  const largeHead: ListNode | null = large;

  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next
  }
  large.next = null
  small.next = largeHead.next
  return smallHead.next
}

export {};
