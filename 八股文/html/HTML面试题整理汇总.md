1. 常见 `meta` 元素有哪些?
2. `script` 标签中， `async` 和 `defer` 两个属性有什么用途和区别？
3. 什么是 `HTML` 语义化?
4. 行内元素有哪些？块级元素有哪些？ 空( `void` )元素有那些？
5. 如何禁用 `a` 标签跳转页面或定位链接?
6. `HTML` 标签中的 `src` 和 `href` 有什么区别?
7. `script` 标签为什么建议放在 `body` 标签的底部（`defer`、`async`）?
8. `HTML5` 有哪些新特性？
9. 简述 `HTML` 渲染过程
10. 简单描述从输入网址到页面显示的过程
11. 页面导入样式时，使用 `link` 和 `@import` 有什么区别？
12. `css` 加载会造成阻塞吗？
13. `CSSOM` 树和 `DOM` 树是同时解析的吗？
14. `input` 上传文件可以同时选择多张吗？怎么设置？
15. `label` 标签有什么用？
16. `js` 和 `css` 是如何影响 `DOM` 树构建的？
17. `title`与`h1`的区别、`b`与 `strong`的区别、`i`与`em`的区别？
18. `SEO`是什么？
19. 如何实现`SEO`优化
20. 导致页面加载白屏时间长的原因有哪些，怎么进行优化？
21. 常见浏览器内核有哪些？
22. URL和URI的区别是什么？
23. DOMContentLoaded和load和unload和beforeunload的区别是什么？
24. 什么是pv，什么是uv？
25. 什么是DOM和BOM？
26. 什么是iconfont,优缺点有哪些？




下附答案

<!-- more -->

## 1. 常见meta元素有哪些？

`<meta>` 元素标签是提供有关 `HTML` 文档的元数据，元数据不会显示在页面上，但是能够被机器识别。

总而言之, `meta`标签是用来让机器识别的，同时它对`SEO`起着重要的作用。

- **charset**

指定了 `html` 文档的编码格式，常用的是 `utf-8` (Unicode的字符编码)，还有 `ISO-8859-1` (拉丁字母的字符编码)。当然还有其他的，但是一般不常用也就不介绍了。

```html
<meta charset="utf-8">
```

- **name & content**

  指定元数据的名称(这部分对`SEO`非常有用)

```html
<!-- author——定义了页面的作者 -->
<meta name="author" content="Tony">

<!-- keywords——为搜索引擎提供关键字 -->
<meta name="keywords" content="HTML, CSS, JavaScript">

<!-- description——对网页整体的描述 -->
<meta name="description" content="My tutorials on HTML, CSS and JavaScript">

<!-- viewport——对页面视图相关进行定义 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minmum-scale=1.0">

<!-- theme-color——定义主题颜色 -->
<meta name="theme-color" content="#222">
```

- **http-equiv & content**

    为内容属性的信息/值提供HTTP标头

```html
<!-- refresh——每30s刷新一次文档 -->
<meta http-equiv="refresh" content="30">

<!-- Cache-Control——请求和响应遵循的缓存机制，可以声明缓存的内容，修改过期时间，可多次声明
     1. no-transform——不得对资源进行转换或转变。
     2. no-siteapp——禁止百度进行转码
-->
<meta http-equiv="Cache-Control" content="no-transform">
<meta http-equiv="Cache-Control" content="no-siteapp">

<!-- 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。(GMT格式) -->
<meta http-equiv="expires" content="Wed, 20 Jun 2007 22:33:00 GMT"/>
```

