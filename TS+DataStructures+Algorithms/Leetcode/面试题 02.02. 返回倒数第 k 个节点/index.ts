/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function kthToLast(head: ListNode | null, k: number): number {
  let len: number = 0;

  let current: ListNode | null = head;
  while (current) {
    len++;
    current = current.next;
  }
  current = head;
  for (let i = 0; i <= len; i++) {
    if (i == len - i) return current.val;
    current = current.next;
  }
}
