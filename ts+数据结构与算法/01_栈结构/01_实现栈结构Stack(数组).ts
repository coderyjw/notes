class ArrayStack<T = any> {
  private data: T[] = [];

  push(element: T): void {
    this.data.push(element);
  }

  pop(): T | undefined {
    return this.data.pop();
  }

  peek(): T {
    return this.data[this.data.length - 1];
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  size(): number {
    return this.data.length;
  }
}

const arrayStack = new ArrayStack<number>();
arrayStack.push(1);
arrayStack.push(2);

const res = arrayStack.pop();

console.log(arrayStack);
