function isObject(value) {
  const type = typeof value
  return (value !== null) && (type === 'object' || type === 'function')
}

function deepClone(originValue, map = new WeakMap()) {

  // 判断是否是Date类型
  if(originValue instanceof Date) {
    return new Date(originValue.getTime())
  }

  // 判断是否是Set类型(浅拷贝)
  if(originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断是否是Map类型(浅拷贝)
  if(originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 如果传入的是一个Symbol对象,那么创建一个新的Symbol
  if(typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  
  // 如果传入的是函数，那么直接使用同一个函数
  if(typeof originValue === 'function') {
    return originValue
  }

  // 如果传入的只是一个基本类型值， 那么直接返回
  if(!isObject(originValue)) {
    return originValue
  }
  if(map.has(originValue)) {
    return map.get(originValue)
  }

  // 判断传入的是数组还是对象
  let newObj = Array.isArray(originValue) ? [] : {}
  map.set(originValue, newObj)
  for(const key in originValue) {
    newObj[key] = deepClone(originValue[key], map)
  }

  // 对key是Symbol类型的属性做处理,key是Symbol 因为for...in是取不到的
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for(const key of symbolKeys) {
    newObj[key] = deepClone(originValue[key], map)
  }

  return newObj
}

const s1 = Symbol('aaa')
const s2 = Symbol('bbb')

const obj = {
  name: 'zhangsan',
  age: 22,
  friends: ['lisi', 'wangwu'],
  address: {
    city: 'hangzhou',
    district: 'xihuqu'
  },
  eating: function() {
    console.log(this.name + ' is eating')
  },
  createTime: new Date(),
  [s1]: 'abc',
  s2: s2,
  set: new Set([1,2,3]),
  map: new Map([['aaa', 111],['bbb', 222]]),
}

obj.info = obj 

const newObj = deepClone(obj)
console.log(newObj)

obj.address.city = 'beijing'
obj.friends[1] = 'zhaosi'
console.log(obj.s2 === newObj.s2)

console.log( deepClone(null))
