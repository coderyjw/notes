/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(numbers, target) {
  const len = numbers.length
  for(let i = 0; i < len - 1; i++) {
    let left = i + 1
    let right = len - 1
    const needNum = target - numbers[i]
    while(left <= right) {
      const mid = (left + right) >> 1
      if(numbers[mid] === needNum) {
        return [i + 1, mid + 1]
      }else if(numbers[mid] < needNum) {
        left = mid + 1
      } else if(numbers[mid] > needNum) {
        right = mid - 1
      }
    }
  }
};

console.log(twoSum([2,7,11,15], 9))