- **property & content**

    可以让网页成为一个富媒体对象，同意网页内容被其他网站引用，同时在应用的时候不会只是一个链接，会提取相应的信息展现给用户。
    
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://zjgyb.github.io/index.html">
<meta property="og:site_name" content="tony's blog">
```


## 2. script 标签中， async 和 defer 两个属性有什么用途和区别？

`async`和`defer`的作用是**使的浏览器的能异步的加载和执行指定的脚本**。

区别是

1. `defer`脚本会在文档渲染完毕后，`DOMContentLoaded`事件调用前执行。`aysnc`脚本会在加载完后直接执行。
2. 设置了多个`defer`属性`script`标签，按照顺序执行这些脚本，而`async`属性不会按照顺序执行。

如下图所示：

![image.png](https://yejiwei.com/static/img/c8e7ef308c9d5a70387fc138fd98c35d.image.png)

## 3. 什么是HTML语义化？

HTML语义化就是用合理、正确的标签来展示内容。

- 语义化的优点
    - 标签语义化有助于构架良好的`HTML`结构
    - 有利于`SEO`
    - 有利于不同设备的解析（屏幕阅读器，盲人阅读器等）
    - 语义化更具可读性，有利于团队的开发、维护


## 4. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

- 行内元素
    - span
    - a
    - strong
    - i
    - em
    - label
- 块级元素
    - div
    - h1 h2 h3 h4 h5 h6
    - ul ol li dl
    - table
    - p
- 内联块状元素
    - img
    - input
- 空元素
    - meta
    - img
    - br
    - input
    - hr
    - link

## 5. 如何禁用a标签跳转页面或定位链接?

1. 从`css`入手 不响应任何鼠标事件
```css
pointer-events: none;
```

2. 标签属性href，使其指向空或不返回任何内容
```html
<a href="javascript:void(0);" >点此无反应javascript:void(0)</a>

<a href="javascript:;" >点此无反应javascript:</a>
```

3. 标签事件
```html
<a href="" onclick="return false;">return false;</a>
<a href="#" onclick="return false;">return false;</a>
```

4. js阻止默认点击事件
```html
Event.preventDefault()
```

## 6. HTML 标签中的 src 和 href 有什么区别?
- src: 目的是把资源下载到页面中；
- href: 是超文本引用，它是指向资源的位置，建立与目标文件的联系；

浏览器解析 `href` 不会阻塞对文档的处理（这就是官方建议使用 `link` 引入而不是 `@ import` 的原因），`src` 会阻塞对文档的处理。

## 7. script 标签为什么建议放在 body 标签的底部（defer、async）?
因为浏览器在渲染`html`的时候是从上到下执行的，当遇到`js`文件的时候就会停止当前页面的渲染，转而去下载`js`文件。

如果将`script`标签放在头部，在文件很大的情况下将导致**首屏加载时间延长，影响用户体验**。

- 解决办法
    - 将`script`标签放在`body`的底部
    - 通过`defer`、`async`属性将`js`文件转为异步加载

## 8. HTML5 有哪些新特性？

1. 新增语义化标签：nav、header、footer、aside、section、article
2. 音频、视频标签：audio、video
3. 数据存储：localStorage、sessionStorage
4. canvas（画布）、Geolocation（地理定位）、websocket（通信协议）
5. input标签新增属性：placeholder、autocomplete、autofocus、required
6. history API (go、forward、back、pushstate)

## 9. 简述HTML渲染过程
1. 解析`HTML`文件，创建`DOM`树
2. 解析`CSS`,形成`CSS`对象模型
3. 将`CSS`与`DOM`合并，构建渲染树（`renderingtree`）
4. 布局和绘制

以上四个步骤并不是一次性顺序完成的。如果`DOM`或者`CSSOM`被修改，以上过程会被重复执行。实际上，`CSS`和`JavaScript`往往会多次修改`DOM`或者`CSSOM`。

- **Repaint(重绘)**

    **重绘是改变不影响元素在网页中的位置的元素样式时**，譬如`background-color`(背景色)， `border-color`(边框色)，`visibility`(可见性)，浏览器会根据元素的新属性重新绘制一次(这就是重绘，或者说重新构造样式)，使元素呈现新的外观。

    重绘不会带来重新布局，所以并不一定伴随重排。

- **Reflow（重排）**

    渲染对象在创建完成并添加到渲染树时，并不包含位置和大小信息。**计算这些值的过程称为布局或重排。**

"重绘"不一定需要"重排"，比如改变某个网页元素的颜色，就只会触发"重绘"，不会触发"重排"，因为布局没有改变。

但是，"重排"必然导致"重绘"，比如改变一个网页元素的位置，就会同时触发"重排"和"重绘"，因为布局改变了。

![image.png](https://yejiwei.com/static/img/56de52d5d718663830f6a0c0327dc726.image.png)

## 10. 简单描述从输入网址到页面显示的过程

1. DNS解析 [前端重点：DNS和CDN](https://yejiwei.com/post/8)
2. 发起TCP连接 [TCP/IP协议和互联网协议群](https://yejiwei.com/post/7)
3. 发送HTTP请求 [HTTP（一）：HTTP协议入门](https://yejiwei.com/post/9)
4. 服务器处理请求并返回HTTP报文
5. 浏览器解析渲染页面 （见第9题答案）
6. 连接结束

## 11. 页面导入样式时，使用link和@import有什么区别？
`link`属于`HTML`标签，而`@import`是`css`提供的；

页面被加载时，`link`会同时被加载，而`@import`引用的`css`会等到页面被加载完再加载；

`@import`只在`IE5`以上才能识别，而`link`是`XHTML`标签，无兼容问题；

link方式的样式的权重高于@import的权重。

## 12. css加载会造成阻塞吗？

1. `css`加载不会阻塞`DOM`树的解析
2. `css`加载会阻塞`DOM`树的渲染
3. `css`加载会阻塞后面`js`语句的执行、


![image.png](https://yejiwei.com/static/img/85695bbb93040546e159b2d5a532d0a5.image.png)

从上面两个流程我们可以看出来：

- `DOM`解析和`CSS`解析是两个并行的进程，所以这也解释了为什么`CSS`加载不会阻塞`DOM`的解析。
- 然而，由于`Render Tree`是依赖于`DOM Tree`和`CSSOM Tree`的，所以他必须等待到`CSSOM Tree`构建完成，也就是`CSS`资源加载完成(或者`CSS`资源加载失败)后，才能开始渲染。因此，`CSS`加载是会阻塞`Dom`的渲染的。

## 13. CSSOM树和DOM树是同时解析的吗？

浏览器会下下载`HTML`解析页面生成`DOM`树，遇到`CSS`标签就开始解析`CSS`，这个过程不会阻塞，但是如果遇到了`JS`脚本，此时假如`CSSOM`还没有构建完，需要等待`CSSOM`构建完，再去执行`JS`脚本，然后再执行`DOM`解析，此时会阻塞。

## 14. input上传文件可以同时选择多张吗？怎么设置？

可以，通过给`input`标签设置`multiple`属性。
```HTML
<input type="file" name="files" multiple/>
```

## 15. label标签有什么用？

`label`标签来定义表单控制间的关系。当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。
```HTML
<label for="Name">Number:</label>
<input type='text' name="Name" id="Name"/>

