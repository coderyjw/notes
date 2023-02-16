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

  private heapify_down(index: number) {
    while (2 * index + 1 < this.length) {
      // 1. 找到左右子节点
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = leftChildIndex + 1;

      // 2. 找到左右子节点节点较大的值
      let largeIndex = leftChildIndex;
      if (rightChildIndex < this.length && this.data[rightChildIndex] > this.data[leftChildIndex]) {
        largeIndex = rightChildIndex;
      }
      // 3. 较大的值和 index 位置进行比较
      if (this.data[index] >= this.data[largeIndex]) {
        break;
      }
      // 4. 交换位置
      this.swap(index, largeIndex);
      index = largeIndex;
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
    // 1. 判断元素的个数为 0 或者 1 的情况
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.length--;
      return this.data.pop()!;
    }

    // 2. 提取并且需要返回的最大值
    const topValue = this.data[0];
    this.data[0] = this.data.pop()!;
    this.length--;

    // 3. 维护最大堆的特性：下滤操作
    this.heapify_down(0);

    return topValue;
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
}

const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];
const heap = new Heap<number>(arr);
// for (const item of arr) {
//   heap.insert(item);
// }

console.log(heap.extract());
console.log(heap.data);

export {};
