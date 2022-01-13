# 1. 前言
最近自己学习写了一个基于Vue3的组件库，感觉`有点意思`，这篇文章来记录一下我是怎么从0快速打造一个UI组件库的
- 😊先来个预览
![jw-ui演示.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/baf189fa7b324957a22966b30e99c7ca~tplv-k3u1fbpfcp-watermark.image?)

- 😘附上访问地址[jw-ui](https://coderyjw.github.io/jw-ui-website)

# 2. 使用Vite搭建官网
Vite是尤雨溪开发的一种新型前端构建工具，具体介绍可以查看[官方文档](https://cn.vitejs.dev/)

## 2.1 创建项目
### 2.1.1. 全局安装vite（这里我装的时候是2.7.2）
```
$ yarn create vite@2.7.2
```

### 2.1.2. 构建一个vue模板(项目名可以改成自己的名字)
```shell
yarn create vite jw-ui --template vue
```

### 2.1.3. 装好之后按照提示逐步执行命令
```shell
cd jw-ui
yarn
yarn dev
```

可以看到界面

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a98637e10a7249618b49965d220466c1~tplv-k3u1fbpfcp-watermark.image?)

`ps: 推荐的IDE和设置：VSCode + Volar`

## 2.2 基本完成官网的搭建

### 2.2.1. 下载vue-router
```shell
yarn add vue-router@4
```

### 2.2.2. 创建home首页与doc文档页 以及顶部导航栏
```html
/* /views/home/index.vue 首页*/
<template>
    <div>
        Home
    </div>
</template>
```
```
/* /views/doc/index.vue 文档页面 */
<template>
  <div>
    Doc
  </div>
</template>
```
```
/* /components/Topnav.vue 顶部导航栏组件 */
<template>
  <div class="topnav">
    <router-link to="/home">首页</router-link>
    <router-link to="/doc">文档</router-link>
  </div>
</template>
```
### 2.2.3. 配置路由
创建路由配置文件
```typescript
// router/index.ts 
import { createRouter, createWebHashHistory } from "vue-router";
const history = createWebHashHistory();

const router = createRouter({
  history,
  routes: [
    { path: "/", redirect: "" },
  ],
});

export default router;
```
在main.ts里导入，使得整个应用支持路由。
```TYPESCRIPT
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);

app.mount("#app");

```
修改App.vue
```
<template>
  <Topnav />
  <router-view />
</template>
<script setup>
import Topnav from "./components/Topnav.vue";
</script>
```
到目前为止的效果

![jw-ui演示1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/565b1b1621944fd2b9713255873bed19~tplv-k3u1fbpfcp-watermark.image?)

装饰一下顶部导航栏后的效果

![jw-ui演示2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9083365473f7475580f28d796d63a193~tplv-k3u1fbpfcp-watermark.image?)

这里首页按照自己喜欢的来写CSS就好了，接下来讲一下文档页面。

文档页需要一个侧边栏来切换不同组件的文档，这里我就举例做一个Button组件

```html
// doc/index.vue
<template>
  <div class="layout">
    <div class="content">
      <aside>
        <router-link class="menu-item text-overflow" to="/doc/button"
          >Button 组件</router-link
        >
      </aside>
      <main style="padding-left: 302px">
        <router-view />
      </main>
    </div>
</template>
```
```TYPESCRIPT
// router/index.ts 添加一个展示的button页面
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/home/index.vue";
import Doc from "../views/doc/index.vue";
import ButtonDoc from "../views/doc/button/index.vue";

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    {
      path: "/doc",
      component: Doc,
      children: [{ path: "button", component: ButtonDoc }],
    },
  ],
});

export default router;

```
```TYPESCRIPT
// /views/doc/button/index
<template>
  <Button />
</template>

<script setup>
import Button from '../../../lib/button/index.vue'
</script>

<style lang="scss" scoped>

</style>

```
展示效果
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c062c4386c34b2cab67db872eda3c8b~tplv-k3u1fbpfcp-watermark.image?)

好了到这里官网总算是基本搭建完了，我们终于就可以愉快的在`src/lib/button/index.vue`文件里封装组件啦。（**封装的组件都放在lib文件夹里，以后打包用**）

# 3. 封装一个Button组件
下面附上我写的一个Button组件以及使用效果

