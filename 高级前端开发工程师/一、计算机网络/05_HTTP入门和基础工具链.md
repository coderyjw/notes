# 1.HTTP协议介绍

- 介绍
  - 超文本传输协议(Hyper TExt Transfer Protocol)
  - 处理客户端和服务端之间的通信
  - http请求/http返回
  - 网页/json/xml/提交表单

- 纯文本 + 无状态
  - 应用层协议  
  - 信息纯文本传输
  - 无状态
    - 每次请求独立
    - 请求间互不影响
  - 浏览器提供手段维护状态(cookie,session,storage)

- 历史
  - 1991 HTTP 0.9
  - 1996 HTTP 1.0
  - 1999 HTTP 1.1
  - 2015 HTTP 2.0

- 设计的基础因素
  - 带宽（基础网络 线路设备等）
  - 延迟
    - 浏览器
    - DNS
    - 建立连接 （三次握手）
- 设计考虑因素
  - 缓存
  - 带宽优化
  - 压缩
  - 安全性(HTTPS)
  

# 2.Node.js实战http请求
```javascript
const net = require("net");

const response = `hello`;
const response1 = `
HTTP/1.1 200 OK
Data: Tue,30 Jun 2022 01:00:00 GMT
Content-Type: text/plain
Connection: Closed

Hello World
`;
const server = net.createServer((socket) => {
  socket.end(response1);
});

server.listen(80, () => {
  console.log("80端口启动");
});
```

# 3. chrome/curl/postman/whistle工具初探


# 4. 总结
- 简单比效率更重要(Java/HTTP)
- 跟上时代，掌握更多的工具