//Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeNodes(head: ListNode | null): ListNode | null {
  let curr: ListNode | null = head;
  let ret: ListNode | null = new ListNode();
  let p = ret;
  let num: number = 0;
  while(curr) {
    if(curr.val === 0 && num !== 0) {
      p.next = new ListNode(num)
      p = p.next
      num = 0
    }

    if(curr.val !== 0) {
      num += curr.val
    }


    curr = curr.next
  }
  return ret.next
}