`PS: 需要注意的一点是封装的样式一定要加`**`自己独特的前缀`**`我这里是` **`jw`** `以避免在项目中产生样式重叠`
```typescript
<template>
  <button class="jw-button" :class="classes">
    <span v-if="loading" class="jw-loadingIndicator"></span>
    <slot> {{ theme }} </slot>
  </button>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  theme: {
    type: String,
    default: "default",
  },
  dashed: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "default",
  },
  round: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { theme, dashed, size, round, disabled } = props;
const classes = computed(() => {
  return {
    [`jw-theme-${theme}`]: theme,
    [`jw-theme-dashed`]: dashed,
    [`jw-size-${size}`]: size,
    [`is-round`]: round,
    [`is-disabled`]: disabled,
  };
});
</script>

<script lang="ts">
export default {
  name: "JwButton",
};
</script>

<style lang="scss" scoped>
$h-default: 32px;
$h-small: 20px;
$h-large: 48px;
$white: #fff;
$default-color: #333;
$primary-color: #36ad6a;
$info-color: #4098fc;
$success-color: #85ce61;
$warning-color: #f0a020;
$error-color: #d03050;
$grey: grey;

$default-border-color: #d9d9d9;

$radius: 3px;
$green: #18a058;

.jw-button {
  box-sizing: border-box;
  height: $h-default;
  background-color: #fff;
  padding: 0 12px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border-radius: $radius;
  box-shadow: 0 1px 0 fade-out(black, 0.95);
  transition: all 250ms;
  color: $default-color;
  border: 1px solid $default-border-color;
  user-select: none;

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &.jw-size-large {
    font-size: 24px;
    height: $h-large;
    padding: 0 16px;
  }
  &.jw-size-small {
    font-size: 12px;
    height: $h-small;
    padding: 0 8px;
  }

  &.is-round.jw-size-default {
    border-radius: calc($h-default / 2);
  }
  &.is-round.jw-size-large {
    border-radius: calc($h-large / 2);
  }
  &.is-round.jw-size-small {
    border-radius: calc($h-small / 2);
  }

  &.jw-theme-default {
    &:hover {
      color: $green;
      border-color: $green;

      > .jw-loadingIndicator {
        border-style: dashed;
        border-color: $green $green $green transparent;
      }
    }
    &:active {
      color: darken($green, 20%);
      border-color: darken($green, 20%);

      > .jw-loadingIndicator {
        border-style: dashed;
        border-color: darken($green, 20%) darken($green, 20%)
          darken($green, 20%) transparent;
      }
    }
    &.jw-theme-dashed {
      border-style: dashed;
    }
    > .jw-loadingIndicator {
      border-style: dashed;
      border-color: $default-color $default-color $default-color transparent;
    }
  }
  &.jw-theme-primary {
    background-color: $primary-color;
    border-color: $primary-color;
    color: $white;

    &:hover {
      background: lighten($primary-color, 20%);
      border-color: lighten($primary-color, 20%);
    }
    &:active {
      background-color: darken($primary-color, 20%);
      border-color: darken($primary-color, 20%);
    }

    &.is-disabled {
      cursor: not-allowed;
      background: lighten($primary-color, 20%);
      border-color: lighten($primary-color, 20%);
      &:hover {
        background: lighten($primary-color, 20%);
        border-color: lighten($primary-color, 20%);
      }
    }

    &.jw-theme-dashed {
      border-style: dashed;
      background-color: $white !important;
      color: $primary-color;

      > .jw-loadingIndicator {
        border-style: dashed;
        border-color: $primary-color $primary-color $primary-color transparent;
      }
    }
  }

  &.jw-theme-info {
    background-color: $info-color;
    border-color: $info-color;
    color: $white;
    &:hover {
      background: lighten($info-color, 20%);
      border-color: lighten($info-color, 20%);
    }
    &:active {
      background-color: darken($info-color, 20%);
      border-color: darken($info-color, 20%);
    }

    &.is-disabled {
      cursor: not-allowed;
      background: lighten($info-color, 20%);
      border-color: lighten($info-color, 20%);
      &:hover {
        background: lighten($info-color, 20%);
        border-color: lighten($info-color, 20%);
      }
    }

    &.jw-theme-dashed {
      border-style: dashed;
      background-color: $white !important;
      color: $info-color;

      > .jw-loadingIndicator {
        border-style: dashed;
        border-color: $info-color $info-color $info-color transparent;
      }
    }
  }

  &.jw-theme-success {
    background-color: $success-color;
    border-color: $success-color;
    color: $white;
    &:hover {
      background: lighten($success-color, 20%);
      border-color: lighten($success-color, 20%);
    }
    &:active {
      background-color: darken($success-color, 20%);
      border-color: darken($success-color, 20%);
    }

    &.is-disabled {
      cursor: not-allowed;
      background: lighten($success-color, 20%);
      border-color: lighten($success-color, 20%);
      &:hover {
        background: lighten($success-color, 20%);
        border-color: lighten($success-color, 20%);
      }
    }

    &.jw-theme-dashed {
      border-style: dashed;
      background-color: $white !important;
      color: $success-color;

      > .jw-loadingIndicator {
        border-style: dashed;
        border-color: $success-color $success-color $success-color transparent;
      }
    }
  }

  &.jw-theme-warning {
    background-color: $warning-color;
    border-color: $warning-color;
    color: $white;
    &:hover {
      background: lighten($warning-color, 20%);
      border-color: lighten($warning-color, 20%);
    }
    &:active {
      background-color: darken($warning-color, 20%);
      border-color: darken($warning-color, 20%);
    }

    &.is-disabled {
      cursor: not-allowed;
      background: lighten($warning-color, 20%);
      border-color: lighten($warning-color, 20%);
      &:hover {
        background: lighten($warning-color, 20%);
        border-color: lighten($warning-color, 20%);
      }
    }

    &.jw-theme-dashed {
      border-style: dashed;
      background-color: $white !important;
      color: $warning-color;

      > .jw-loadingIndicator {
        border-style: dashed;
        border-color: $warning-color $warning-color $warning-color transparent;
      }
    }
  }

  &.jw-theme-error {
    background-color: $error-color;
    border-color: $error-color;
    color: $white;
    &:hover {
      background: lighten($error-color, 20%);
      border-color: lighten($error-color, 20%);
    }
    &:active {
      background-color: darken($error-color, 20%);
      border-color: darken($error-color, 20%);
    }

    &.is-disabled {
      cursor: not-allowed;
      background: lighten($error-color, 20%);
      border-color: lighten($error-color, 20%);
      &:hover {
        background: lighten($error-color, 20%);
        border-color: lighten($error-color, 20%);
      }
    }

    &.jw-theme-dashed {
      border-style: dashed;
      background-color: $white !important;
      color: $error-color;

      > .jw-loadingIndicator {
        border-style: dashed;
        border-color: $error-color $error-color $error-color transparent;
      }
    }
  }

  > .jw-loadingIndicator {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 4px;
    border-radius: 8px;
    border-color: $white $white $white transparent;
    border-style: solid;
    border-width: 2px;
    animation: jw-spin 1s infinite linear;
  }
}

@keyframes jw-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

```

