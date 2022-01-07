/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {

  let nums1Index = m - 1
  let nums2Index = n - 1
  while(nums1Index >=0 && nums2Index >= 0) {
    if(nums1[nums1Index] >= nums2[nums2Index]) {
      nums1[nums1Index + nums2Index + 1] = nums1[nums1Index--]
    } else {
      nums1[nums1Index + nums2Index + 1] = nums2[nums2Index--]
    }
  }

  while(nums2Index >= 0) {
    nums1[nums2Index] = nums2[nums2Index--]
  }
};

// merge([1,2,3,0,0,0], 3, [2,5,6], 3)
// merge([1], 1, [], 0)
merge([0], [1], 1)