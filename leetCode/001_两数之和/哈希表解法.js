const twoSum = function(nums, target) {
  const length = nums.length
  const map = new Map()

  for(let i = 0; i < length; i++) {
    const needNum = target - nums[i]
    if(map.has(needNum)) {
      return [map.get(needNum), i]
    }
    map.set(nums[i], i)
  }
}

console.log(twoSum([2,7,11,15], 9))