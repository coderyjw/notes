## 1. async/await 的本质

之前一直只知道async/await怎么用，只知道写在await后的代码就和写在promise的then里面差不多，但是一直不知道它内部的本质是啥。今天终于搞懂了记录一下

async/await的本质其实就是Generator和Promise的语法糖



## 2.  async/await的使用

```javascript
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 1000)
  })
}

async function foo() {
  const res1 = await requestData('aaa')
  const res2 = await requestData(res1 + 'bbb')
  const res3 = await requestData(res2 + 'ccc')
  console.log(res3)
}

foo()
```

上面我们先定义了一个模拟异步请求数据的函数foo 再用async await调用。

这段代码应该是过3秒钟打印aaabbbccc

## 3. 用Generate函数实现

上面的 foo函数用Generate代替应该是下面这个样子的

```javascript
function* generatorFoo() {
	const res1 = yield requestData('aaa')
  const res2 = yield requestData(res1 + 'bbb')
  const res3 = yield requestData(res2 + 'ccc')
  console.log(res3)
}

generatorFoo()
```

但是很显然上面的生成器函数返回的是一个生成器，不调用next方法不可能执行内部代码，那怎样才能实现上面async/await的结果呢?

就是下面这样

```javascript
const generate = generatorFoo()
generate.next().value.then(res1 => {
  generate.next(res1).value.then(res2 => {
    generate.next(res2).value.then(res3 => {
      generate.next(res3)
    })
  })
})
```

解释一下上面的代码

第一行：调用生成器函数返回一个生成器

第二行：调用next方法执行generatorFoo第一个yield，返回promise给生成器（在生成器的value属性里），然后再调用promise的then方法获取requestData('aaa')异步请求的数据

第三行：生成器generate调用next方法执行第二个yield，但是这次传递了第一次请求的数据作为参数。第二个yield执行后也会返回一个promise给生成器（在生成器的value属性里），然后再调用promise的then方法获取requestData(res1 + 'bbb')异步请求的数据

第四行：跟第三行一样

第五行： 生成器generate调用next方法将异步请求的res传回去 执行最后的console.log(res3)



## 4. 最终

上面的代码需要我们手动写死调用几次next方法，其实我们可以进行一下自动化封装

```javascript
function execGenerator(generatorFn) {
  const generator = generatorFn()
  function exec(res) {
    const result =  generator.next(res)
    if(result.done) {
      return result.value
    }
    result.value.then(res => {
      exec(res)
    })
  }
  exec()
}
execGenerator(foo)
```

上面封装了一个execGenerator自动化函数，接收一个生成器函数

里面的逻辑是一个递归的逻辑。封装了一个函数exec，在里面执行生成器的next方法，如果生成器返回值的done属性是false，则一直递归的调用exec函数，属性为true则返回并结束。

