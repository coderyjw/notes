---
theme: channing-cyan
highlight: vs2015
---

# 1. 前言

从 vue 源码中可以看出 vue 主要包含下面三大核心模块:

1. Compiler 模块：编译模块 （将 template 中的模板编译成 render 渲染函数）
2. Renderer 模块：渲染模块 （将 Compiler 模块编译后的结果真正渲染到页面上）
3. Reactivity 模块：响应式模块 (当数据发生改变，响应变化)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30c43e1a1aa9489d9110e428e030e5ec~tplv-k3u1fbpfcp-watermark.image?)

本篇文章来实现一个简洁版的 Mini-Vue 框架，该 Vue 包括三个模块：

- 渲染系统模块 (runtime -> vnode -> 真实 DOM)
- 可响应式模块 (reactive)
- 应用程序入口模块 (createApp)

# 2.渲染系统实现

该模块主要包含三个功能：

- 功能一、h 函数，用于返回一个 VNode 对象
- 功能二、mount 函数，用于将 VNode 挂载到 DOM 上
- 功能三、patch 函数，用于对两个 VNode 进行对比,决定如何处理新的 VNode

## 2.1 h 函数的实现

- h 函数：h 函数的作用是返回一个`虚拟节点`，通常缩写为  **VNode**接收三个参数：`type`，`props`  和  `children`，虚拟节点组成虚拟 DOM。
  > 虚拟 DOM 是轻量级的 JavaScript 对象，由渲染函数创建。它包含三个参数：元素，具有数据、prop、attr 等的对象，以及一个数组。数组是我们传递子级的地方，子级也具有所有这些参数，然后它们也可以具有子级，依此类推，直到我们构建完整的元素树为止。

```javascript
function h(type, props, children) {
  return {
    type,
    props,
    children,
  };
}
```

## 2.2 mount 函数的实现

- mount 函数的作用是将虚拟节点挂载的页面上。它接收两个参数，第一个是需要挂载的 vnode,第二个是被挂载的真实 dom 节点

```javascript
function mount(vnode, container) {
  // 1. 创建出真实的元素，并且在vnode上保留el
  const el = (vnode.el = document.createElement(vnode.type));

  // 2. 处理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];

      // 判断属性是否是事件属性
      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLocaleLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  // 3. 处理children
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else if (vnode.children instanceof Array) {
      vnode.children.forEach((item) => {
        mount(item, el);
      });
    } else if (typeof vnode.children === "object") {
      mount(vnode.children, el);
    }
  }

  // 4. 挂载到container上
  container.appendChild(el);
}
```

## 2.3 patch 函数的实现

- patch 函数的作用是对比两个 vnode，决定如何处理新的 VNode。它接收两个参数，第一个是旧的 vnode，第二个是新的 vnode

```javascript
function patch(n1, n2) {
  if (n1.type !== n2.type) {
    // 1. 标签名不相同 直接移除原来的元素 挂载新的vnode
    const n1ParentEl = n1.el.parentElement;
    n1ParentEl.removeChild(n1.el);
    mount(n2, n1ParentEl);
  } else {
    // 2 标签名相同
    const el = (n2.el = n1.el);

    // 2.1 处理props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    // 添加新的属性
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (oldValue !== newValue) {
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2).toLocaleLowerCase(), oldValue);
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }

    // 删除旧的属性
    for (const key in oldProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (oldValue !== newValue) {
        if (key.startsWith("on")) {
          el.removeEventListener(key.slice(2).toLocaleLowerCase(), value);
        } else {
          el.removeAttribute(key);
        }
      }
    }

    // 2.2 处理children
    const oldChildren = n1.children;
    const newChildren = n2.children;
    // 情况一：新的children是字符串
    if (typeof newChildren === "string") {
      if (newChildren !== oldChildren) {
        el.textContent = newChildren;
      }
    }
    // 情况二：新的children是数组
    else if (newChildren instanceof Array) {
      if (typeof oldChildren === "string") {
        newChildren.forEach((item) => {
          mount(item, el);
        });
      } else {
        // 新旧都是数组（不考虑key的情况）
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }

        if (newChildren.length > oldChildren) {
          newChildren.slice(oldChildren.length).forEach((item) => {
            mount(item, el);
          });
        }

        if (newChildren.length < oldChildren) {
          oldChildren.slice(oldChildren.length).forEach((item) => {
            el.removeChild(item.el);
          });
        }
      }
    }
  }
}
```

