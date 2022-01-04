/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
  let count = 0
  const mergeSort = function(nums) {
    const length = nums.length
    if (length < 2) {
      return nums
    }
    const mid = Math.floor((length / 2))  
    const leftArr = nums.slice(0, mid)  
    const rightArr = nums.slice(mid)
    return merge(mergeSort(leftArr), mergeSort(rightArr))
  }
  
  const merge = function(leftArr, rightArr) {
    const result = []
    let leftIndex=0,rightIndex=0
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
  
    while(leftIndex < leftLength) {
      result.push(leftArr[leftIndex++])
    }
  
    while(rightIndex < rightLength) {
      result.push(rightArr[rightIndex++])
    }
    return result
  }
  mergeSort(nums)
  return count
};

console.log(reversePairs([1, 3, 5, 7, 9, 8, 4, 2, 6, 10 ]))

