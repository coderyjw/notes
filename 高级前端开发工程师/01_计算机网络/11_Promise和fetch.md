# 1. Promise 神器
pending
fulfilled
rejected
```javascript
class Promise {
  constructor(executor) {
    this.state = "pending";
    this.onFulfills = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.value = value;
        this.state = "fulfilled";

        for (let [onFulfilled, resolve] of this.onFulfills) {
          const x = onFulfilled(this.value);
          resolve(x);
        }
      }
    };

    const reject = (reason) => {
      this.reason = reason;
      this.state = "rejected";
    };

    executor(resolve, reject);
  }

  then(onFulfilled) {
    return new Promise((resolve, reject) => {
      switch (this.state) {
        case "pending":
          this.onFulfills.push([onFulfilled, resolve]);
          break;
        case "fulfilled":
          const x = onFulfilled(this.value);
          resolve(x);
          break;
      }
    });
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 2000);
});

async function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
promise
  .then((res) => {
    console.log(res);
    return "abc";
  })
  .then((res) => {
    console.log(res);
  });

```

# 2. fetch 的基本用法
Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。它还提供了一个全局 fetch() 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。这种功能以前是使用 XMLHttpRequest 实现的。Fetch 提供了一个更理想的替代方案。
```javascript
const fetch = require("node-fetch");

fetch("http://www.baidu.com", {
  method: "GET",
  headers: {},
}).then((res) => {
  console.log * res;
});


```
# 3. fetch 和 Promise 场景举例
- 指数补偿 应对不稳定的网络环境
- 并发处理和时间窗口