![jw-ui演示3.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55721c1cee1c46cc9c453d7b2a791071~tplv-k3u1fbpfcp-watermark.image?)

虽然有不完美，但差不多就这个意思吧👀

# 4. 封装Markdown组件介绍文档
## 4.1. 下载
`vite-plugin-markdown`：一个插件可以让你导入Markdown文件作为各种格式的vite项目。

`github-markdown-css`：复制GitHub Markdown风格
```shell
yarn add github-markdown-css vite-plugin-markdown
```

## 4.2. main.ts中引入
```TYPESCRIPT
import "github-markdown-css";
```

## 4.3. vite.config.js中配置vite-plugin-markdown插件
```TYPESCRIPT
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const md = require("vite-plugin-markdown");

export default defineConfig({
  plugins: [vue(),
    md.plugin({
    mode: ["html", "vue"],
  }),]
})

```
## 4.4. 封装Markdown组件
```TYPESCRIPT
// /components/Markdown.vue
<template>
  <article class="markdown-body" v-html="content"></article>
</template>

<script setup lang="ts">
// 传入的md文件
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>

```

## 4.5. 创建介绍页面路由
```typescript
import { h } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/home/index.vue";
import Doc from "../views/doc/index.vue";
import ButtonDoc from "../views/doc/button/index.vue";

const history = createWebHashHistory();

import Markdown from "../components/Markdown.vue";
const md = (string) => h(Markdown, { content: string, key: string });
import { html as Intro } from "../../markdown/intro.md";
const IntroDoc = md(Intro);

const router = createRouter({
  history,
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    {
      path: "/doc",
      component: Doc,
      children: [
        { path: "intro", component: IntroDoc },
        { path: "button", component: ButtonDoc },
      ],
    },
  ],
});

export default router;

```
可以看到，最终md就能导入，并且生成了github上md的样式了😁

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64457a76cf894f9a8564ff06a7436c99~tplv-k3u1fbpfcp-watermark.image?)

