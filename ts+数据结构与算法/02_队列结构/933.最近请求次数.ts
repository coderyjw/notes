// 封装一个队列
class ArrayQueue<T = any> {
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

class RecentCounter {
  queue: ArrayQueue<number>;

  constructor() {
    this.queue = new ArrayQueue<number>();
  }

  ping(t: number): number {
    this.queue.enqueue(t);
    while (this.queue.peek() < t - 3000) {
      this.queue.dequeue();
    }
    return this.queue.size();
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

export {}