function heapSort(arr: number[]): number[] {
  // 1. 获取数组的长度
  const n = arr.length;

  // 2. 对 arr 进行原地建堆
  // 2.1 从第一个非叶子节点开始进行下滤操作
  const start = Math.floor(n / 2 - 1);
  for (let i = start; i >= 0; i--) {
    // 2.2 进行下滤操作
    heapifyDown(arr, n, i);
  }

  // 3. 对最大堆进行排序
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapifyDown(arr, i, 0);
  }
  return arr;
}

function heapifyDown(arr: number[], n: number, index: number) {
  while (2 * index + 1 < n) {
    // 1. 获取左右子节点的索引
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    // 2. 找出左右子节点较大的值
    let largerIndex = leftChildIndex;
    if (rightChildIndex < n && arr[rightChildIndex] > arr[leftChildIndex]) {
      largerIndex = rightChildIndex;
    }

    // 3. 判断 index 位置的值比更大的子节点，直接 break
    if (arr[index] >= arr[largerIndex]) {
      break;
    }

    // 4. 和更大位置的进行交换
    [arr[index], arr[largerIndex]] = [arr[largerIndex], arr[index]];
    index = largerIndex;
  }
}

const foo = [1, 3, 4, 8, 2, 9, 5, 7, 6, 0];

console.log(heapSort(foo));
export {};
