---
title: 网站开发中，如何实现图片的懒加载
category: HTML
tags: html
updatedAt: 2022-10-29T12:52:11.488Z
createdAt: 2022-10-28T19:17:24.582Z

---



:::info{title="更多描述"}
网站开发中，如何实现图片的懒加载，随着 web 技术的发展，他有没有一些更好的方案
:::

**图片的懒加载就是在滑动页面到能看到图片的时候再加载图片。**

- 可以把问题拆分成两个
  1. 如何判断图片出现在了当前视口
  2. 如何控制图片的加载

<!-- more -->

# 方案一：位置计算 + 滚动事件 (Scroll) + DataSet API

- **如何判断图片是否出现在窗口？**
  - 通过`offsetTop`，`clientHeight` 以及 `scrollTop` 各种关于图片的高度作比对。
  - 通过window.scroll动态监听
- **如何控制图片的加载？**
  - 设置一个临时 `Data` 属性 `data-src`，控制加载时使用 `src` 代替 `data-src`

```js
    const img = document.getElementById("img");
    const clientHeight = document.documentElement.clientHeight;

    window.addEventListener("scroll", (e) => {
        const imgTop = img.offsetTop - document.documentElement.scrollTop;
        if (imgTop >= 0 && imgTop <= clientHeight && !img.src) {
          img.src = img.dataset.src;
        }
    });
```

![1.gif](http://120.55.100.161/static/img/71efbf0bd4fe905bc610d819235d6e9e.1.gif)
**如图 当图片出现在窗口时给img添加上src属性。 **

# 方案二：getBoundingClientRect API + Scroll with Throttle + DataSet API

- 改进一下
  1. 引入一个新的 API， Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
  2. 加个lodash.throttle节流器，提高性能。

```JS
  const img = document.getElementById("img");
  const clientHeight = document.documentElement.clientHeight;

  const handleOnScroll = _.throttle((e) => {
    const imgTop = img.getBoundingClientRect().top;
    if (imgTop >= 0 && imgTop <= clientHeight && !img.src) {
      img.src = img.dataset.src;
      console.log(img);
    }
  });
  window.addEventListener("scroll", handleOnScroll);
```

# 方案三：IntersectionObserver API + DataSet API

- 方案二中的一系列组合动作太复杂了，浏览器有一个三合一的事件: `IntersectionObserver` API，一个能够监听元素是否到了当前视口的事件，一步到位！

```JS
    const img = document.getElementById("img");
  const observer = new IntersectionObserver((changes) => {
    // changes: 目标元素集合
    changes.forEach((change) => {
      // intersectionRatio
      if (change.isIntersecting) {
        const img = change.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  observer.observe(img);
```

这部分文档可以参考 [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

# 方案四：LazyLoading 属性（兼容性不太好）

- loading 属性指定浏览器是应立即加载图像还是延迟加载图像。
- 设置 loading="lazy" 只有鼠标滚动到该图片所在位置才会显示。

```html
 <img src="./avator.jpg" alt="" id="img" loading="lazy" />
```

![2.gif](http://120.55.100.161/static/img/997a18d8129f2af8e71110635b1249df.2.gif)

- **如图可以看到，设置 loading="lazy" 只有鼠标滚动到该图片所在位置才会去请求图片资源**