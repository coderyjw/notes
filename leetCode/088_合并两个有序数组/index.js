/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let result = []
  let nums1Index = nums2Index = 0

  while(nums1Index < m && nums2Index < n) {
    if(nums1[nums1Index] <= nums2[nums2Index]) {
      result[nums1Index + nums2Index] = nums1[nums1Index++]
    } else {
      result[nums1Index + nums2Index] = nums2[nums2Index++]
    }
  }

  while(nums1Index < m) {
    result[nums1Index + nums2Index] = nums1[nums1Index++]
  }

  while(nums2Index < n) {
    result[nums1Index + nums2Index] = nums2[nums2Index++]
  }
  
  const length = result.length
  for(let i = 0; i < length; i++) {
    nums1[i] = result[i]
  }
};


// merge([1], 1, [], 0)
// merge([0], 0, [1], 1)
// merge([1,2,3,0,0,0], 3, [2,5,6], 3)
// console.log((merge([2, 0], 1, [1], 1)))

merge([1,2,3,0,0,0], 3, [2,5,6], 3)