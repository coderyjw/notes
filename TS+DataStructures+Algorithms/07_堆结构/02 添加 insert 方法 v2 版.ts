class Heap<T> {
  // 属性
  data: T[] = [];
  private length: number = 0;

  // 私有工具方法
  private swap(i: number, j: number) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  private heapify_up() {
    let index = this.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0) {
      if (this.data[index] <= this.data[parentIndex]) {
        break;
      }

      this.swap(index, parentIndex);

      index = parentIndex;
    }
  }

  // 方法
  insert(value: T) {
    // 1. 将元素放到数组的尾部
    this.data.push(value);
    this.length++;

    // 2. 维护最大堆的特性（最后位置的元素需要进行上滤操作）
    this.heapify_up();
  }

  extract(): T | undefined {
    return undefined;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  buildHeap(arr: T[]) {}
}

const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];
const heap = new Heap<number>();
for (const item of arr) {
  heap.insert(item);
}

console.log(heap.data);

export {};
