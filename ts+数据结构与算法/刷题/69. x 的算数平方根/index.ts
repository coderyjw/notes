function mySqrt(x: number): number {
  let i: number = 0;
  while (i * i <= x) {
    i++;
  }

  return i - 1;
}

console.log(mySqrt(8));
