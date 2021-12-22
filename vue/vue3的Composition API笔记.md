## 1. Options API的弊端

- 在vue2中， 我们编写组件的方式是**Options API**：
  - Options API的一大特点就是在**对应的属性**中编写**对应的功能模块**；
  - 比如**data定义数据**、**methods中定义方法**、**computed中定义计算属性**、**watch中监听属性改变**、也包括**生命周期钩子**；
- 但是这种代码有一个很大的弊端：
  1. 当我们**实现某一个功能**时，这个功能**对应的代码逻辑**会被**拆分到各个属性**中；
  2. 当组件**变得更大、更复杂**时，**逻辑关注的列表**就会增长，那么**同一个功能的逻辑就会被拆分的很分散**；
  3. 尤其对于一开始没有编写组件的人来说，这个组件的代码是难以阅读和理解的；





## 2. 认识Composition API

Composition API 想做的事情就是：**将同一个逻辑关注点的代码收集在一起**

- Composition API 怎么用？

  - 为了开始使用Composition API ，我们需要一个可以实际使用它（编写代码）的地方；

  - 在vue组件中，这个位置就是**setup函数**；



## 3. setup函数 

- setup函数其实就是组件的另外一个选项

  - 只不过这个选项强大到我们可以**用来替代之前所编写的大部分其它选项**

  - 比如**methods、computed、watch、data、生命周期**等等

  - setup函数在组件被创建**之前**，`props` 被解析之后执行。

  - 它是组合式 API 的入口。

### 3.1 setup的参数

使用setup函数时，他接收两个参数

1. props
2. context

- props非常好理解，它其实就是**父组件传递过来的属性**会被**放到props对象**中，我们**如果需要setup中使用**，那么就可以直接**通过props参数获取**
  - 对于定义props的类型**还是和之前的规则一样，在props选项中定义**
  - 在template中依然可以正常去使用porps属性

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
  - emit：当我们组件内部需要发出事件时会用到emit
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

### 3.1.1 setup的返回值

1. 如果 `setup` 返回一个对象，那么该对象的 property 就可以再template中使用，也就是说可以通过setup的返回一个对象来替代data和methods选项

   ```vue
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

    ```vue
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



### 3.1.2 setup中不可以使用this

可能会有同学有疑问setup函数中为什么要传prop、context参数呢，我为什么不能通过this去获取呢？

答案是因为setup中不可以使用this。

官方文档中有这样一段描述

> 在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。

总结：

1. this并没有指向当前组件实例;
2. 并且在**setup被调用之前,data、computed、methods**等都没被解析;
3. 所以无法在setup中获取this;



## 4. Reactive API 响应式API



### 4.1 认识Reactive API

如果你直接在steup函数里定义一个变量，在template中点击按钮改变这个变量，你会发现 界面上是不会改变的。

```vue
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

因为，上面的counter只是一个普通的变量，并没有与template产生联系，我们以前在data中定义的变量变化模板上能更新是因为vue内部他会经过reactive函数的处理，处理之后的变量才会具有响应式。

[凌晨3点突然醒来实现一下vue响应式原理](https://juejin.cn/post/7042371927897276453)

那么如何在setup函数中使变量具有响应式呢？

vue 给我们提供了很多Reactive API（响应式 API），让我们一起来学一下吧

### 4.2 reactive

reactive要求传入**一个对象或者数组类型**，返回返回对象或者数组的**响应式副本**

我们先来看一个简单的示例，下面通过reactive函数就能使state变量具有响应式，当改变counter属性时，页面就会响应更新了。

```vue
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



### 4.3 ref

reactive要求传入一个对象或数组，如果传入一个基本类型会报一个警告

> *value cannot be made reactive*

- 这时就需要vue提供的另外一个api了: Ref API

  - ref会返回一个可变的响应式对象，该对象作为一个响应式的引用维护着它内部的值，这就是ref名称的来源；
  - 他内部的值是在ref的value属性中被维护的；

```vue
<template>
  <div class="hello">
    <!-- 模板中引入ref,Vue会自动帮助我们进行解包,所以不需要在模板中通过counter.value  -->
    <h1>{{ counter }}</h1>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const counter = ref(0);

    const increment = () => {
      counter.value++;
    };
    return {
      increment,
      counter,
    };
  },
};
</script>
```

