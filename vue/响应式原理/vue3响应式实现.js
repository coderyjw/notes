class Depend {
  constructor() {
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

const targetMap = new WeakMap()
function getDepend(target, key) {
  let map = targetMap.get(target)
  if(!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  let depend = map.get(key)
  if(!depend) {
    depend = new Depend()
    map.set(key, depend)
  }

  return depend
}

let activeReactiveFn = null
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
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


const objProxy = reactive({
  name: 'yjw',
  age: 22
})
watchFn(function() {
  console.log('模拟watch1----, name属性发生变化')
  objProxy.name
  console.log('do Somethings1')
})
watchFn(function() {
  console.log('模拟watch2----,age属性发生变化')
  objProxy.age
  console.log('do Somethings2')
})

console.log('-----------------------------')
objProxy.name = 'coder'
objProxy.age = 18