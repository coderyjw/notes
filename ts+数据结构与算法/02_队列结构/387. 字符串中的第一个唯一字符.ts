// function firstUniqChar(s: string): number {
//   const map = new Map<string, number>();
//   for (let i = 0; i < s.length; i++) {
//     let n = map.get(s[i]);
//     n ? map.set(s[i], n + 1) : map.set(s[i], 1);
//   }

//   for (let i = 0; i < s.length; i++) {
//     if (map.get(s[i]) === 1) return i;
//   }
//   return -1;
// }

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

// function firstUniqChar(s: string): number {
//   const map = new Map<string, number>();
//   const queue = new ArrayQueue<[string, number]>();
//   for (let i = 0; i < s.length; i++) {
//     if(!map.has(s[i])) {
//       map.set(s[i], i)
//       queue.enqueue([s[i], i]);
//     } else {
//       map.set(s[i], -1)
//       while(queue.size() && map.get((queue.peek() as [string,number])[0]) === -1) {
//         queue.dequeue()
//       }
//     }
//   }

//   return queue.size() ? (queue.peek() as [string, number])[1] : -1;
// }

function firstUniqChar(s: string): number {
  const map = new Map<string, boolean>();
  const queue = new ArrayQueue<[string, number]>();
  for (let i = 0; i < s.length; i++) {
    let n = map.get(s[i]);
    if (!n) {
      map.set(s[i], true);
      queue.enqueue([s[i], i]);
    } else {
      map.set(s[i], false);
      while (queue.size() && !map.get((queue.peek() as [string, number])[0])) {
        queue.dequeue();
      }
    }
  }

  return queue.size() ? (queue.peek() as [string, number])[1] : -1;
}
console.log(firstUniqChar("aadadaad"));
