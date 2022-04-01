/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let n1 = 0,
    n2 = 0;
  const result = [];
  while (n1 < nums1.length && n2 < nums2.length) {
    if (nums1[n1] < nums2[n2]) {
      result.push(nums1[n1++]);
    } else {
      result.push(nums2[n2++]);
    }
  }
  while (n1 < nums1.length) {
    result.push(nums1[n1++]);
  }
  while (n2 < nums2.length) {
    result.push(nums2[n2++]);
  }
  const mid = result.length >> 1;
  if (result.length % 2 == 1) {
    return result[mid];
  } else {
    return (result[mid] + result[mid - 1]) / 2;
  }
};