# 5. 自定义代码块获取组件展示源代码

## 5.1. 自定义插件vue-custom-blocks-plugin
```typescript
import path from "path";
import fs from "fs";
import { baseParse } from "@vue/compiler-core";
const vitePluginVue = {
  name: "preview",
  transform(code, id) {
    if (
      !/\/src\/views\/doc\/.*\.preview\.vue/.test(id) ||
      !/vue&type=preview/.test(id)
    ) {
      return;
    }

    let path = `.${id.match(/\/src\/views\/doc\/.*\.preview\.vue/)[0]}`;
    const file = fs.readFileSync(path).toString();
    const parsed = baseParse(file).children.find((n) => n.tag === "preview");
    const title = parsed.children[0].content;
    const main = file.split(parsed.loc.source).join("").trim();
    return `export default function (Component) {
      Component.__sourceCode = ${JSON.stringify(main)}
      Component.__sourceCodeTitle = ${JSON.stringify(title)}
    }`.trim();
  },
};

export default vitePluginVue;


```
## 5.2. 在vite.config.ts中配置
```TYPESCRIPT
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const md = require("vite-plugin-markdown");
import vitePluginVue from "./plugins/vue-custom-blocks-plugin";

export default defineConfig({
  plugins: [vue(),
    md.plugin({
    mode: ["html", "vue"],
  }),
  vitePluginVue]
})

```
## 5.3. 封装Preview组件展示
```TYPESCRIPT
<template>
  <div class="pre">
    <h2>
      {{ component.__sourceCodeTitle }}
      <Button @click="hideCode" v-if="codeVisible">隐藏代码</Button>
      <Button @click="showCode" v-else>查看代码</Button>
    </h2>
    <div class="pre-component">
      <component :is="component" />
    </div>

    <div class="pre-code" v-if="codeVisible">
      <pre class="language-html">{{ component__sourceCOde }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../lib/button/index.vue";
import { computed, ref } from "vue";
const props = defineProps({
  component: Object,
});

const showCode = () => (codeVisible.value = true);
const hideCode = () => (codeVisible.value = false);
const codeVisible = ref(false);
</script>

<style lang="scss" scoped>
$border-color: #d9d9d9;

.pre {
  border: 1px solid $border-color;
  margin: 16px 0px 32px;
  max-width: 700px;
  min-width: 300px;
  > h2 {
    font-size: 20px;
    padding: 8px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
  }

  &-component {
    padding: 16px;
  }

  &-actions {
    padding: 8px 16px;
    border-top: 1px dashed $border-color;
  }

  &-code {
    padding: 8px 16px;
    border-top: 1px dashed $border-color;

    > pre {
      line-height: 1.1;
      font-family: Consolas, "Courier New", Courier, monospace;
      margin: 0;
      background-color: #fff;
    }
  }
}
</style>

```

## 5.4. 使用Preview组件
`views/doc/button/index.vue`
```typescript
<template>
  <div>
    <Preview :component="Button1" />
  </div>
</template>

<script setup>
import Button1 from "./Button1.preview.vue";
import Preview from "../../../components/Preview.vue";
</script>

<style lang="scss">
.jw-button + .jw-button {
  margin-left: 20px;
}
</style>

```
`/views/doc/button/Button1.preview.vue`
```TYPESCRIPT
<preview>基础示例</preview>
<template>
  <Button />
</template>

<script setup lang="ts">
import Button from "../../../lib/button/index.vue";
</script>

```
现在，只要编写上面的以.preview.vue后缀的文件就行了。
- 效果：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce6bd9f36ea7477a9cbda782701cd462~tplv-k3u1fbpfcp-watermark.image?)



