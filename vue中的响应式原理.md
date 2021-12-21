## 1. 什么是响应式 ？

响应式最基本的理解就是可以自动响应数据变量的代码机制。

比如：下面这段代码，初始化了一个m变量，第2行代码使用了m，那么在m有一个新值得时候，第2行代码要可以自动重新执行。

示例1:

```javascript
let m = 20
console.log(m)

m = 40
```

对象的响应式

```javascript
// 响应式对象
let obj = {
	name: 'yjw'
}

// 打印obj.name
coneole.log(obj.name)

// 改变obj是应该重新打印obj.name
obj.name = 'null'
```

## 2. 响应式函数封装 v-1

```javascript
let obj = {
	name: 'yjw'
}

const reativeFns = []

// 响应式函数
function watchFn(fn) {
	reativeFns.push(fn)
}

watchFn(function() {
  console.log(obj.name + 1)
})
watchFn(function() {
  console.log(obj.name)
})

obj.name = 'null'
reativeFns.forEach(fn => {
	fn()
})


```

上面watchFn是一个响应式函数，做法是用reativeFns数组来收集name属性发生变化所需要重新执行的函数，当name属性发生改变时手动执行所有收集的函数 

当然上面的响应式函数有很多很多的问题，下面来一个一个解决

## 3. 依赖收集类封装 v-2

**问题1**：v-1做到了对obj这一个对象中的一个name属性做响应式 ，实际上会有不止一个对象不止一个属性需要做响应式。每一个对象的每一个属性就要新创建一个数组进行管理，这是很不方便的

解决方法：使用类管理收集依赖 （类的对象更好管理）

```javascript
class Dep {
  constructor() {
    this.reativeFns = []
  }

  addDepend(fn) {
    this.reativeFns.push(fn)
  }

  notify() {
    this.reativeFns.forEach(fn => {
      fn()
    })
  }
}

// depend负责收集obj.name改变时要执行的函数
const depend = new Dep()

let obj = {
	name: 'yjw'
}

// 响应式函数 收集依赖
function watchFn(fn) {
	depend.addDepend(fn)
} 

watchFn(function() {
  console.log(obj.name + 1)
})
watchFn(function() {
  console.log(obj.name)
})


obj.name = 'null'
// 执行
depend.notify()
```

## 4.  自动监听对象变化v-3

**问题2**：v-2中是通过手动调用notify函数执行需要执行的函数，我们需要自动监听name的变化执行notify函数

如何监听:

1. Object.defineProperty (vue2使用)
2. Proxy  (vue3使用)

这里展示使用Proxy的方式

```javascript
class Dep {
  constructor() {
    this.reativeFns = []
  }

  addDepend(fn) {
    this.reativeFns.push(fn)
  }

  notify() {
    this.reativeFns.forEach(fn => {
      fn()
    })
  }
}

const depend = new Dep()

let obj = {
	name: 'yjw'
}

const objProxy = new Proxy(obj, {
  get(target, key, reciever) {
    return Reflect.get(target,key,reciever)
  },
  set(target,key, newValue, reciever) {
    Reflect.set(target,key,newValue)
    depend.notify()
  }
})


// 响应式函数
function watchFn(fn) {
	depend.addDepend(fn)
}

watchFn(function() {
  console.log('监听objProxy.name的变化', objProxy.name)
})


objProxy.name = 'null'
objProxy.name = '123'
objProxy.name = '2345'
```

 在objProxy的set捕捉器中调用notify方法，就可以做到修改name属性自动的执行收集的函数依赖

## 5. 依赖收集的管理v-4

问题：v-3中目前objProxy中所有属性修改都会自动执行收集的函数，这是不对的。而且不同对象的不同属性也应该加以区别。

解决方法：每一个属性对应一个depend对象