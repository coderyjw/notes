class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let prevNode: ListNode | null = null;
  let currNode: ListNode | null = head;
  let nextNode: ListNode | null = head?.next ?? null;

  if (!nextNode) return head;

  while (currNode && nextNode) {
    if (currNode.val === nextNode.val) {
      while (nextNode.next && nextNode.next.val === currNode.val) {
        nextNode = nextNode.next;
      }
      if (head!.val === currNode.val) {
        head = nextNode.next;
      } else {
        prevNode!.next = nextNode.next;
      }

      currNode = nextNode.next;
      nextNode = nextNode.next?.next ?? null;
    } else {
      prevNode = currNode;
      currNode = currNode.next;
      nextNode = nextNode.next;
    }
  }
  return head;
}
