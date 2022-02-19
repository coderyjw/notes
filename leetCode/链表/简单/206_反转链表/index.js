/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let p1 = head,
    p2 = null;
  while (p1) {
    const next = p1.next;
    p1.next = p2;
    p2 = p1;
    p1 = next;
  }
  return p2;
};
