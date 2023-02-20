const mergeSort = function (arr: number[]) {
  if (arr.length === 1) return arr;

  // 1. 分解(divide)：对数组进行分解（分解成链各个小数组）
  // 1.1 递归地切割数组得到左边的数组left 和 右边的数组right
  const mid = arr.length >> 1;
  const left: number[] = mergeSort(arr.slice(0, mid));
  const right: number[] = mergeSort(arr.slice(mid));

  // 2. 合并（merge）：将两个子数组进行合并（双指针）
  // 2.1 定义双指针
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result[leftIndex + rightIndex] = left[leftIndex++];
    } else {
      result[leftIndex + rightIndex] = right[rightIndex++];
    }
  }

  // 2.2 判断是否一个数组中海油剩余元素
  // 循环完左边还有剩余
  while (leftIndex < left.length) {
    result[leftIndex + rightIndex] = left[leftIndex++];
  }

  // 循环完右边还有剩余
  while (rightIndex < right.length) {
    result[leftIndex + rightIndex] = right[rightIndex++];
  }
  return result;
};

const foo = [1, 3, 4, 8, 2, 9, 5, 7, 6, 0];

console.log(mergeSort(foo));
export {};
