# 1. 迭代器Iterator

## 1.1 什么是迭代器？

定义：迭代器是帮助我们对某个数据结构进行遍历的对象。

在javascript中，迭代器也是一个具体的对象，这个对象更需要符合迭代器协议

1. 迭代器协议(iterator protocol)：

   - 迭代器协议定义了**产生一系列值的标准方式**；

   - 在js中这个标准就是一个特定的**next**方法；

2. next方法：

   - 一个**无参数或者一个参数**的函数，返回一个应当拥有**以下两个属性的对象**：
     - done: 如果迭代器可以产生序列中的下一个值则为false；如果已经将序列迭代完毕，则为true;
     - value: 迭代器返回的任何值，done为true时可省略;

示例1：一个简单的迭代器

```javascript
const iterator = {
  next: function() {
    return { done: true, value: 123}
  }
}
```

上面的iterator就是一个最简单的迭代器，但是我们知道迭代器是帮助我们遍历某个数据结构的，所以这个迭代器看起来是没什么用的。

示例2： 一个能遍历数组的迭代器

```javascript
const names = ['zhangsan', 'lisi', 'wangwu']

let index = 0
const namesIterator = {
  next: function() {
    if(index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true, value: undefined}
    }
  }
}
```

上面创建了一个namesIterator迭代器，能对names数组进行迭代遍历，使用方法是一次调用next方法

```javascript
console.log(namesIterator.next()) // { done: false, vlaue: 'zhangsan' }
console.log(namesIterator.next()) // { done: false, vlaue: 'lisi' }
console.log(namesIterator.next()) // { done: false, vlaue: 'wangwu' }
console.log(namesIterator.next()) // { done: true, value: undefined }
console.log(namesIterator.next()) // { done: true, value: undefined }
```

到这，我们其实应该对迭代器的定义有了初步的认识了。

- 但是上面的代码整体来说看起来有点奇怪：
  - 获取数组的时候，需要创建一个Index变量，再创建一个所谓的迭代器对象；
  - 事实上我们可以对上面的代码进行进一步的封装，让其变成一个可迭代对象；

## 1.2 什么是可迭代对象？

- 可迭代对象：当一个对象实现了可迭代协议（iterable protocol）就是一个可迭代对象   **注意不要和迭代器协议(iterator protocol)搞混了**。

- 可迭代协议：要求对象必须实现@@iterator方法，在代码中我们使用Sysmbol.iterator访问该属性；并且要求这个函数返回一个迭代器

示例3：将示例2转换成一个可迭代对象

```javascript
const iterableObj = {
  names: ['zhangsan', 'lisi', 'wangwu'],
  [Symbol.iterator]: function() {
    let index = 0
    return {
      next: () => { // 一定要是箭头函数，this指向iterableObj才能访问到names属性
        if(index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined}
        }
      }
    }
  }
}
```

上面的iteratorObj就是一个**可迭代对象** ，因为它有一个Symbol.iterator属性， 并且返回一个迭代器

使用

```JAVASCRIPT
const iterator = iterableObj[Symbol.iterator]() // 调用这个函数返回一个迭代器
console.log(iterator.next()) // { done: false, vlaue: 'zhangsan' }
console.log(iterator.next()) // { done: false, vlaue: 'lisi' }
console.log(iterator.next()) // { done: false, vlaue: 'wangwu' }
console.log(iterator.next()) // { done: true, value: undefined }
console.log(iterator.next()) // { done: true, value: undefined }
```

## 1.3 可迭代对象的应用

### 1.3.1 讲一下for...of..

- **`for...of`语句**可以看成是一种语法糖，这种语法糖的作用是**循环调用可迭代对象自定义的迭代器的next方法**，当done时false的时候返回value,done是true的时候循环停止。

- **`for...in`语句**是遍历一个对象的除Symbol以外的可枚举属性

**for...of..可以遍历的东西必须是可迭代对象**，之前不懂老是把for...in和for..of...搞混了,会写下面这样的代码

示例4

```javascript
const obj = {
  name: 'zhangsan',
  age: 20
}

// 输出name age
for(const key in obj) {
  console.log(key)
}

// 遍历obj报错 *TypeError: obj is not iterable* 因为obj不是可迭代对象
for(const key of obj) {
  console.log({key})
}

// 输出zhangsan lisi wangwu,因为iteratorObj是可迭代对象
for(const key of iteratorObj) {
  console.log({key})
}
```


示例5：arr是一个Array对象，它内部已经实现了 Symbol.iterator方法，所以可以用for...of遍历

```javascript
const arr = ['zhangsan', 'lisi', 'wangwu']
const iterator = arr[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
```

javascript内置创建可迭代对象： [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)，[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)，[`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，[`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments)

### 1.3.2 解构操作

- 对于数组的解构本质是使用迭代器

```javascript
const [name, age] = ['zhangsan', 20]
```

- 对于对象的解构是ES9中新增的特性：用的不是迭代器

```javascript
const { name } = obj
```



# 2. 生成器Generator

## 2.1 什么是生成器？

定义：生成器是ES6中新增的一种**函数控制、使用**的方案，它让我们更加灵活的**控制函数什么时候执行、暂停执行**等。

生成器是和函数结合在一起的，一般我们并不会直接去说生成器，因为生成器是由生成器函数生成的

**生成器是特殊的迭代器**

## 2.2 什么是生成器函数?

1. 生成器函数需要在function后面加一个*
2. 生成器函数通过yield控制代码的执行流程
3. 生成器函数返回一个生成器

示例6：一个简单的生成器函数foo，执行返回一个生成器generator

```javascript
function * foo() {
  console.log("step 1")
  yield
  console.log("step 2")
  yield
  console.log("step 3")
}

const generator = foo() // 函数内部不执行 返回一个生成器函数
```

## 2.3 生成器函数的执行

- 可以发现上面执行foo函数，函数执行体根本没有执行，他只是返回了一个生成器对象
  - 那么如何让它执行函数的东西呢，调用next方法即可
  - 生成器是特殊的迭代器，迭代器的next是会有返回值的
  - 可以通过yield来返回结果

示例7: 生成器函数的执行

```javascript
function * foo() {
  yield 'yield1'
  yield 'yield2'
}

const generator = foo() // 函数内部不执行 返回一个生成器函数

//执行第一个yield并暂停
console.log(generator.next()) // { value: 'yeild 1', done: false }
//执行第二个yield并暂停
console.log(generator.next()) // { value: 'yeild 2', done: false }
//执行第三个yield并暂停
console.log(generator.next()) // { value: undefined, done: true }
```



## 2.4 生成器传递参数 – next函数

-  我们在调用next函数的时候，可以给它传递参数，那么这个参数会作为上一个**yield语句的返回值**

示例7:

```javascript
function * foo() {
 	const next1 = yield 'yeild 1'
  console.log({ next1 }) // { next1: 'next1' }
  const next2 =  yield 'yeild 2'
  console.log({ next2 }) // { next2: 'next2' }
}

const generator = foo() // 函数内部不执行 返回一个生成器函数

//执行第一个yield并暂停
console.log(generator.next()) // { value: 'yeild 1', done: false }
//执行第二个yield并暂停
console.log(generator.next('next1')) // { value: 'yeild 2', done: false }
//执行第三个yield并暂停
console.log(generator.next('next2')) // { value: undefined, done: true }
```

