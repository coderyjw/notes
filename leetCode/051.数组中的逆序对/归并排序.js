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
  
    while(leftArr.length && rightArr.length) {
      if(leftArr[0] <= rightArr[0]) {
        result.push(leftArr.shift())
      } else {
        count += leftArr.length
        result.push(rightArr.shift())
      }
    } 
  
    while(leftArr.length) {
      result.push(leftArr.shift())
    }
  
    while(rightArr.length) {
      result.push(rightArr.shift())
    }
    return result
  }
  mergeSort(nums)
  return count
};

console.log(reversePairs([1, 3, 5, 7, 9, 8, 4, 2, 6, 10 ]))