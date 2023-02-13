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

  // 封装私有方法
  // 根据 position 获取得到当前的节点
  private getNode(position: number): Node<T> | null {
    let index = 0;
    let current = this.head;
    while (index++ < position && current) {
      current = current?.next;
    }
    return current;
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
      const previous = this.getNode(position - 1);
      newNode.next = previous?.next ?? null;
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
      let previous = this.getNode(position - 1);
      current = previous?.next ?? null;
      previous!.next = previous?.next?.next ?? null;
    }

    this.size--;

    return current?.value ?? null;
  }

  get(position: number): T | null {
    // 越界问题
    if (position < 0 || position >= this.size) return null;

    // 2. 查找元素
    let current = this.getNode(position);

    return current?.value ?? null;
  }

  update(value: T, position: number): boolean {
    if (position < 0 || position >= this.size) return false;

    // 获取对应位置的节点，直接更新即可
    const currentNode = this.getNode(position);
    currentNode!.value = value;
    return true;
  }

  indexOf(value: T) {
    // 从第一个节点开始，向后遍历
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  remove(value: T): T | null {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}

const l = new LinkedList<string>();
l.append("aaa");
l.append("bbb");
l.append("ccc");

// l.remove("bbb");
l.traverse(); // aaa->ccc

console.log(l.get(3));
// l.traverse(); // aaa->bbb->ccc
// l.update("ddd", 1); // aaa->ddd->ccc
// l.traverse();

// console.log(l.removeAt(0)); // aaa
// console.log(l.removeAt(1)); // bbb
// console.log(l.removeAt(2)); // ccc
// console.log(l.removeAt(3)); // null

// console.log(l.get(0)) // aaa
// console.log(l.get(1)) // bbb
// console.log(l.get(2)) // ccc
// console.log(l.get(3)) // null

// l.insert("ddd", 0); // ddd->aaa->bbb->ccc
// l.insert("ddd", 1); // aaa->ddd->bbb->ccc
// l.insert("ddd", 2); // aaa->bbb->ddd->ccc
// l.insert("ddd", 3); // aaa->bbb->ccc->ddd
// l.insert("ddd", 4); // aaa->bbb->ccc
// l.traverse();
export {};
