## 1. Options API的弊端

- 在vue2中， 我们编写组件的方式是**Options API**：
  - Options API的一大特点就是在**对应的属性**中编写**对应的功能模块**；
  - 比如**data定义数据**、**methods中定义方法**、computed中定义计算属性、**watch中监听属性改变**、也包括**生命周期钩子**；
- 但是这种代码有一个很大的弊端：
  1. 当我们**实现某一个功能**时，这个功能**对应的代码逻辑**会被**拆分到各个属性**中；
  2. 当组件**变得更大、更复杂**时，**逻辑关注的列表**就会增长，那么**同一个功能的逻辑就会被拆分的很分散**；
  3. 尤其对于一开始没有编写组件的人来说，这个组件的代码是难以阅读和理解的；





## 2. 认识Composition API

Composition API 想做的事情就是：**将同一个逻辑关注点的代码收集在一起**

1. Composition API 怎么用？

	- 为了开始使用Composition API ，我们需要一个可以实际使用它（编写代码）的地方；
	- 在vue组件中，这个位置就是**setup函数**；
2.  setup函数其实就是组件的另外一个选项
   - 只不过这个选项强大到我们可以**用来替代之前所编写的大部分其它选项**
   - 比如**methods、computed、watch、data、生命周期**等等



### 2.1 setup函数的使用

#### 2.1.1 setup的参数

使用setup函数时，他接收两个参数

1. props
2. context

- props非常好理解，它其实就是**父组件传递过来的属性**会被**放到props对象**中，我们只用**setup中如果需要使用**，那么就可以直接**通过props参数获取**
  - 对于定义props的类型**还是和之前的规则一样，在props选项中定义**
  - 在template中依然可以正常去使用porps属性
  - 不可以在setup中通过this去获取（下面讲到）

```javascript
// Home.vue

export default {
  props: {
    title: String,
  },
  setup(props) {
    console.log(props.title);
  },
};
```

> ​	`setup` 函数中的 `props` 是响应式的，当传入新的 prop 时，它将被更新。
>
> ​	因为 `props` 是响应式的，你**不能使用 ES6 解构**，它会消除 prop 的响应性。

- context是一个普通 JavaScript 对象，暴露了其它可能在 `setup` 中有用的值：
  - attrs：所有非prop的attribute;
  - slots：父组件传递过来的插槽;
  - emit：当我们组件内部需要发出事件时会用到emit(因为我们不能访问this,所以不能通过this.$emit发出事件);
  - expose：暴露公共 property (函数) || 给它传递一个对象，其中定义的 property 将可以被外部组件实例访问;

```javascript
// Home.vue

export default {
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs)

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots)

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit)

    // 暴露公共 property (函数)
    console.log(context.expose)
  }
}
```

> context不是响应式的，这意味着你可以安全地对 `context` 使用 ES6 解构。
> `attrs` 和 `slots` 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 `attrs.x` 或 `slots.x` 的方式引用 property。请注意，与 `props` 不同，`attrs` 和 `slots` 的 property 是**非**响应式的。如果你打算根据 `attrs` 或 `slots` 的更改应用副作用，那么应该在 `onBeforeUpdate` 生命周期钩子中执行此操作。

#### 2.1.2 setup的返回值

1. 如果 `setup` 返回一个对象，那么该对象的 property 就可以再template中使用，也就是说可以通过setup的返回一个对象来替代data和methods选项

   ```javascript
   <script>
   export default {
     setup() {
       return {
         message: "hello world",
       };
     },
   };
   </script>
   ```

   

2.  `setup`还可以返回一个渲染函数

    ```javascript
    <script>
    import { h } from "vue";
    export default {
      setup() {
        const message = "hello world";
        const sayHello = () => {
          console.log("你好");
        };

        return () => h("div", [message, sayHello()]);
      },
    };
    </script>
    ```



#### 2.1.3 setup中不可以使用this

官方描述

> **在 `setup()` 内部，`this` 不是该活跃实例的引用**，因为 `setup()` 是在解析其它组件选项之前被调用的，所以 `setup()` 内部的 `this` 的行为与其它选项中的 `this` 完全不同。这使得 `setup()` 在和其它选项式 API 一起使用时可能会导致混淆。

总结：

1. this并没有指向当前组件实例;
2. 并且在**setup被调用之前,data、computed、methods**等都没被解析;
3. 所以无法在setup中获取this;



## 3 认识Reactive API 

如果你直接在steup函数里定义一个变量，在template中点击按钮改变这个变量，你会发现 发现界面上是不会改变的。

```javascript
<template>
  <div>
    <div>{{ counter }}</div>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
export default {
  setup() {
    let counter = 0;

    const increment = () => {
      ++counter;
      console.log(counter);
    };
    return {
      counter,
      increment,
    };
  },
};
</script>
```

如上，但是increment函数中打印的counter确实有变化的。这是为什么呢？

因为，上面的counter只是一个普通的变量，并没有与template产生联系，我们以前在data中定义的变量变化模板上能更新是因为vue内部他会经过reactive函数的处理，处理之后的变量就会具有响应式。



那么如何在setup函数中使变量具有响应式呢？

vue 给我们提供了下面一些Reactive API（响应式 API）

我们先来看一个简单的示例，下面通过reactive函数就能使state变量具有响应式，当改变counter属性时，页面就会响应更新了。

```javascript
<template>
  <div>
    <div>{{ state.counter }}</div>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    let state = reactive({
      counter: 0,
    });

    const increment = () => {
      ++state.counter;
    };
    return {
      state,
      increment,
    };
  },
};
</script>
```

上面知识响应式api中的一种，vue给我们提供了许多的响应式api，让我们一起来学一学吧











