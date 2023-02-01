import ArrayStack from "./01_实现栈结构Stack(数组)";

// function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
//   let res: number[] = [];
//   for (let i = 0; i < nums1.length; i++) {
//     let pos: number = 0;
//     for (let j = 0; j < nums2.length; j++) {
//       if (nums2[j] === nums1[i]) {
//         pos = j;
//         break;
//       }
//     }
//     if (pos === nums2.length - 1) res.push(-1);

//     for (let j = pos + 1; j < nums2.length; j++) {
//       if (nums2[j] > nums1[i]) {
//         res.push(nums2[j]);
//         break;
//       }
//       if (j >= nums2.length - 1) res.push(-1);
//     }
//   }
//   return res;
// }

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const map = new Map<number, number>();
  const stack = new ArrayStack<number>();
  for (let i = nums2.length - 1; i >= 0; --i) {
    const num = nums2[i];
    while (stack.size() && num >= (stack.peek() as number)) {
      stack.pop();
    }
    map.set(num, stack.size() ? (stack.peek() as number) : -1);
    stack.push(num);
  }
  const res = new Array(nums1.length).fill(0).map((_, i) => map.get(nums1[i]) as number);
  return res;
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]));
