class TripleInOne {
  stack: [number[], number[], number[]] = [[], [], []];
  stackSize: number;
  constructor(stackSize: number) {
    this.stackSize = stackSize;
  }

  push(stackNum: number, value: number): void {
    this.stack[stackNum].length < this.stackSize ? this.stack[stackNum].push(value) : "";
  }

  pop(stackNum: number): number {
    return this.stack[stackNum].pop() ?? -1;
  }

  peek(stackNum: number): number {
    return this.stack[stackNum][this.stack[stackNum].length - 1] ?? -1;
  }

  isEmpty(stackNum: number): boolean {
    return this.stack[stackNum].length === 0;
  }
}

/**
 * Your TripleInOne object will be instantiated and called as such:
 * var obj = new TripleInOne(stackSize)
 * obj.push(stackNum,value)
 * var param_2 = obj.pop(stackNum)
 * var param_3 = obj.peek(stackNum)
 * var param_4 = obj.isEmpty(stackNum)
 */
