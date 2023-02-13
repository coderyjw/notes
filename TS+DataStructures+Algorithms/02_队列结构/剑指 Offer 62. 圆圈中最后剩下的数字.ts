class ArrayQueue<T = any> {
  private data: T[] = [];

  constructor(data: T[]) {
    this.data = data || [];
  }

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

function lastRemaining(n: number, m: number): number {
  const queue = new ArrayQueue<number>(Array.from(Array(n).keys()));

  while (queue.size() > 1) {
    for (let i = 1; i < m; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    queue.dequeue();
  }
  return queue.dequeue()!;
}

lastRemaining(5, 3);
