class ArrayQueue<T = any> {
  private data: T[] = [];

  constructor(data?: T[]) {
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

function countStudents(students: number[], sandwiches: number[]): number {
  const studentsQueue = new ArrayQueue<number>(students);
  const sandwichesQueue = new ArrayQueue<number>(sandwiches);

  let count = 0;
  while (studentsQueue.size()) {
    if (studentsQueue.peek() === sandwichesQueue.peek()) {
      studentsQueue.dequeue();
      sandwichesQueue.dequeue();
      count = 0;
    } else {
      studentsQueue.enqueue(studentsQueue.dequeue()!);
      count++;
    }

    if (count === studentsQueue.size()) return sandwichesQueue.size();
  }

  return 0;
}

console.log(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]));
export {};
