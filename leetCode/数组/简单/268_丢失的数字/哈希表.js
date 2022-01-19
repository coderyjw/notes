function missingNumber(number) {
  const set = new Set(number)
  const len = number.length
  for(let i = 0; i <= len; i++) {
    if(!set.has(i)) {
      return i
    }
  }
}

// console.log(missingNumber([3,0,1]));
// console.log(missingNumber([0, 1]));
// console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
console.log(missingNumber([0]));