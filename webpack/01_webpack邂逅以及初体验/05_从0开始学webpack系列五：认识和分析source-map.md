---
theme: cyanosis
highlight: vs2015
---
# 1. 认识source-map
- 我们的代码通常运行在浏览器上时，是通过打包压缩的；

    - 也就是`真实跑在浏览器上的代码`，和`我们编写的代码其实是有差异`的；
    - 比如`es6的代码`可能被转换成`es5`；
    - 比如`对应的代码行号、列号`在经过编译后肯定会不一致；
    - 比如代码进行`丑化压缩`时，会将`编码名称`等修改；
    - 比如我们使用`Typescript`等方式编写的代码，最终转换成`Javascript`；
- 但是，当代吗报错需要调试(debug)，调试转换后的代码是很困难的
- 但是我们能保证代码不出错吗？**不可能。**
- 那么如何可以**调试这种转换后不一致的代码**呢？答案就是**source-map**
   - source-map是从`已转换的代码`，映射到`原始的源文件`；
   - 使浏览器可以`重构原始源`并在调试器中`显示重建的原始源`；
   

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df139508e988408ab08f28c6c88dfa8c~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b4a0c0a35064e8fb9f927a156c59d3b~tplv-k3u1fbpfcp-watermark.image?)


# 2. 如何使用source-map
 1. 根据源文件，生成source-map文件，webpack在打包时，可以通过配置（devtool属性）生成source-map；
 2. 在转换后的代码，最后添加一个注释，它指向sourcemap；

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b818c79084694304a816702e8a3e7914~tplv-k3u1fbpfcp-watermark.image?)

# 3. 分析source-map
- 最初source-map生成的文件大小是原始文件的10倍，第二版减少了约50%，第三版又减少了50%，所以现在查不到是2.5倍左右吧。

