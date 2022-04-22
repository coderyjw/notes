const queue = [];

// nextTick 方法实现
const nextTick = (cb) => {
  return Promise.resolve().then(cb);
};
const queueJob = (fn) => {
  if (!queue.includes(fn)) {
    queue.push(fn);
    nextTick(flushJobs);
  }
};

const flushJobs = () => {
  let job;

  while (queue.length > 0) {
    job = queue.shift();
    job && job();
  }
};

class Dep {
  constructor() {
    this.depends = new Set();
  }

  depend() {
    if (active) {
      this.depends.add(active);
    }
  }

  notify() {
    this.depends.forEach((fn) => queueJob(fn));
  }
}

// ref vue2 方法实现

const ref = (value) => {
  const dep = new Dep();
  const valueRef = Object.defineProperty({}, "value", {
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify();
    },
  });
  return valueRef;
};

const ref3 = (value) => {
  const dep = new Dep();
  const valueRef = new Proxy(
    { value },
    {
      get(obj, prop) {
        dep.depend();
        return obj[prop];
      },
      set(obj, prop, newValue) {
        obj[prop] = newValue;
        dep.notify();
      },
    }
  );
  return valueRef;
};

// reactive vue2 方法实现
const reactive = (value, dep = new Dep()) => {
  const _newValue = {};
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      if (typeof value[key] !== "object") {
        let _value = value[key];
        Object.defineProperty(_newValue, key, {
          get() {
            dep.depend();
            return _value;
          },
          set(newValue) {
            _value = newValue;
            dep.notify();
          },
        });
      } else {
        _newValue[key] = reactive(value[key]);
      }
    }
  }

  return _newValue;
};

// reactive vue3 方法实现
const reactive3 = (value, dep = new Dep()) => {
  let _newValue;
  for (const key in value) {
    if (typeof value[key] !== "object") {
      _newValue = new Proxy(value, {
        get(target, prop) {
          dep.depend();
          return target[prop];
        },
        set(target, prop, newValue) {
          target[prop] = newValue;
          dep.notify();
        },
      });
    } else {
      _newValue[key] = reactive3(value[key]);
    }
  }

  return _newValue;
};

let active;
const watchEffect = (fn) => {
  active = fn;
  active();
  active = null;
};

// 测试ref代码
// const obj = ref3(1);

// watchEffect(() => {
//   console.log("log", obj.value, Object.prototype.toString.call(obj));
// });
// obj.value = 2;
// obj.value = 3;
// obj.value = 4;
// obj.value = 5;

// 测试reactive代码
// const r = reactive3({
//   a: 1,
//   b: "hello",
//   c: {
//     a: 1,
//   },
// });
// watchEffect(() => {
//   console.log("log", r.a, r.b, r.c.a);
// });
// r.a = 2;
// r.b = "world";
// r.c.a = 2;
// r.c.a = 3;
// r.c.a = 4;
