var containsNearbyDuplicate = function (nums, k) {
  const set = new Set();
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    if (i > k) {
      set.delete(nums[i - k - 1]);
    }
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]);
  }
  return false;
};
