class Node {
  value: number;
  next: Node | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

class MyLinkedList {
  private head: Node | null = null;
  private size: number = 0;

  constructor() {}

  private getNode(position: number): Node | null {
    let index = 0;
    let current = this.head;
    while (index++ < position && current) {
      current = current?.next;
    }
    return current;
  }

  get(index: number): number {
    if (index < 0 || index >= this.size) return -1;

    let current = this.getNode(index);

    return current!.value;
  }

  addAtHead(val: number): void {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  addAtTail(val: number): void {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.getNode(this.size - 1);

      current!.next = newNode;
    }
    this.size++;
  }

  addAtIndex(index: number, val: number): void {
    if (index > this.size) return;

    if (index <= 0) {
      this.addAtHead(val);
    } else {
      const newNode = new Node(val);
      const previous = this.getNode(index - 1);
      newNode.next = previous?.next ?? null;
      previous!.next = newNode;
    }
    this.size++;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) return;

    let current = this.head;

    if (index === 0) {
      this.head = current?.next ?? null;
    } else {
      const previous = this.getNode(index - 1);
      previous!.next = previous?.next?.next ?? null;
    }
    this.size--;
  }

  traverse() {
    const values: number[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }

    console.log(values.join("->"));
  }
}

const l = new MyLinkedList();
l.addAtHead(7);
l.addAtHead(2);
l.addAtHead(1);
l.addAtIndex(3, 0);
l.deleteAtIndex(2)
l.addAtHead(6)
l.addAtTail(4)
console.log(l.get(4))
l.addAtHead(4)
l.addAtIndex(5,0)
l.addAtHead(6)
l.traverse();

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

export {};
