/**
 * 归并排序：一种典型的分而治之思想的算法
 * 时间复杂度：O(nlogn)   
 * 空间复杂度：O(n).   
 * 是否稳定： 是
 * @param {number[]} nums
 * @returns {number[]}
 */
function mergeSort(nums) {
  const result = []

  if(nums.length < 2) {
    return nums
  }
  const mid = nums.length >> 1
  const leftArr = mergeSort(nums.slice(0, mid))
  const rightArr = mergeSort(nums.slice(mid))
  
  let leftIndex = rightIndex = 0
  const leftLength = leftArr.length
  const rightLength = rightArr.length

  while(leftIndex < leftLength && rightIndex < rightLength) {
    if(leftArr[leftIndex] <= rightArr[rightIndex]) {
      result[leftIndex + rightIndex] = leftArr[leftIndex++]
    } else {
      result[leftIndex + rightIndex] = rightArr[rightIndex++]
    }
  }

  while(leftIndex < leftLength) {
    result[leftIndex + rightIndex] = leftArr[leftIndex++]
  }

  while(rightIndex < rightLength) {
    result[leftIndex + rightIndex] = rightArr[rightIndex++]
  }
  return result
}

console.log(mergeSort([3,5,7,8,6,2,1,9,0,4]));
