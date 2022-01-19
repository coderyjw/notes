function missingNumber(number) {
  const len = number.length
  let num = len * (len + 1) / 2
  for(let i = 0;i < len; i++) {
    num -= number[i]
  }
  return num
}

// console.log(missingNumber([3,0,1]));
// console.log(missingNumber([0, 1]));
// console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
// console.log(missingNumber([0]));