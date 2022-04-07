/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let p = head,
    q = head;
  let count = 1;
  while (q.next) {
    q = q.next;
    count++;
  }
  if (n == count) return head.next;
  while (p) {
    count--;
    if (count == n) {
      if (!p.next.next) {
        p.next = null;
      } else {
        p.next = p.next.next;
      }
      return head;
    }
    p = p.next;
  }
};
