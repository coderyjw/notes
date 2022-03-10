/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 将数组一分为二，其中一定有一个是有序的，另一个可能是有序，也能是部分有序。
    此时有序部分用二分法查找。无序部分再一分为二，其中一个一定有序，另一个可能有序，可能无序。就这样循环. 
 */
var search = function (nums, target) {
  const n = nums.length;
  if (n === 1) return nums[0] === target ? 0 : -1;
  let l = 0,
    r = n - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[0] <= nums[mid]) {
      if (nums[0] <= target && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[n - 1]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
};

// 4 5 6 7 0 1 2