- 在**模板中引入ref**的值时，Vue会**自动帮助我们进行解包**操作，所以我们**并不需要在模板中通过 ref.value** 的方式来使用;
- 但是在 **setup 函数内部**，它依然是一个 **ref引用**， 所以对其进行操作时，我们依然需要**使用 ref.value的方式**;



Ref自动解包

- 模版中的解包是**浅层解包**
- 如果我们**将ref放到一个reactive的属性**当中，那么**在模板中使用时，它会自动解包**

如下

```vue
<template>
  <div class="hello">
    <h1>{{ info.message.value }}</h1>
    <h1>{{ infoReactive.message }}</h1> <!-- 这里不需要.value --> 
    <button @click="increment">+1</button>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const message = ref("HelloWorld");
    const info = {
      message,
    };
    const infoReactive = reactive(info);
    console.log(info.message.value);
		console.log(infoReactive.message); // 这里不需要.value
    return {
      info,
      infoReactive,
    };
  },
};
</script>

```



### 4.4 readonly

我们通过reactive或ref可以获取到一个响应式对象，如果我们希望这个兑现故事不能被修改的，可以使用readonly

**readonly会返回原生对象的只读代理**(也就是它依然是一个Proxy，这是一个**proxy的set方法被劫持**,并且不能对其进行修改)

**开发中常见的readonly方法会传进三个类型的参数**

1. 普通对象;
2. reactive返回的对象;
3. ref的对象;

```vue
<script>
import { readonly } from "vue";
export default {
  setup() {
    // 1. 传入普通对象
    const message2 = readonly({
      info: "message",
    });
   
    // 2. 传入reactive对象
    const state = reactive({
      age: 22,
      name: 'yjw'
    })
    const state2 = readonly(state)
    
    // 3. 传入ref对象
    const counter1 = ref(0)
    const counter2 = readonly(counter)
    
    return {
      message2,
      state2,
      counter2
    };
  },
};
</script>
```

- readonly的**返回值对象是不可被修改的**，但是经过readonly处理的**原来的对象**是允许被修改的，其实本质上就是readonly返回的对象的setter方法被劫持了而已;
- 与 `reactive` 一样，如果任何 property 使用了 `ref`，当它通过代理访问时，则被自动解包。

### 4.5 Reactive判断的API

1. **isProxy**：检查对象是否是由 reactive 或 readonly创建的 proxy。
2. **isReactive**：检查对象是否由reactive创建的响应式代理，如果该代理是 readonly 创建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true;
3. **isReadonly**：检查对象是否是由 readonly 创建的只读代理。
4. **toRaw**： 返回 reactive 或 readonly 代理的原始对象(**不**建议保留对原始对象的持久引用。请谨慎使用)。
5. **markRaw**：标记一个对象，使其永远不会转换为 proxy。返回对象本身。
6. **shallowReactve**：创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (深层还是原生对象)。
7. **shallowReadonly**：创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换(深层还是可读、可写的)。

### 4.6 toRefs

如果我们使用**ES6的解构语法**，对**reactive返回的对象进行解构获取值**，那么之后无论是**修改结构后的变量**，还是**修改reactive返回的state对象**，**数据都不再是响应式**的:

toRef函数**可以将reactive返回的对象中的属性都转成ref**

```javascript
const state = reactive({
	age: 22,
	name: 'coder'
})

const { age, name } = state // 失去响应式
const {age ,name } = toRefs(state) // 返回两个ref对象，具有响应式
```

这种做法相当于已经在state.name和ref.value之间建立了 **链接，任何一个修改都会引起另外一个变化;**

### 4.7 toRef

如果我们只希望转换一个**reactive对象中的属性为ref**, 那么可以**使用toRef的方法**:

```javascript
const state = reactive({
	age: 22,
	name: 'coder'
})

const age = toRef(state, 'age')
```

### 4.8 ref其它的API

1. **isRef**：检查值是否为一个ref对象
2. **unref**：如果参数是一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 的语法糖函数。
3. **shallowRef**：创建一个浅层的ref对象;
4. **triggerRef**：手动触发和 shallowRef 相关联的副作用

```java
const state = shallowRef({
  name: "yjw",
});

const change = () => {
  state.value.name = "coder"; // 修改不响应
  triggerRef(state); // 手动触发
};
return {
  state,
  change,
};
```

