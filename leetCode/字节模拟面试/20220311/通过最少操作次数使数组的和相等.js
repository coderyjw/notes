/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * made by yjw
 * nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
 */
var minOperations = function (nums1, nums2) {
  nums1.sort((prev, next) => prev - next);
  nums2.sort((prev, next) => prev - next);

  const sum1 = nums1.reduce((prev, next) => prev + next);
  const sum2 = nums2.reduce((prev, next) => prev + next);
  if (sum1 === sum2) return 0;

  let diff = Math.abs(sum1 - sum2);
  let bigArr = sum1 > sum2 ? nums1 : nums2;
  let smallArr = sum1 > sum2 ? nums2 : nums1;
  let p = bigArr.length - 1;
  let q = 0;
  let result = 0;

  while (diff > 0 && (p >= 0 || q < smallArr.length)) {
    if (bigArr[p] - 1 >= 6 - smallArr[q]) {
      diff -= bigArr[p--] - 1;
    } else {
      diff -= 6 - smallArr[q++];
    }
    result++;
  }
  if (diff <= 0) return result;
  else return -1;
};