<label>Date:<input type="text" name="B"/></label>
```

## 16. js和css是如何影响DOM树构建的？

`CSS`不会阻塞`DOM`的解析，但是会影响`javaScript`的运行，`javaScript`会阻止`DOM`树的解析，最终`css（CSSOM）`会影响`DOM`树的渲染，也可以说最终会影响渲染树的生成。

## 17. h1与title的区别、b与strong的区别、i与em的区别？

- `strong`和`b`的效果都是给文本加粗，`strong`有语义性，起到加重语气的效果，而`b`标签没有。 
- `title`表示网站的标题，一个页面只能有一个。`h1`表示文章的标题 有内置的样式。
- `i`和`em`效果都是斜体，`i`没有实际含义，而`em`则是用斜体的方式表示强调的文本。

## 18. SEO是什么？
SEO（Search Engine Optimization），汉译为搜索引擎优化。

搜索引擎优化是一种利用搜索引擎的搜索规则来提高目前网站在有关搜索引擎内的自然排名的方式。

`SEO`是指为了从搜索引擎中获得更多的免费流量，从网站结构、内容建设方案、用户互动传播、页面等角度进行合理规划，使网站更适合搜索引擎的索引原则的行为。

## 19. 如何实现SEO优化
`SEO`主要分为内部和外部两个方向。
- 内部优化
    - `META` 标签优化：例如：`TITLE`，`KEYWORDS`，`DESCRIPTION` （TDK）等的优化
    - 内部链接的优化，包括相关性链接（`Tag` 标签），锚文本链接，各导航链接，及图片链接
    - 网站内容更新：每天保持站内的更新(主要是文章的更新等)
    - 服务器端渲染（`SSR`）
- 外部优化
    - 外部链接类别：博客、论坛、B2B、新闻、分类信息、贴吧、知道、百科、相关信息网等尽量保持链接的多样性
    - 外链运营：每天添加一定数量的外部链接，使关键词排名稳定提升。
    - 外链选择：与一些和你网站相关性比较高,整体质量比较好的网站交换友情链接,巩固稳定关键词排名

## 20. 导致页面加载白屏时间长的原因有哪些，怎么进行优化？

要知道白屏时间长就需要知道白屏经历了哪些过程

从输入`url`，到页面的画面展示的过程
1. 首先，在浏览器地址栏中输入`url`
2. 浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕中显示页面内容。若没有，则跳到第三步操作。
3. 在发送`http`请求前，需要域名解析(`DNS解析`)，解析获取相应的`IP`地址。
4. 浏览器向服务器发起`tcp`连接，与浏览器建立`tcp`三次握手。
5. 握手成功后，浏览器向服务器发送`http`请求，请求数据包。
6. 服务器处理收到的请求，将数据返回至浏览器
7. 浏览器收到`HTTP`响应
8. 读取页面内容，浏览器渲染，解析`html`源码
9. 生成`Dom`树、解析`css`样式、`js`交互,渲染显示页面

**白屏优化**
- `DNS`性能优化
    - `DNS`缓存优化
    - `DNS`预加载策略
    - 稳定可靠的`DNS服务器`
- `TCP`网络链路优化
    - 多花点钱
- 服务端处理优化
    - 服务端的处理优化，是一个非常庞大的话题，会涉及到如`Redis`缓存、数据库存储优化或是系统内的各种中间件以及`Gzip`压缩等…
- 浏览器下载、解析、渲染页面优化
    - 尽可能的精简`HTML`的代码和结构
    - 尽可能的优化`CSS`文件和结构
    - 合理的放置`JS`代码，尽量不要使用内联的`JS`代码
    - 将渲染首屏内容所需的关键`CSS`内联到`HTML`中，能使`CSS`更快速地下载。在`HTML`下载完成之后就能渲染了，页面渲染的时间提前，从而缩短首屏渲染时间；
    - 延迟首屏不需要的图片加载，而优先加载首屏所需图片

## 21. 常见浏览器内核有哪些？

浏览其最核心写部分是渲染引擎(Rendering engine) 一般称为浏览器内核
- 负责解析网页语法，并渲染网页
# 常见浏览器内核有
- Trident(三叉戟): IE浏览器
- Gecko(壁虎)：Mozilla Firefox火狐浏览器
- Prestro -> Blink: Opera
- Webkit: Safari、搜狗浏览器
- Webkit -> Blink(眨眼)： Chrome, Edge

不同的浏览器内核有不同的的解析、渲染规则，所以同一网页在不同内核的浏览器中的渲染效果也可能不同


## 22. URL和URI的区别是什么？

1. URL 全称统一资源定位符Unique Resource Locator 俗称网络地址，相当于网络中的门牌号

2. URI 全称统一资源标识符Unique Resource Identifier ，用于标识Web技术使用的逻辑地址或物理资源

URL是一个URI的子集

## 23. DOMContentLoaded和load和unload和beforeunload的区别是什么？
他们都是 html 的页面的重要事件

- DOMContentLoaded：
  - 浏览器完全加载了 HTML，并构建 DOM,但是尚未加载 img 以及样式表时触发
  - 一般的 script 脚本会阻塞 html 的解析
- load:
  - 浏览器不仅加载完 HTMl,还加载完所有图片以及样式
  - 很少使用，因为无需等待这么长时间
- beforeunload：
  - 当用户想要离开页面时，window 上的 beforeunload 事件就会被触发。如果我们取消这个事件，浏览器就会询问我们是否真的要离开
- unload:
  - 当用户最终离开时，window 上的 unload 事件就会被触发。
  - 在处理程序中，我们只能执行不涉及延迟或询问用户的简单操作。正是由于这个限制，它很少被使用。
  - 我们可以使用 navigator.sendBeacon 来发送网络请求。

[兼容性 监听页面关闭发送请求]: https://cloud.tencent.com/developer/article/1875514

## 24. 什么是pv，什么是uv？

pv : Page View 页面访问量，用户每访问一次网站就算一次PV，衡量网站用户访问的网页数量

uv: unique visitor 独立访客
指通过互联网访问的自然人，一个电脑客户端是一个访客

## 25. 什么是DOM和BOM？

- DOM；
  - Document Object Model 文档对象模型，把文档当做对象，提供了操作网页内容的方法和接口
  - document（是window的子对象） 元素对象 属性对象 事件对象 console独享
- BOM: 
  - Broswer Object Model 浏览器对象模型，把浏览器当做一个对象，提供了和浏览器交互的方法和接口
  - window(顶层对象) location nacigator screen history

- BOM的核心是window

## 25. 什么是iconfont,优缺点有哪些？
iconfont是一种字体图标
- 优点；
  - 矢量，可伸缩。
  - 尺寸小，加载快
  - 兼容性好，所有浏览器都支持 ie6

- 缺点
  - 一般只限于一种颜色，除非应用一些css技巧
  - 不能用来显示复杂图像