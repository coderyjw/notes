function missingNumber(number) {
  number.sort((a,b) => a - b)
  const len = number.length
  for(let i = 0; i < len; i++) {
    if(number[i] !== i) {
      return i
    }
  }
  return len
}

// console.log(missingNumber([3,0,1]));
// console.log(missingNumber([0, 1]));
// console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
console.log(missingNumber([0]));