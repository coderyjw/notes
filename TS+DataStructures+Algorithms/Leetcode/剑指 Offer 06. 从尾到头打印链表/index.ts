function reversePrint(head: ListNode | null): number[] {
  const ret: number[] = []

  let current: ListNode | null = head
  while(current) {
    ret.unshift(current.val)
    current = current.next
  }

  return ret
};