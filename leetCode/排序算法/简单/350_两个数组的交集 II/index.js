/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersect = function (nums1, nums2) {
  nums1.sort((prev, next) => prev - next);
  nums2.sort((prev, next) => prev - next);
  let i = 0,
    j = 0;
  const result = [];
  const l1 = nums1.length
  const l2 = nums2.length
  while (i < l1 && j < l2) {
    if (nums1[i] < nums2[j]) {
      i++;
    } else if (nums1[i] > nums2[j]) {
      j++;
    } else {
      result.push(nums1[i]);
      i++;
      j++;
    }
  }
  return result;
};

console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4]));
console.log(intersection([1, 2, 2, 3], [2, 2]));
console.log(intersection([1, 2, 2, 1], [2, 2]));
// console.log(Array.from(new Set([1, 2, 2, 3])));
