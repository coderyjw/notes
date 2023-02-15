class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let tmp: number = 0;
  let ret: ListNode | null = new ListNode();
  let p = ret;
  while (l1 && l2) {
    p.next = new ListNode((l1.val + l2.val + tmp) % 10);
    tmp = Math.floor((l1.val + l2.val + tmp) / 10);
    l1 = l1.next;
    l2 = l2.next;
    p = p.next;
  }

  while (l1) {
    p.next = new ListNode((l1.val + tmp) % 10);
    tmp = Math.floor((l1.val + tmp) / 10);
    l1 = l1.next;
    p = p.next;
  }

  while (l2) {
    p.next = new ListNode((l2.val + tmp) % 10);
    tmp = Math.floor((l2.val + tmp) / 10);
    l2 = l2.next;
    p = p.next;
  }

  if (tmp) p.next = new ListNode(tmp);
  return ret.next;
}

export {};
