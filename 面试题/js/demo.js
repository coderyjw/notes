const obj = {
  a: 1,
  __proto__: {
    b: 2
  }
}

for(const key in obj) {
  console.log(key)
}
console.log(obj, obj.hasOwnProperty('a'))


