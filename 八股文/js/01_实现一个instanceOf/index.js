// 简述instanceOf的原理 并用代码实现

// 原理就是用的原型链

const instanceOf = (A, B) => {
  const proto = A.__proto__;
  while (proto) {
    if (proto.__proto__ === B.prototype) return ture;
    proto = proto.__proto__;
  }
  return false;
};
