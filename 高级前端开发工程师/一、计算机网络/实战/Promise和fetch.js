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

const fetch = require("node-fetch");

fetch("http://www.baidu.com", {
  method: "GET",
  headers: {},
}).then((res) => {
  console.log * res;
});
