// const quickSort = function (arr: number[]): number[] {
//   if (arr.length <= 1) return arr;

//   const left: number[] = [];
//   const right: number[] = [];
//   const mid = arr[0];

//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] < mid) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }

//   return [...quickSort(left), mid, ...quickSort(right)];
// };

const quickSort = function (arr: number[]): number[] {
  partition(0, arr.length - 1);

  function partition(left: number, right: number) {
    if (left >= right) return;

    // 1. 找到基准元素（pivot轴心）
    const pivot = arr[right];

    // 2. 双指针进行交换操作（左边都是比 pivot 小的数字，右边都是比 pivot 大的数字）
    let i: number = left;
    let j: number = right - 1;

    while (i <= j) {
      // 找到一个比 pivot 大的元素
      while (arr[i] < pivot) {
        i++;
      }

      // 找到一个比 pivot 小的元素
      while (arr[j] > pivot) {
        j--;
      }

      // 说明我们已经找到了 比pivot大的元素arr[i] 和 比pivot小的元素arr[j]
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
      console.log({ arr });
    }
    // 将 pivot 放在正确的位置
    [arr[i], arr[right]] = [arr[right], arr[i]];

    // 左右继续划分区域(partition)
    partition(left, j);
    partition(i + 1, right);
  }

  return arr;
};

const foo = [1, 3, 4, 8, 2, 9, 5, 7, 6, 0];

console.log(quickSort(foo));
export {};
