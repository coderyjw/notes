//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
  let ret: ListNode | null = head;
  let previous: ListNode | null = null;
  let current: ListNode | null = head;
  // 1. 遍历链表
  while (current) {
    if(current.val === val) {
      // 2. 遍历到值相同时， 删除节点
      if(previous === null) {
        // 1. 要删除的节点位于头节点
        current = current.next
        ret = current
      } else {
        // 2. 要删除的节点不位于头节点
        previous.next = previous?.next?.next ?? null
        current = previous.next
      }
    } else {
      // 3. 遍历到值不相同时，继续遍历，记录 previous（上一个节点）
      previous = current
      current = current.next
    }
    
  }
  return ret;
}

const listNode = new ListNode(1);
let p = listNode;
p.next = new ListNode(2);
p = p.next;
p.next = new ListNode(6);
p = p.next;
p.next = new ListNode(3);
p = p.next;
p.next = new ListNode(4);
p = p.next;
p.next = new ListNode(5);
p = p.next;
p.next = new ListNode(6);
p = p.next;

removeElements(listNode, 6);

console.log(listNode);
