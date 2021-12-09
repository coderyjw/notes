// 参数中设置一个WeakMap用来保存
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

  // 判断是否是Smybol类型
  if(typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  if(originValue !== null && typeof originValue !== 'object') {
    return originValue
  }

  // 判断之前是否存过，如果有则直接获取返回
  if(map.has(originValue)) {
    return map.get(originValue)
  }

  const newObj = Array.isArray(originValue) ? [] : {}
  // 创建的newObj放到map里
  map.set(originValue, newObj)
  for(const key in originValue) {
    newObj[key] = deepClone(originValue[key], map)
  }

  // 对key是Symbol做处理
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
  address: {
    city: 'hangzhou'
  },
  friends: ['zhangsan', 'lisi'],
  set: new Set([1,2,3]),
  map: new Map([['aaa',111], ['bbb', '222']]),
  createTime: new Date(),
  eating: function() {
    console.log(this.name + ' is eating')
  },
  s1: s1,
  [s2]: {a: 1}
}

obj.info= obj
const newObj = deepClone(obj)
console.log(newObj)