- 打开source-map文件，可以看到其实就是一个JSON对象，其中包含关于映射本身和原始JavaScript文件的信息。 目前的source-map的样子：
```JAVASCRIPT
{
  "version": 3,
  "file": "bundle.js",
  "mappings": "qBASAA,EAAOC,QAAU,CACfC,YAVkBC,GACfA,EAAQ,IACCA,EAAQ,IAAX,KAEA,GAAGA,O,oECJP,MAAMC,EAAM,CAACC,EAAMC,IACjBD,EAAOC,EAGHC,EAAW,CAACF,EAAMC,IACtBD,EAAOC,ICJZE,EAA2B,GAG/B,SAASC,EAAoBC,GAE5B,IAAIC,EAAeH,EAAyBE,GAC5C,QAAqBE,IAAjBD,EACH,OAAOA,EAAaV,QAGrB,IAAID,EAASQ,EAAyBE,GAAY,CAGjDT,QAAS,IAOV,OAHAY,EAAoBH,GAAUV,EAAQA,EAAOC,QAASQ,GAG/CT,EAAOC,QCpBfQ,EAAoBK,EAAKd,IACxB,IAAIe,EAASf,GAAUA,EAAOgB,WAC7B,IAAOhB,EAAiB,QACxB,IAAM,EAEP,OADAS,EAAoBQ,EAAEF,EAAQ,CAAEG,EAAGH,IAC5BA,GCLRN,EAAoBQ,EAAI,CAAChB,EAASkB,KACjC,IAAI,IAAIC,KAAOD,EACXV,EAAoBY,EAAEF,EAAYC,KAASX,EAAoBY,EAAEpB,EAASmB,IAC5EE,OAAOC,eAAetB,EAASmB,EAAK,CAAEI,YAAY,EAAMC,IAAKN,EAAWC,MCJ3EX,EAAoBY,EAAI,CAACK,EAAKC,IAAUL,OAAOM,UAAUC,eAAeC,KAAKJ,EAAKC,GCClFlB,EAAoBsB,EAAK9B,IACH,oBAAX+B,QAA0BA,OAAOC,aAC1CX,OAAOC,eAAetB,EAAS+B,OAAOC,YAAa,CAAEC,MAAO,WAE7DZ,OAAOC,eAAetB,EAAS,aAAc,CAAEiC,OAAO,K,gCCLvD,MAAM,SAAE3B,EAAQ,IAAEH,GAAO,EAAQ,KAEjC+B,QAAQC,IAAIhC,EAAI,EAAE,IAClB+B,QAAQC,IAAI7B,EAAS,EAAE,IAEvB8B,QAAQD,IAAI,SAIZD,QAAQC,KAAI,IAAAlC,aAAY,S",
  "sources": [
    "webpack://webpack_bundle_resource_reading/./src/js/format.js",
    "webpack://webpack_bundle_resource_reading/./src/js/math.js",
    "webpack://webpack_bundle_resource_reading/webpack/bootstrap",
    "webpack://webpack_bundle_resource_reading/webpack/runtime/compat get default export",
    "webpack://webpack_bundle_resource_reading/webpack/runtime/define property getters",
    "webpack://webpack_bundle_resource_reading/webpack/runtime/hasOwnProperty shorthand",
    "webpack://webpack_bundle_resource_reading/webpack/runtime/make namespace object",
    "webpack://webpack_bundle_resource_reading/./src/index.js"
  ],
  "sourcesContent": [
    "const formatPrice = price => {\r\n  if(price > 10000) {\r\n    return `${price / 10000}万元`\r\n  }else {\r\n    return `${price}元`\r\n  }\r\n}\r\n\r\n\r\nmodule.exports = {\r\n  formatPrice\r\n}",
    "export const add = (num1, num2) => {\r\n  return num1 + num2\r\n}\r\n\r\nexport const multiply = (num1, num2) => {\r\n  return num1 * num2\r\n}",
    "// The module cache\nvar __webpack_module_cache__ = {};\n\n// The require function\nfunction __webpack_require__(moduleId) {\n\t// Check if module is in cache\n\tvar cachedModule = __webpack_module_cache__[moduleId];\n\tif (cachedModule !== undefined) {\n\t\treturn cachedModule.exports;\n\t}\n\t// Create a new module (and put it into the cache)\n\tvar module = __webpack_module_cache__[moduleId] = {\n\t\t// no module.id needed\n\t\t// no module.loaded needed\n\t\texports: {}\n\t};\n\n\t// Execute the module function\n\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n\n\t// Return the exports of the module\n\treturn module.exports;\n}\n\n",
    "// getDefaultExport function for compatibility with non-harmony modules\n__webpack_require__.n = (module) => {\n\tvar getter = module && module.__esModule ?\n\t\t() => (module['default']) :\n\t\t() => (module);\n\t__webpack_require__.d(getter, { a: getter });\n\treturn getter;\n};",
    "// define getter functions for harmony exports\n__webpack_require__.d = (exports, definition) => {\n\tfor(var key in definition) {\n\t\tif(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {\n\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n\t\t}\n\t}\n};",
    "__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))",
    "// define __esModule on exports\n__webpack_require__.r = (exports) => {\n\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n\t}\n\tObject.defineProperty(exports, '__esModule', { value: true });\n};",
    "const { multiply, add} = require('./js/math.js')\r\n\r\nconsole.log(add(1,2))\r\nconsole.log(multiply(1,2))\r\n\r\nconsloe.log('hello')\r\n\r\nimport { formatPrice } from './js/format.js' \r\n\r\nconsole.log(formatPrice(12345))\r\n\r\n\r\n\r\n"
  ],
  "names": [
    "module",
    "exports",
    "formatPrice",
    "price",
    "add",
    "num1",
    "num2",
    "multiply",
    "__webpack_module_cache__",
    "__webpack_require__",
    "moduleId",
    "cachedModule",
    "undefined",
    "__webpack_modules__",
    "n",
    "getter",
    "__esModule",
    "d",
    "a",
    "definition",
    "key",
    "o",
    "Object",
    "defineProperty",
    "enumerable",
    "get",
    "obj",
    "prop",
    "prototype",
    "hasOwnProperty",
    "call",
    "r",
    "Symbol",
    "toStringTag",
    "value",
    "console",
    "log",
    "consloe"
  ],
  "sourceRoot": ""
}
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56659a7f10424a1192f1d7c283bc871d~tplv-k3u1fbpfcp-watermark.image?)
  - version: 当前使用的版本，也就是最新的`第三版`
  - sources: 从哪些文件转换过来的source-map和打包的代码（最初始的文件）;
  - names: 转换前的变量和属性名称
  - mappings: source-map`用来和源文件映射的信息`（比如位置信息等），一串base64VLQ(variable-lenhth quantity可变长度值)编码；
  - file：打包后的文件（浏览器加载的文件）;
  - sourceContent：`转换前的具体代码信息`（和sources是对应关系）;
  - sourceRoot：`所有的sources相对的根目录`；

# 5. source-map的26种值
- 如何使用source-map,webpack为我们提供了非常多的选项（目前是26个）来处理source-map
- [https://webpack.docschina.org/configuration/devtool/](https://webpack.docschina.org/configuration/devtool/)
- 选择不同的值，生成的source-map会稍有差异，打包的过程也会有性能的差异u，可以根据不同的情况进行选择；


**- 不生成source-map的几个值**
1. `source-map`： 不使用source-map
2. `none`:（`devtool` 生产环境默认的选项）
3. `eval`：development模式下的默认值，不生成source-map
    - 但是它会在eval执行的代码中，添加//#sourceURL=
    - 它会被浏览器在执行时解析，并且在调试面板中生成对应的一些文件目录，方便我们调试代码
    - 只生成报错文件的源代码映射
    

**- 生成source-map的值**

4. `source-map`：生成一个独立的source-map文件，并且在bundle文件中有一个注释，指向source-map。bundle文件中会成//#sourceMappingURL=的注释，开发工具会根据这个注释找到source-map文件，并解析。

5. `eval-source-map`：会生成source-map,但是source-map是以DataUrl添加到`eval函数的后面`

5. `inline-source-map`：会生成source-map,但是source-map是以DataUrl添加到`bundle文件的后面`

6. `cheap-source-map`：会生成source-map，但是会`更加高效一些`(cheap低开销)，因为它没有生成列映射（Column Mapping）,因为在开发中，我们只需要行信息通常就可以定位到错误了

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/852d6d9f9c974ee9873938f3b6c1ebd9~tplv-k3u1fbpfcp-watermark.image?)

7. `cheap-module-source-map`：会生成source-map,类似于cheap-source-map，但是对源自于loader的sourcemap处理会更好

8.`hidden-source-map`：会生成source-map，但是生成的source-map只有错误提示，不会生成源代码文件.

9. `nosources-source-map`：只会生成source-map，到那时生成的source-map只有错误提示，不会生成源代码文件；

- 总结：
理解了上面9种source-map其实就可以理解全部26种了
因为webpack提供给我们的值是有组合规则的
1. `inline-|hidden-|eval`： inline就是生成的source-map以DataUrl的形式添加到bundle的后面，hidden就是隐藏源代码，eval生成的source-map以DataUrl的形式添加到eval函数的后面；
2. `nosources`: 可以值：不会生成源代码文件；
3. `cheap`：可选值，并且可以跟随module：cheap不生成列映射更高效，module会对源自于loader的sourcemap处理会更好
>  `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`.


# 6. 总结
source-map就是一个方便我们调试的，在不同的模式有不同的显示方式和性能的差别，
- 在Vue中开发环境用的 `source-map` 生产环境 `none`
- 在React中开发环境用的 `cheap-module-source-map` 和生产环境 `source-map | false`
- 建议开发和测试用 `source-map` 或 `cheap-module-source-map` ，可以在浏览器下看到正确的错误提示，生产就用 `false`