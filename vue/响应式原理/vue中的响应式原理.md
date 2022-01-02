## 1. 什么是响应式?

响应式最基本的理解就是可以自动响应数据变化的代码机制。

比如：下面这段代码，初始化了一个 m 变量，第 2 行代码使用了 m，那么在 m 有一个新值得时候，第 2 行代码要可以自动重新执行。

示例 1:

```javascript
let m = 20;
console.log(m);

m = 40;
```

对象的响应式

```javascript
// 响应式对象
let obj = {
  name: "yjw",
};

// 打印obj.name
coneole.log(obj.name);

// 改变obj是应该重新打印obj.name
obj.name = "null";
```

在 vue 中最直接的体现就是 watch、reactive 函数了

```javascript
watch: {
    data(){
        console.log('data发生了变化')
    }
}
```

## 2. vue2 中实现

```javascript
// 保存当前需要收集的响应式函数
let activeReactiveFn = null;

class Depend {
  constructor() {
    //  使用Set来保存依赖函数, 而不是数组[]
    this.reactiveFns = new Set();
  }
  notify() {
    this.reactiveFns.forEach((fn) => {
      fn();
    });
  }
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }
}

// WeakMap({key(对象): value}), key是个对象，弱引用(当将key设置为null时，key被垃圾回收机制回收，对应的value也会被回收)
const targetMap = new WeakMap();
// 封装一个获取depend函数
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  // 根据key获取depend对象
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

// 封装一个响应式的函数
function watchEffect(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

function reactive(obj) {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        // 做依赖收集
        const depend = getDepend(target, key);
        depend.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
        // 监听对象变化做出响应
        const depend = getDepend(target, key);
        depend.notify();
      },
    });
  });
}
```

测试

```javascript
const objProxy = reactive({
  name: "yjw",
  age: 22,
});
watchEffect(function () {
  console.log("模拟watch1----, name属性发生变化");
  objProxy.name;
  console.log("do Somethings1");
});
watchEffect(function () {
  console.log("模拟watch2----,age属性发生变化");
  objProxy.age;
  console.log("do Somethings2");
});

console.log("-----------------------------");
objProxy.name = "coder";
objProxy.age = 18;
```

## 3.vue3 中实现

只要把 reactive 中 Object.defineProperty 实现换成 Proxy 就行了

```javascript
// 保存当前需要收集的响应式函数
let activeReactiveFn = null;

class Depend {
  constructor() {
    //  使用Set来保存依赖函数, 而不是数组[]
    this.reactiveFns = new Set();
  }
  notify() {
    this.reactiveFns.forEach((fn) => {
      fn();
    });
  }
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }
}

const targetMap = new WeakMap();
// 封装一个获取depend函数
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  // 根据key获取depend对象
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

// 封装一个响应式的函数
function watchEffect(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 根据target.key获取对应的depend
      // 做依赖收集
      const depend = getDepend(target, key);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver);
      // 监听对象变化做出响应
      const depend = getDepend(target, key);
      depend.notify();
    },
  });
}
```

测试

```javascript
const objProxy = reactive({
  name: "yjw",
  age: 22,
});
watchEffect(function () {
  console.log("模拟watch1----, name属性发生变化");
  objProxy.name;
  console.log("do Somethings1");
});
watchEffect(function () {
  console.log("模拟watch2----,age属性发生变化");
  objProxy.age;
  console.log("do Somethings2");
});

console.log("-----------------------------");
objProxy.name = "coder";
objProxy.age = 18;
```
