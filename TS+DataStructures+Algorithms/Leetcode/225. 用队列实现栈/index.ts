class MyStack {
  data: number[] = [];
  constructor() {}

  push(x: number): void {
    this.data.push(x);
  }

  pop(): number {
    return this.data.pop()!;
  }

  top(): number {
    return this.data[this.data.length - 1];
  }

  empty(): boolean {
    return this.data.length === 0;
  }
}
