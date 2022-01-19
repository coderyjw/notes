---
highlight: vs2015
theme: condensed-night-purple
---
# 1. 前言
> 今天开始这个新的系列，虽然都2022年了,像vite这类基于esm的新型构建工具也是越来越完善越来越火了，但热门不代表主流，面试webpack依然是重中之重。我之前有学过一点webpack，但是可能当时水平有限，很多都不理解，一年后重新来学一遍，希望能有更多的收获。


# 2. commonjs打包后的源码阅读

- **打包前的代码**
`./src/js/format.js` 里定义一个函数用Commonjs导出
```javascript
 
// ./src/js/format.js
const formatPrice = price => {
  if(price > 10000) {
    return `${price / 10000}万元`
  }else {
    return `${price}元`
  }
}

module.exports = {
  formatPrice
}
```
`/src/index-common.js` 打包的入口 引入formatPrice然后调用一下
```javascript
// ./src/index-common.js
const { formatPrice } = require('./js/format.js')

console.log(formatPrice(12345))
```
**- 打包后的代码**
去掉注释简化后的代码 我把它们分成下面几块，我们一块一块来看一下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bcb4bbc228f474285ce4afaf7c15fc7~tplv-k3u1fbpfcp-watermark.image?)

1. 首先第一块就是定义了一个名为 **__webpack_modules__** 的对象，这个对象是以模块的路径为key，属性是一个函数
```javascript
var __webpack_modules__ = {
  "./src/js/format.js": (module) => {
    const formatPrice = (price) => {
      if (price > 10000) {
        return `${price / 10000}万元`;
      } else {
        return `${price}元`;
      }
    };

    module.exports = {
      formatPrice,
    };
  },
};
```

2. **__webpack_require__** 就是require的实现啦，他接受的一个模块的id，其实就是上面对象的key
```javascript
var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
  // 1. 先判断有没有缓存过，有的话直接返回
  var cachedModule = __webpack_module_cache__[moduleId]; 
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  
  // 2. 没缓存过直接去上面定义的__webpack_modules__对象中取
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  });
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}
```
3. 执行代码
```javascript
var __webpack_exports__ = {}; // 导出变量，因为我这个例子中没有导出，所以是空
const { formatPrice } = __webpack_require__("./src/js/format.js"); // 获取到formatPrice函数
console.log(formatPrice(12345));  // 调用获取到formatPrice函数函数
```


# 3. ESModule打包后的源码阅读
- **打包前的代码**
`./src/js/math.js` 里定义两个函数add 和 multiply 导出
```javascript
export const add = (num1, num2) => {
  return num1 + num2
}

export const multiply = (num1, num2) => {
  return num1 * num2
}
```
2. `./src/index.es6.js` 引入 add 和 multiply调用
```javascript
import { add, multiply } from './js/math.js'

console.log(add(1,2))
console.log(multiply(1,2))
```
**- 打包后的代码**

```javascript
"use strict";
var __webpack_modules__ = {
  "./src/js/math.js": (__unused_webpack_module,__webpack_exports__,__webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      add: () => add,
      multiply: () => multiply,
    });
    const add = (num1, num2) => {
      return num1 + num2;
    };

    const multiply = (num1, num2) => {
      return num1 * num2;
    };
  },
};

var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  });

  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}


__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
    if (
      __webpack_require__.o(definition, key) &&
      !__webpack_require__.o(exports, key)
    ) {
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key],
      });
    }
  }
};
__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

__webpack_require__.r = (exports) => {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  }
  Object.defineProperty(exports, "__esModule", { value: true });
};


var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
var _js_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/math.js");

console.log((0, _js_math_js__WEBPACK_IMPORTED_MODULE_0__.add)(1, 2));
console.log((0, _js_math_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(1, 2));
```
同样把它去掉注释简化后的代码 我把它们分成下面几块

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aab60c6d9ce841f2bbf1eeb541b75c7b~tplv-k3u1fbpfcp-watermark.image?)

**先来看一下新定义的三个函数**
1. `__webpack_require__.o `
```javascript
// 传入两个参数,一个obj对象，一个属性，作用是判断obj对象上有没有prop属性
__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
```

2. `__webpack_require__.r`
判断当前环境有没有Symbol，有的话在exportS的Symbol.toStringTag上标记为Module,
没有就在exportS的__esModule上标记为true,作用就是标识一下是es模块
```javascript
__webpack_require__.r = (exports) => {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  }
  Object.defineProperty(exports, "__esModule", { value: true });
};
```

3. `__webpack_require__.d` 作用就是将definition的属性都赋值到export上
```javascript
__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
  // 判断如果definition上有key属性而exports没有key属性 执行里面代码
    if ( __webpack_require__.o(definition, key) &&!__webpack_require__.o(exports, key)) {
      // 将definition[key]赋值到exports的key上
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key],
      });
    }
  }
};
```
**然后看执行**
```
// 1. 定义一个导出对象，我这个例子没有导出所以是空对象
var __webpack_exports__ = {};
// 2. 标识是一个es模块
__webpack_require__.r(__webpack_exports__); 
// 3.去真正require ./src/js/math.js 模块
var _js_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/math.js");
// 4. 执行代码
console.log((0, _js_math_js__WEBPACK_IMPORTED_MODULE_0__.add)(1, 2));
console.log((0, _js_math_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(1, 2));
```
__webpack_require__ 和  __webpack_modules__ 和commonjs里的差不多，可以直接看上面的