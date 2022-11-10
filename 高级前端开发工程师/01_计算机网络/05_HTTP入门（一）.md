## 1.HTTP协议介绍

###  HTTP是什么？
HTTP (HyperText Transfer Protocol)，即**超文本运输协议**，是实现网络通信的一种规范


![image.png](https://yejiwei.com/static/img/ef1a833cf049aa871964c4f8829c688a.image.png)

在计算机和网络世界有，存在不同的协议，如广播协议、寻址协议、路由协议等等......

而 `HTTP` 是**一个传输协议**，即将数据由A传到B或将B传输到A，并且 A 与 B 之间能够存放很多第三方，如： A<=>X<=>Y<=>Z<=>B

传输的数据并不是计算机底层中的二进制包，而是完整的、有意义的数据，如HTML 文件, 图片文件, 查询结果等超文本，能够被上层应用识别

在实际应用中，HTTP常被用于在Web浏览器和网站服务器之间传递信息，以明文方式发送内容，不提供任何方式的数据加密

<!-- more -->

### HTTP的特点
1. 应用层协议（下面可以是TCP/IP）
2. 信息纯文本传输
3. 支持客户/服务器模式
4. 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快
5. 灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记
6. 无状态：每次请求独立，请求之间互相不影响（浏览器提供了手段维护状态比如Cookie,Session,Storage等）

###  HTTP的历史

  - 1991 HTTP 0.9 （实验版本）
  - 1996 HTTP 1.0 （有广泛用户）
  - 1999 HTTP 1.1 （影响面最大的版本）
  - 2015 HTTP 2.0 （大公司基本上都是2.0了）
  - 2018 HTTP 3.0 （2022 年 6 月 6 日正式发布了）

他们的区别之后再说吧

###  Header和Body

- HTTP是一个文本传输协议，传输内容是人类可读的文本，大体分成两部分：
    - 请求头（Header）/ 返回头
    - 消息体（Body）

下面演示一个Node.js实战http请求

```javascript
const net = require("net");

const response = `
HTTP/1.1 200 OK
Data: Tue,30 Jun 2022 01:00:00 GMT
Content-Type: text/plain
Connection: Closed

Hello World
`;
const server = net.createServer((socket) => {
  socket.end(response);
});

server.listen(80, () => {
  console.log("80端口启动");
});

```

从浏览器中观察


![image.png](https://yejiwei.com/static/img/2bdb2321a037066c260727d2abc0df18.image.png)


