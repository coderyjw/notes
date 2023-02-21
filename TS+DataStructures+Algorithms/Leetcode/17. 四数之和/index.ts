function fourSum(nums: number[], target: number): number[][] {
  nums = nums.sort((prev, next) => prev - next);
  const ret: number[][] = [];
  const n = nums.length;
  let p1, p2;
  console.log(nums);
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    for (let j = i + 1; j < n; j++) {
      let start = j + 1;
      let end = n - 1;
      let prevStartNum, prevNextNum;

      if (p1 === nums[i] && p2 === nums[j]) {
        continue;
      }

      while (start < end) {
        const sum = nums[i] + nums[j] + nums[start] + nums[end];
        if (sum < target) {
          prevStartNum = nums[start++];
        }
        if (sum > target) {
          prevNextNum = nums[end--];
        }
        if (sum === target) {
          if (prevStartNum !== nums[start] && prevNextNum !== nums[end]) {
            ret.push([nums[i], nums[j], nums[start], nums[end]]);
          }
          p1 = nums[i];
          p2 = nums[j];

          prevStartNum = nums[start++];
          prevNextNum = nums[end--];
        }
      }
    }
  }
  return ret;
}

console.log(fourSum([2, 0, 3, 0, 1, 2, 4], 7));
