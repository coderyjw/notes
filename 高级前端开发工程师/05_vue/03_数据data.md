- data为什么是一个函数？
  - 因为js对象都是通过引用关联的，只有返回一个函数，每个组件实例才能维持一份独立的拷贝。否则就会
    产生多个组件实例共享一个对象的现象。
- prop: 父组件向子组件传参的接口（定义用小驼峰 使用用烤串）
  - vue是单项数据流：不允许子组件修改prop
  - 属性校验: type require default validator
- 计算属性：
  - 计算属性是**基于其内部的响应式依赖进行缓存的**
  - 只在相关响应式依赖发生改变时它才会重新求值
- 方法
  - 没缓存
  - 每当触发重新渲染时，调用方法将总会再次执行函数
- 侦听器：在数据变化后执行异步操作或者开销比较打的操作
  

Object.defineProperty
- **不能检测对象属性的添加和删除**
- **不能检测数组长度变化**
- 不是因为defineProperty的局限性，而是出于性能考量的，不会对数组每个元素都监听
- Vue.set this.$set Vue.delete this.$delete


- 注意Object.defineProperty是可以监听数组通过下标使用或者修改数组的。实现在下面
```JS
function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`get key: ${key} value: ${value}`);
      return value;
    },
    set(newVal) {
      console.log(`set key: ${key} value: ${newVal}`);
      value = newVal;
    },
  });
}

function observe(data) {
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}

let arr = [1, 2, 3];
observe(arr);
arr[0];
arr[1] = 10;
```
vue没有这么做的原因是出于性能考虑(性能代价和获得的用户体验收益不成正比。)
(issue)[https://github.com/vuejs/vue/issues/8562]

