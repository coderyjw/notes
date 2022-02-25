/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {Listl3} l1
 * @param {Listl3} l2
 * @return {Listl3}
 */
var addTwoNumbers = function (l1, l2) {
  let l3 = new ListNode();
  const result = l3;
  let carry = 0;
  while (l1 || l2) {
    const v1 = l1?.val || 0;
    const v2 = l2?.val || 0;
    const val = v1 + v2 + carry;
    carry = Math.floor(val / 10);
    l3.next = new ListNode(Math.floor(val % 10));
    l3 = l3.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  if (carry !== 0) l3.next = new ListNode(carry);

  return result.next;
};
