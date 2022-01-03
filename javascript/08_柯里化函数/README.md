---
theme: smartblue
highlight: vs2015
---
# 1. 前言
还记得上次面试，面试官问我知不知道什么是柯里化函数，我当时第一反应是"哈？什么函数？没听说过"。

![51C88BBC.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ded1bf777f30481c9c87e4fe4eb52189~tplv-k3u1fbpfcp-watermark.image?)

2333，今天就来搞明白一下吧。

# 2. 什么是柯里化?
1. 柯里化(英语：Currying)是函数式编程里一个非常重要的概念
2. 是把接受**多个参数的函数**，变成**接受一个单一参数**（最初函数的第一个参数）的函数，并且**返回接受余下的参数**，而且**返回结果的新函数**的技术
3. 柯里化声称"**如果你固定某些参数，你将得到接受余下参数的一个函数**"

- 举个例子
1. 函数foo接受四个参数 返回这四个参数的和

2. 函数bar接受一个参数a返回一个函数，返回的函数又接受一个参数b返回一个函数,返回的函数又接受一个参数c返回一个函数,返回的函数又接受一个参数d返回a + b + c + d

```javascript
function foo(a,b,c,d) {
  return a + b + c + d
}

function bar(a) {
  return function(b) {
    return function(c) {
      return function(d) {
        return a + b + c + d
    }
  }
}
foo(1,2,3,4) // 10
bar(1)(2)(3)(4) // 10
```
**将函数foo变成bar函数的过程就叫柯里化**

上面的bar函数可以简写成
```javascript
const bar = a => b => c => d => a + b + c + d
```
# 3. 为什么需要柯里化？
## 3.1 单一职责的原则
- 在函数式编程中，我们其实往往希望**一个函数处理的问题尽可能的单一**，而**不是将一大堆的处理过程交给一个函数来处理**；
- 那么**我们是否就可以将每次传入的参数在单一的函数中进行处理**，处理完后就在**下一个函数中再使用处理后的结果**

我们把上面的例子改一下
现在我们需要对函数参数做一些操作，a = a +2 ,b = b * 2, c = -c
如果全都写在一个函数中是下面这样的
```JAVASCRIPT
function add (a,b,c) {
  a = a + 2
  b = b * 2
  c = -c
  return a + b + c
}
```
而柯里化后
```javascript
function add(a,b,c) {
  a = a + 2
  return function(b,c) {
    b = b * 2
    return function(c) {
      c = -c
      return a + b + c
    }
  }
}
```
很明显，柯里化后的函数单一性更强了，比如在最外层函数的逻辑就是对a进行操作，第二层函数就是对b进行操作，最内层就是对c进行操作

**这是柯里化的第一个好处：更具有单一性**

## 3.2 逻辑的复用
我们简化一下第一个例子，现在需要一个加法函数
```javascript
function add(a,b){
  return a + b
}
add(5,1)
add(5,2)
add(5,3)
add(5,4)
```
可以发现每次都是5加上另一个数字，每次都要传5其实是没必要的
- 柯里化的优化
```javascript
function add(a,b) {
  // 复用的逻辑
  console.log("+",a)
  return function(b) {
    return a + b
  }
}

const add5 = add(5)
add5(2)
add5(3)
add5(5)
```
可以看到在外层的函数中的代码被复用了，也可以说是定制化了一个加5的函数

# 4. 柯里化函数的实现
- 上面的几个例子都是我们手动写的柯里化函数。
- 有没有办法写一个函数 传入一个函数自动的返回一个柯里化函数？
```javascript
function currying(fn) {
  function curried(...args) {
    // 判断当前已接收的参数个数是否与fn函数一致
    // 1.当已经传入的参数数量 大于等于 需要的参数时，就执行函数
    if(args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      // 2.没达到个数时，需要返回一个新的函数，继续来接受参数
      return function curried2(...args2) {
        // 接收到参数后，需要递归调用curried来检查函数的个数是否达到
        return curried.apply(this, [...args, ...args2])
      }
    }
  }
  return curried
}

function add (a,b,c,d) {
  return a + b + c + d
}

const curryingFn = currying(add)
console.log(curryingFn(1)(2)(3)(4)) // 10
console.log(curryingFn(1, 2)(3)(4)) // 10
console.log(curryingFn(1, 2, 3)(4)) // 10
console.log(curryingFn(1, 2, 3, 4)) // 10
```