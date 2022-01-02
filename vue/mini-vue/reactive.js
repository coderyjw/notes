// 保存当前需要收集的响应式函数
let activeReactiveFn = null

class Depend {
  constructor() {
  //  使用Set来保存依赖函数, 而不是数组[]
    this.reactiveFns = new Set()
  }
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
  depend() {
    if(activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }
}

// WeakMap({key(对象): value}), key是个对象，弱引用(当将key设置为null时，key被垃圾回收机制回收，对应的value也会被回收)
const targetMap = new WeakMap()
// 封装一个获取depend函数
function getDepend(target, key) {
// 根据target对象获取map的过程
  let map = targetMap.get(target)
  if(!map) {
    map = new Map()
    targetMap.set(target, map)
  }
 // 根据key获取depend对象
  let depend = map.get(key)
  if(!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

// 封装一个响应式的函数
function watchEffect(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 根据target.key获取对应的depend
      // 做依赖收集
      const depend = getDepend(target, key)
      depend.depend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue , receiver) {
      Reflect.set(target, key, newValue, receiver)
      // 监听对象变化做出响应
      const depend = getDepend(target, key)
      depend.notify()
    }
  })
}

