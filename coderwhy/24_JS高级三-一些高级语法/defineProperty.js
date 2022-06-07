// "use strict";
let obj = {
  name: "yjw",
};

let value = "";
Object.defineProperty(obj, "name", {
  configurable: true,
  enumerable: false,
  // writable: true,
  // value: "叶继伟",
  get() {
    return value;
  },
  set(newValue) {
    value = newValue;
  },
});

obj.name = "coder";
console.log(obj.name);
delete obj.name;
console.log(obj.name);

console.log(Object.keys(obj));
