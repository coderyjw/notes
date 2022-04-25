function query(data) {
  if (!(this instanceof query)) return new query(data);
  this.wrapper = data;
  this.callbcakFnStack = [];
}

query.prototype.where = function (predicate) {
  const _where = function (predicate) {
    const len = this.wrapper.length;
    const _newArr = [];
    if (typeof predicate !== "function") {
      throw new Error("传入的参数必须是函数");
    }
    for (let i = 0; i < len; i++) {
      if (predicate.call(this.wrapper, this.wrapper[i], i)) {
        if (typeof this.wrapper[i] === "object") {
          _newArr.push({ ...this.wrapper[i] });
        } else {
          _newArr.push(this.wrapper[i]);
        }
      }
    }
    this.wrapper = _newArr;
    return this;
  };
  this.pushCallBack(_where.bind(this, predicate));
  return this;
};

query.prototype.orderBy = function (key, desc) {
  const _orderBy = function (key, desc) {
    this.wrapper.sort((pre, next) => {
      if (typeof pre[key] === "string") {
        if (desc) return next[key].localeCompare(pre[key]);
        return pre[key].localeCompare(next[key]);
      } else if (typeof pre[key] === "number") {
        if (desc) return next[key] - pre[key];
        return pre[key] - next[key];
      } else if (typeof pre[key] === "object" && pre[key] != null) {
        throw new Error("目前暂不支持为属性为对象排序");
      }
    });
    return this;
  };
  this.pushCallBack(_orderBy.bind(this, key, desc));
  return this;
};

query.prototype.groupBy = function (key) {
  const _groupBy = function (key) {
    const res = [];
    this.wrapper.forEach((n) => {
      res[n[key]] = res[n[key]] ? [...res[n[key]], n] : [n];
    });
    this.wrapper = Object.values(res)
    return this;
  };
  this.pushCallBack(_groupBy.bind(this, key));
  return this;
};

query.prototype.execute = function () {
  this.callbcakFnStack.forEach((cb) => cb());
  return this.wrapper;
};

query.prototype.pushCallBack = function (cb) {
  this.callbcakFnStack.push(cb);
};

const data = [
  { name: "foo", age: 16, city: "shanghai" },
  { name: "bar", age: 24, city: "hangzhou" },
  { name: "fiz", age: 22, city: "shanghai" },
  { name: "baz", age: 19, city: "hanzghou" },
  { name: "bae", age: 23, city: "hangzhou" },
];

const _ = query(data)
  .where((item) => item.age > 18)
  .orderBy("name")
  .groupBy("city")
  .execute();

console.log(_);
