//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  const arr: number[] = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }

  return arr.join("") === arr.reverse().join("");
}

export {};
