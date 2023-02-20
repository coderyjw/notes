class MyQueue {
  data: number[] = []
  constructor() {}

  push(x: number): void {
    this.data.push(x)
  }

  pop(): number {
    return this.data.shift()!
  }

  peek(): number {
    return this.data[0]
  }

  empty(): boolean {
    return this.data.length === 0
  }
}
