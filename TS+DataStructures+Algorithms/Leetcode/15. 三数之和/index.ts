function threeSum(nums: number[]): number[][] {
  nums = nums.sort((prev, next) => prev - next);
  const ret: number[][] = [];
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    let start = i + 1;
    let end = nums.length - 1;
    let prevStartNum, prevEndNum;
    if (nums[i] === nums[i - 1]) continue;
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      if (sum < 0) {
        prevStartNum = nums[start];
        start++;
      }
      if (sum > 0) {
        prevEndNum = nums[end];
        end--;
      }

      if (sum === 0) {
        if (prevEndNum !== nums[end] && prevStartNum !== nums[start]) {
          ret.push([nums[i], nums[start], nums[end]]);
        }
        prevStartNum = nums[start];
        prevEndNum = nums[end];
        start++;
        end--;
      }
    }
  }
  return ret;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
