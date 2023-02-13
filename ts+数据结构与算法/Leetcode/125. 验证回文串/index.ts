function isPalindrome(s: string): boolean {
  s = s.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
  const ret = s.split("").reverse().join("");
  console.log(ret, s, ret === s);
  return ret === s;
}

console.log(isPalindrome("0P"));
