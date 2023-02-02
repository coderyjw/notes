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
}

const l = new LinkedList<string>();
l.append("第一个节点");
l.append("第二个节点");
l.append("第三个节点");
l.traverse();  // 第一个节点->第二个节点->第三个节点
export {};
