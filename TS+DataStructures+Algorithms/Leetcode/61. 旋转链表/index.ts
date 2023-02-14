class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 1 -> 2 -> 3 -> 4 -> 5      2
// 3 -> 4 -> 5 -> 1 -> 2
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if(!head || !head.next) return head
  let curr: ListNode | null = head;
  let tail: ListNode | null = null;
  let len = 0;
  while (curr) {
    curr = curr.next;
    len++;

    if (curr && !curr?.next) {
      tail = curr;
    }
  }
  curr = head;
  k = k % len;
  for (let i = 0; i < len - k; i++) {
    /* 前面的换后移 */ 
    head = head?.next ?? null;
    tail!.next = curr;
    curr!.next = null;
    tail = curr;
    curr = head
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
tmp.next = new ListNode(5);
tmp = tmp?.next ?? null;

console.log(rotateRight(listNode, 2));

export {};
