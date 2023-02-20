function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    // 内存循环
    const newNum = arr[i];
    let j = i - 1;
    while (arr[j] > newNum && j >= 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = newNum;
  }
  return arr;
}

const foo = [1, 3, 4, 8, 2, 9, 5, 7, 6, 0];

console.log(insertionSort(foo));
export {};