## 2.4 演示

测试代码

```html
<div id="app"></div>
<button id="btn">CHANGE</button>
<!-- renderer.js 包含上述h、mount、patch函数 -->
<script src="./renderer.js"></script>
<script>
  // 1.通过h函数来创建一个vnode
  const vnode1 = h("div", { class: "coder" }, [
    h("h2", null, "当前计数： 100"),
    h("button", null, "+1"),
  ]);
  // 2.通过mount函数,将vnode挂载到div#app上
  mount(vnode1, document.getElementById("app"));

  // 3.创建新的vnode2
  const vnode2 = h(
    "div",
    { class: "coder", style: "font-weight: 700; font-size: 30px;" },
    [h("h3", null, "哈哈哈"), h("b", null, "嘿嘿嘿")]
  );

  const btn = document.getElementById("btn");
  btn.addEventListener("click", (e) => {
    patch(vnode1, vnode2);
  });
</script>
```

结果

![动画.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/facb1b3a042e49ffadf0ad34f3491b10~tplv-k3u1fbpfcp-watermark.image?)

# 3. 响应式系统

响应式我在我之前的一篇文章有讲解过
[凌晨 3 点突然醒来实现一下 vue 响应式原理](https://juejin.cn/post/7042371927897276453)

- 下面贴一下代码

```javascript
// 保存当前需要收集的响应式函数
let activeReactiveFn = null;

class Depend {
  constructor() {
    //  使用Set来保存依赖函数, 而不是数组[]
    this.reactiveFns = new Set();
  }
  notify() {
    this.reactiveFns.forEach((fn) => {
      fn();
    });
  }
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }
}

// WeakMap({key(对象): value}), key是个对象，弱引用(当将key设置为null时，key被垃圾回收机制回收，对应的value也会被回收)
const targetMap = new WeakMap();
// 封装一个获取depend函数
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  // 根据key获取depend对象
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

// 封装一个响应式的函数
function watchEffect(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 根据target.key获取对应的depend
      // 做依赖收集
      const depend = getDepend(target, key);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver);
      // 监听对象变化做出响应
      const depend = getDepend(target, key);
      depend.notify();
    },
  });
}
```

# 4. createApp 实现

- createApp：要求传入一个根组件实例,并且需要提供一个 mount 方法挂载函数

```javascript
function createApp(rootComponent) {
  return {
    mount(selector) {
      const container = document.querySelector(selector);
      let isMounted = false;
      let oldVNode = null;

      // 监听counter变化做页面的更新
      watchEffect(function () {
        if (!isMounted) {
          // 第一次做mount操作
          oldVNode = rootComponent.render();
          mount(oldVNode, container);
          isMounted = true;
        } else {
          // 数据发生更新做patch操作
          const newVNode = rootComponent.render();
          patch(oldVNode, newVNode);
          oldVNode = newVNode;
        }
      });
    },
  };
}
```

# 5.mini-vue 框架最终演示

- 测试代码

```html
<div id="app"></div>
<script src="./renderer.js"></script>
<script src="./reactive.js"></script>
<script src="./createApp.js"></script>
<script>
  const vnode1 = h("div", { class: "coder" }, [
    h("h2", null, "当前计数： 100"),
    h("button", null, "+1"),
  ]);

  const App = {
    data: reactive({
      counter: 0,
    }),
    render() {
      return h("div", { class: "coder" }, [
        h("h2", null, `当前计数： ${this.data.counter}`),
        h("button",{
            onClick: () => {
              this.data.counter--;
            },
          },"-1"
        ),
        h("button",{
            onClick: () => {
              this.data.counter++;
            },
          },"+1"
        ),
      ]);
    },
  };
  const app = createApp(App);

  app.mount("#app");
```

![mini-vue演示 (1).gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/065b8fb9658045978aa54f1d6e13a246~tplv-k3u1fbpfcp-watermark.image?)
