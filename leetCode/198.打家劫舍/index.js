/**
 * @param {number[]} nums
 * @return {number}
 * f(k) = 从前k个房屋中能偷窃到的最大数额
 * AK = 第k个房屋的钱数
 * f(k) = max(f(k-2) + AK, f(k-1))
 */
var rob = function (nums) {
  const cache = [0, nums[0], Math.max(nums[1], nums[0])];
  const dp = (nums) => {
    const length = nums.length;
    if (typeof cache[length] == "number") return cache[length];
    else {
      cache[length] = Math.max(
        dp(nums.slice(0, length - 1)),
        dp(nums.slice(0, length - 2)) + nums[length - 1]
      );
      return cache[length];
    }
  };
  return dp(nums);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const length = nums.length;
  let p = nums[0],
    q = Math.max(nums[1], nums[0]);
  if (length === 1) return p;
  else if (length === 2) return q;
  for (let i = 3; i <= length; i++) {
    const tmp = q;
    q = Math.max(p + nums[i - 1], q);
    p = tmp;
  }
  return q;
};
