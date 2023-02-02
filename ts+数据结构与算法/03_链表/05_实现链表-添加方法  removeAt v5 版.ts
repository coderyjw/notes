// 1. 创建 Node 节点类
class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

// 2. 创建 LinkedList 的类
class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  get length() {
    return this.size;
  }

  append(value: T) {
    // 1. 根据 value创建一个新节点
    const newNode = new Node(value);

    // 2. 判断 this.head 是否为 null
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }

      // 此时 current 指向最后一个节点
      current.next = newNode;
    }

    // 3. size++
    this.size++;
  }

  traverse() {
    const values: T[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }

    console.log(values.join("->"));
  }

  insert(value: T, position: number): boolean {
    // 1. 越界判断
    if (position < 0 || position > this.size) return false;

    // 2. 根据 value 创建新的节点
    const newNode = new Node(value);

    // 3. 判断是否需要插入头部
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous: Node<T> | null = null;
      let index = 0;

      while (index++ < position && current) {
        previous = current;
        current = current.next;
      }

      // index === position
      newNode.next = current;
      previous!.next = newNode;
    }
    return true;
  }

  removeAt(position: number): T | null {
    // 1. 越界判断
    if (position < 0 || position > this.size) return null;

    // 2. 判断是否删除第一个节点
    let current = this.head;
    if (position === 0) {
      this.head = current?.next ?? null;
    } else {
      let previous: Node<T> | null = null;
      let index = 0;

      while (index++ < position && current) {
        previous = current;
        current = current.next;
      }
      previous!.next = current?.next ?? null;
    }

    this.size--;

    return current?.value ?? null;
  }
}

const l = new LinkedList<string>();
l.append("aaa");
l.append("bbb");
l.append("ccc");

// console.log(l.removeAt(0)); // aaa
// console.log(l.removeAt(1)); // bbb
// console.log(l.removeAt(2)); // ccc
// console.log(l.removeAt(3)); // null

l.traverse();
export {};
