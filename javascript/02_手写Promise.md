## 1. Promise的结构设计

```javascript
class MyPromise {
  /**
   * Promise规范定义 构造函数接收一个回调函数executor作为参数
   * 这个executor回调函数又接收两个回调函数作为参数 一个是resolve（成功时回调） 一个是reject（时表示回调）
   */
  constructor(executor) {
    // Promise 三种状态 分别是pending（进行中）、fulfilled（已成功）和rejected（已失败）
    this.status = 'pending' 
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if(this.status === 'pending') {
        // 调用resolve 状态改为fulfilled
        this.status = 'fulfilled'
        // 保存resolve回调的参数
        this.value = value
      }
    }

    const reject = (reason) => {
      if(this.status === 'pending') {
       // reject 状态改为rejected
        this.status = 'rejected'
        // 保存reject回调的参数
        this.reason = reason
      }
    }
		
    // 传入的回调函数是会直接执行的
    executor(resolve,reject)
  }

}
```



## 2. then方法的设计

```java
class MyPromise {
  constructor(executor) {
    this.status = 'pending' 
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if(this.status === 'pending') {
        // 延迟调用（微任务）
        queueMicrotask(() => {
        	this.status = 'fulfilled'
          this.value = value
          this.onFulfilled && this.onFulfilled(this.value)
        }, 0)
      }
    }

    const reject = (reason) => {
      if(this.status === 'pending') {
        // 延迟调用（微任务）
        queueMicrotask(() => {
        	this.status = 'rejected'
          this.reason = reason
          this.onRejected && this.onRejected(this.reason)
        }, 0)
      }
    }
		
    executor(resolve,reject)
  }

  then(onFulfilled, onRejected) {
    onFulfilled && this.onFulfilled = onFulfilled
    onRejected && this.onRejected = onRejected
  }
}

const promise = new MyPromise((resolve, reject) => {
  resolve('resolve')
  reject('reject')
})


promise.then(res => {
  console.log({res})
}, err => {
  console.log({err})
})
```

上面then方法还有几个点需要优化

1. 目前不支持多次调用（解决方法：将then方法中的回调函数保存到数组中）
2. 不支持链式调用 （解决方法: then方法中返回Promise）
3. 如果then方法在resolve已经执行后再执行，目前then中的方法不能调用 （解决方法：then方法中做判断，如果调用的时候状态已经确定下来，直接调用）

```javascript
setTimeout(() => {
	promise.then(res =>{
		console.log({res})
	})
}, 10000)
```



## 3. then方法的优化

```javascript
// 封装一个函数
const execFunctionWithCatchError = (exeFn, value, resolve, reject) => {
  try {
    const result = exeFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}


class MyPromise {
  constructor(executor) {
    this.status = 'pending' 
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectFns = []

    const resolve = (value) => {
      if(this.status === 'pending') {
        queueMicrotask(() => {
          if(this.status !== 'pending') return 
          this.status = 'fulfilled'
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn && fn(this.value)
          })
        }, 0)
      }
    }

    const reject = (reason) => {
      if(this.status === 'pending') {
        queueMicrotask(() => {
          if(this.status !== 'pending') return 
          this.status = 'rejected'
          this.reason = reason
          this.onRejectFns.forEach(fn => {
            fn && fn(this.reason)
          })
        }, 0)
      }
    }
		
    try {
      executor(resolve,reject)
    } catch(err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // 如果在then调用的时候状态已经确定下来，直接调用
      if(this.status === 'fulfilled' && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }

      // 如果在then调用的时候状态已经确定下来，直接调用
      if(this.status === 'rejected' && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      if(this.status === 'pending') {
        // 将成功的回调和失败的回调都放到数组中
        if(onFulfilled) this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if(onRejected) this.onRejectFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }
}

```



## 4. catch方法的实现

```javascript
catch(onRejected) {
  return this.then(undefined, onRejected)
}

then(onFulfilled, onRejected) {
  // 当onRejected为空时 我们手动抛出一个错误
  onRejected = onRejected || (err => { throw err })
  return new  return new MyPromise((resolve, reject) => {
    	...
  })
}
```

 

## 5. finally方法的实现

```javascript
finally(onFinally) {
  // 不管成功和失败都调用onFinally
  this.then(onFinally, onFinally)
}

then(onFulfilled, onRejected) {
  // 当onRejected为空时 我们手动抛出一个错误
  onRejected = onRejected || (err => { throw err })
   // 当onFulfilled为空时 将上一个promise的value传下去
  onFulfilled = onFulfilled || (value => value)
  return new  return new MyPromise((resolve, reject) => {
    	...
  })
}
```



## 6. resolve和reject的实现

```javascript
static resolve(value) {
	return new MyPromise((resolve) => resolve(value))
}

static reject(reason) {
	return new MyPromise((resolve, reject) => reject(reason))
}
```



## 7. all和allSettled的实现

1. all: 参数是一个promises数组 返回一个promise  

   在所有promise执行成功后返回所有promise结果的一个数组 有一个promise失败就reject

2. 不管有没有promise rejected，都返回所有promise结果

```javascript
static all(promises) {
  return new MyPromise((resolve, reject) => {
    const values = []
    promises.forEach(promise =>  {
      promise.then(res => {
        values.push(res)
        if(values.length === promises.length) {
          resolve(values)
        }
      }, err => {
        reject(err)
      })
    })
  })
}

static allSettled(promises) {
  return new MyPromise((resolve, reject) => {
    const result = []
    promises.forEach(promise =>  {
      promise.then(res => {
        result.push({state: 'resolved', value: res})
        if(result.length === promises.length) {
          resolve(result)
        }
      }, err => {
        result.push({state: 'rejected', reason: err})
        if(result.length === promises.length) {
          resolve(result)
        }
      })
    })
  })
}
```



## 8. race和any的实现

1. race: 返回一个 promise，只要一个promise有结果 立刻返回（竞赛）
2. any: 必须等到有一个正确的结果才返回， 没有正确的结果会返回一个合并的异常

```javascript
static race(promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(promise =>  {
      promise.then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  })
}

static any(promises) {
  return new MyPromise((resolve, reject) => {
    const reasons = []
    promises.forEach(promise =>  {
      promise.then(res => {
        resolve(res)
      }, err => {
        reasons.push(err)
        if(reasons.length === promises.length) {
          reject(reasons)
        }
      })
    })
  })
}
```

