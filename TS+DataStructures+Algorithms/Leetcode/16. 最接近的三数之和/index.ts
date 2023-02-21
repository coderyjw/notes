function threeSumClosest(nums: number[], target: number): number {
  const length = nums.length;
  let ret = Infinity;
  nums.sort((prev, next) => prev - next);
  for (let i = 0; i < length; i++) {
    let start = i + 1,
      end = length - 1;
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      ret = Math.abs(target - sum) < Math.abs(target - ret) ? sum : ret;
      if (sum < target) start++;
      else if (sum > target) end--;
      else return sum;
    }
  }
  return ret;
}
