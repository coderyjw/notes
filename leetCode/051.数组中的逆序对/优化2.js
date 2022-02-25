/**
 * @param {number[]} nums
 * @return {number}
 */
// 1 3 5 7 9 8 4 2 6 10 
// 14
var reversePairs = function(nums) {
  let count = 0
  const mergeSort = function(nums) {
    const length = nums.length
    if (length < 2) {
      return nums
    }
    const mid = length >> 1 // 改用位运算提高效率比 
    const leftArr = nums.slice(0, mid)  
    const rightArr = nums.slice(mid)
    return merge(mergeSort(leftArr), mergeSort(rightArr))
  }
  
  const merge = function(leftArr, rightArr) {
    const result = []
    let [leftIndex, rightIndex] = [0,0]
    const leftLength = leftArr.length
    const rightLength = rightArr.length
    while(leftIndex < leftLength && rightIndex < rightLength) {
      if(leftArr[leftIndex] <= rightArr[rightIndex]) {
        result.push(leftArr[leftIndex++])
      } else {
        count += (leftLength - leftIndex )
        result.push(rightArr[rightIndex++])
      }
    } 
    result.push(...leftArr.slice(leftIndex))
    result.push(...rightArr.slice(rightIndex))
    return result
  }
  mergeSort(nums)
  return count
};
console.log(reversePairs([1, 3, 5, 7, 9, 8, 4, 2, 6, 10 ]))