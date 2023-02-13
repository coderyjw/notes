//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

function endOfFirstHalf(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast.next && fast?.next.next) {
    fast = fast.next?.next ?? null;
    slow = slow!.next;
  }
  return slow;
}

function isPalindrome(head: ListNode | null): boolean {
  if (head == null) return true;

  // 1. 找到前半部分链表的尾节点并反转后半部分链表
  const firstHalfEnd = endOfFirstHalf(head);
  const secondHalfStart = reverseList(firstHalfEnd!.next);

  // 2. 判断是否回文
  let p1: ListNode | null = head;
  let p2: ListNode | null = secondHalfStart;
  while (p1 && p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  // 还原链表并返回结果
  firstHalfEnd!.next = reverseList(secondHalfStart);

  return true;
}

export {};
