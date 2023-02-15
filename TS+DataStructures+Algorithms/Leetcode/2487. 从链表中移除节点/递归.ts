// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 5 -> 2 -> 13 -> 3 -> 8
//13 -> 8
function removeNodes(head: ListNode | null): ListNode | null {
  let curr: ListNode | null = head;
  if (curr && !curr.next) {
    return curr;
  }
  let newHead: ListNode | null = removeNodes(curr!.next);
  if (head!.val < newHead!.val) {
    head!.next = null;
  } else {
    head!.next = newHead
    newHead = head;
  }
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


export {}