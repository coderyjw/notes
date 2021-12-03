## 1. call

```javascript
Function.prototype.myCall = function(thisArg, ...args) {
  // 1. 判断传入的参数thisArg是否为空 不为空转换成对象 为空则赋值为全局变量
  thisArg = thisArg ? Object(thisArg) : (
    typeof window !== 'undefined' ? window : global
  )
  // 2. 这里的this就是指要改变this指向的函数 本例中指foo函数
  thisArg._fn = this

  // 3. 隐式绑定 调用函数 改变thi的指向
  const result = thisArg._fn(...args)
  
  // 4. // 删除属性，避免污染
  delete thisArg._fn
  
  // 5. 返回结果
  return result
}


function foo() {
  console.log(this);
}

const obj = {
  foo
}

foo() // global
foo.myCall(obj) // { foo: [Function: foo], _fn: [Function: foo] }
foo.myCall() // global

```



## 2. apply

```javascript
Function.prototype.myApply = function(thisArg, args) {
  // 1. 判断传入的参数thisArg是否为空 不为空转换成对象 为空则赋值为全局变量
  thisArg = thisArg ? Object(thisArg) : (
    typeof window !== 'undefined' ? window : global
  )
  
  // 2. 这里的this就是指要改变this指向的函数 本例中指foo函数
  thisArg._fn = this

  // 3. 隐式绑定 调用函数 改变thi的指向
  if(!args) {
    thisArg._fn()
  } else {
    var result = thisArg._fn(...args)
  }
  

  // 3. 删除属性，避免污染
  delete thisArg._fn

  // 5. 返回结果
  return result
}
```



## 3. bind

```javascript
Function.prototype.myBind = function(thisArg, ...bindArgs) {
  // 1. 判断传入的参数thisArg是否为空 不为空转换成对象 为空则赋值为全局变量
  thisArg = thisArg ? Object(thisArg) : (
    typeof window !== 'undefined' ? window : global
  )

  thisArg._fn = this

  return function(...newArgs) {
    const args = [...bindArgs, ...newArgs]
    return thisArg._fn(...args)
  }
}
```

