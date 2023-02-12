function addBinary(a: string, b: string): string {
  const n1: number = a.length;
  const n2: number = b.length;
  if (n1 > n2) {
    b = b.padStart(n1, "0");
  } else {
    a = a.padStart(n2, "0");
  }

  const n: number = a.length;
  let ret: string = "";
  let d: number = 0;
  for (let i = n - 1; i >= 0; i--) {
    const temp = parseInt(a[i]) + parseInt(b[i]) + d;
    ret = (temp % 2) + ret;
    d = Math.floor(temp / 2);
  }
  if (d > 0) ret = d + ret;
  return ret;
}

console.log(addBinary("1010", "1011"));