## 5.5. 高亮源代码
下载prismjs
```
yarn add prismjs
```
对Preview组件做修改
```typescript
<template>
  <div class="pre">
    <h2>
      {{ component.__sourceCodeTitle }}
      <Button @click="hideCode" v-if="codeVisible">隐藏代码</Button>
      <Button @click="showCode" v-else>查看代码</Button>
    </h2>
    <div class="pre-component">
      <component :is="component" />
    </div>

    <div class="pre-code" v-if="codeVisible">
      <pre class="language-html" v-html="html" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "../lib/button/index.vue";
import { computed, ref } from "vue";
import "prismjs";
import "prismjs/themes/prism.css";
const Prism = (window as any).Prism;
const props = defineProps({
  component: Object,
});

console.log(props.component.__sourceCode);
const html = computed(() => {
  return Prism.highlight(
    props.component.__sourceCode,
    Prism.languages.html,
    "html"
  );
});
const showCode = () => (codeVisible.value = true);
const hideCode = () => (codeVisible.value = false);
const codeVisible = ref(false);
</script>
```
- 效果

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/700c8478db074bb8a18fd57d130c3f0e~tplv-k3u1fbpfcp-watermark.image?)

# 6. 去掉示例中的文件导入

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/381de80dcb194c2b837f234f31d47de8~tplv-k3u1fbpfcp-watermark.image?)

## 6.1. 在lib目录下创建main.ts 这个也是作为之后打包上传至npm的入口
```TYPESCRIPT
import { App } from "vue";
import JwButton from "./button/index.vue";
export {  JwButton };
const components = [JwButton];

// 全局注册主键
export function registerJwUi(app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}

export default registerJwUi;

```

## 6.2. main.ts中导入注册
```
import JwUi from "./lib/index";
app.use(JwUi);
```

## 6.3. 这样在示例中就可以直接用了`/src/views/doc/button/Button1.preview`
```
<preview>基础示例</preview>
<template>
  <jw-button />
</template>
```

## 6.4. 效果

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b4ffbecdfe84d0f98af14330f981490~tplv-k3u1fbpfcp-watermark.image?)

# 7. 部署到github官网
## 7.1. 打包
```shell
yarn build
```

## 7.2. 上传至github
github创建一个新的仓库
将dist上传只仓库

## 7.3. 进入仓库Settings最底层

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8fd96278942417b8129f2ba18d45fe8~tplv-k3u1fbpfcp-watermark.image?)

## 7.4. 找到GitHub Pages

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/991888189a03436e98e73cb0cbcd7125~tplv-k3u1fbpfcp-watermark.image?)

## 7.5. 选择master分支 点击保存 链接就生成了

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1a3ee7e034843bc9422a13c99a2ec55~tplv-k3u1fbpfcp-watermark.image?)

## 7.6 一键部署
创建deploy.sh文件
```SH
rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M master &&
git remote add origin git@github.com:coderyjw/jw-ui-website.git &&
git push -f -u origin master &&
cd -
echo https://coderyjw.github.io/jw-ui-website/
```
执行命令
```
sh deploy.sh
```
# 8. 上传至npm
## 8.1. 创建rollup.config.js配置文件
```JAVASCRIPT
// 为了保证版本一致，请复制我的 package.json 到你的项目，并把 name 改成你的库名
import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass';
import { terser } from "rollup-plugin-terser"
import alias from '@rollup/plugin-alias'
import path from "path";
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/lib/index.ts',
  output: [{
    globals: {
      vue: 'Vue'
    },
    name: 'Yjw-ui',
    file: 'dist/lib/yjw-ui.js',
    format: 'umd',
    plugins: [terser()]
  }, {
    name: 'Yjw-ui',
    file: 'dist/lib/yjw-ui.esm.js',
    format: 'es',
    plugins: [terser()]
  }],
  plugins: [
    scss({ include: /\.scss$/, sass: dartSass }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015' 
    }),
    vue({
      include: /\.vue$/,
    }),
    alias({
      entries: [
        {
          find: '@', // 别名名称，作为依赖项目需要使用项目名
          replacement: path.resolve(__dirname, 'src'), 
          customResolver: resolve({
            extensions: ['.js', '.jsx', '.vue', '.sass', '.scss']
          })
        }
      ]
    }),
  ],
}
```

## 8.2. 执行命令打包
```
rollup -c
```

## 8.3. 效果
可以看到dist文件下有lib文件，就是打包后的文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/521cd318fe4e48f5b235d88845e0be92~tplv-k3u1fbpfcp-watermark.image?)

## 8.4. 上传至npm
需要先注册npm账号
```shell]
npm login // 先登录
npm publish // 发布
```

# 9. 最后
ok,终于写完了😌，如果你觉得我写的不错，麻烦点个赞再走吧~

如果觉得我写的有错的，麻烦指出再点个赞鼓励一下吧😭🤗。