/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let result = new ListNode();
  const p = result;
  while (list1 && list2) {
    result.next = new ListNode()
    result = result.next
    if (list1.val <= list2.val) {
      result.val = list1.val;
      list1 = list1.next;
    } else {
      result.val = list2.val;
      list2 = list2.next;
    }
    
  }
  if (list1) result.next = list1;
  if (list2) result.next = list2;
  return p.next
};

