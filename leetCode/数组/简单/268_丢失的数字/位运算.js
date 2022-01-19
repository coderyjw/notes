function missingNumber(number) {
  let n = 0
  const len = number.length
  for(let i = 0; i < len; i++ ) {
    n ^= number[i] ^= i
  }
  return n ^= len
}

// console.log(missingNumber([3,0,1]));
// console.log(missingNumber([0, 1]));
// console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
console.log(missingNumber([0]));