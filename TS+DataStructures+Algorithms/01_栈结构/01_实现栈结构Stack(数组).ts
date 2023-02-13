import IStack from "./IStack";

// 封装一个栈
export default class ArrayStack<T = any> implements IStack<T> {
  private data: T[] = [];

  push(element: T): void {
    this.data.push(element);
  }

  pop(): T | undefined {
    return this.data.pop();
  }

  peek(): T | undefined {
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
const res1 = arrayStack.peek();

console.log(arrayStack);

export {};
