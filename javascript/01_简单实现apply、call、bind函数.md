---
highlight: a11y-dark
theme: channing-cyan
---
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
  
  // 4. 删除属性，避免污染
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

  // 3. 隐式绑定 调用函数 改变this的指向
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


## 4. new关键字

### 4.1先说new做了什么
1. 创建一个空对象obj
2. 将该对象的原型指向构造函数的原型
3. 将这个新对象绑定到函数的this上 
4. 执行构造函数，把构造函数的属性添加到新对象；
5. 返回该对象

```javascript
function _new(TargetClass, ...args) {
  // 1. 创建空对象，并将新对象的__proto__属性指向构造函数的prototype
	const obj = Object.create(TargetClass.prototype)
  // 2. 执行构造函数，改变构造函数的this指针，指向新创建的对象（新对象也就有了构造函数的所有属性）
  TargetClass.apply(obj, args)
  return obj
}
```

测试一下
```javascript
function Student(name, age) {
  this.name = name
  this.age = age
}


Student.prototype.bar = function() {
  console.log('bar:', this, this.name, this.age );
}

const stu = _new(Student, 'yjw', 22)

console.log(stu);
stu1.bar()
```


