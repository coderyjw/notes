// 封装一个队列
export default class ArrayQueue<T = any> {
  private data: T[] = [];

  enqueue(element: T): void {
    this.data.push(element);
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }

  peek(): T | undefined {
    return this.data[0];
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  size(): number {
    return this.data.length;
  }
}

const queue = new ArrayQueue<number>();

queue.push(1);
queue.push(2);
queue.pop();
queue.push(3);
console.log(queue); // ArrayQueue { data: [ 2, 3 ] }
