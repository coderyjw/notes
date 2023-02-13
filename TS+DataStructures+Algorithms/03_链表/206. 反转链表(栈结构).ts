class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // head 本身为 null 时 不需要处理
  if (head === null) return null;
  // 只有一个节点
  if (!head.next) return head;

  // 数组模拟栈结构
  const stack: ListNode[] = [];
  let current: ListNode | null = head;
  while (current) {
    stack.push(current);
    current = current.next;
  }

  const newHead: ListNode = stack.pop()!
  let newHeadCurrent = newHead
  while(stack.length) {
    const node = stack.pop()!
    newHeadCurrent.next = node
    newHeadCurrent = newHeadCurrent.next
  }
  newHeadCurrent.next = null
  return newHead
}

const l = new ListNode()
export {};
