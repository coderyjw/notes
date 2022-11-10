
# 1. HTTP常见请求头

## 1.1 请求头是什么？
HTTP头字段（HTTP header fields）,是指在超文本传输协议（HTTP）的请求和响应消息中的消息头部分

它们定义了一个超文本传输协议事务中的操作参数

`HTTP` 头部字段可以自己根据需要定义，因此可能在 `Web` 服务器和浏览器上发现非标准的头字段

下面是一个 `HTTP` 常见的请求头：

![image.png](https://yejiwei.com/static/img/efa31191accdabf929f7d6ee2a91f13d.image.png)

下面是一个 `HTTP` 常见的响应头

![image.png](https://yejiwei.com/static/img/0d1ac7bba1550f131740f36b1e4d7cd9.image.png)

<!-- more -->

## 1.2 常见HTTP头

### 1.2.1 Content-Length

- **发送给接受者的Body内容长度（字节）**

    - 一个byte是8bit
    - UTF-8编码的字符1-4个字节、

示例：Content-Length: 348

### 1.2.2 User-Agent
     
 - **帮助区分客户端特性的字符串**
     
     - 操作系统
     - 浏览器
     - 制造商（手机类型等）
     - 内核类型
     - 版本号

 示例：User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36
     
### 1.2.3 Content-Type
  
- **帮助区分资源的媒体类型（Media Type/MIME Type）**
    
    - text/html
    - text/css
    - application/json
    - image/jpeg

示例：Content-Type: application/x-www-form-urlencoded
    
### 1.2.4 Origin：
   
- **描述请求来源地址**
   
   - scheme://host:port
   - 不含路径
   - 可以是null

示例： Origin: https://yewjiwei.com
    
### 1.2.5 Accept
   
- **建议服务端返回何种媒体类型（MIME Type）**
    
    - */*代表所有类型（默认）
    - 多个类型用逗号隔开
    - 衍生的还有 
        - Accept-Charset能够接受的字符集  示例：Accept-Charset: utf-8
        - Accept-Encoding能够接受的编码方式列表  示例：Accept-Encoding: gzip, deflate
        - Accept-Language能够接受的回应内容的自然语言列表 示例：Accept-Language: en-US
    
示例：
1. Accept: text/plain
2. Accept-Charset: utf-8
3. Accept-Encoding: gzip, deflate
    
     
 ### 1.2.6 Referer
 
- **告诉服务端打开当前页面的上一张页面的URL；如果是ajax请求那么就告诉服务端发送请求的URL是什么**
   
   - 非浏览器环境有时候不发送Referer
   - 常常用户行为分析

### 1.2.7 Connection
    
- **决定连接是否在当前事务完成后关闭**
    
    - HTTP1.0默认是close
    - HTTP1.1后默认是keep-alive
    

# 2. 基本方法
- GET 从服务器获取资源（一个网址url代表一个资源）
- POST 在服务器创建资源
- PUT 在服务器修改资源
- DELETE 在服务器删除资源
- OPTIONS 跟跨域相关 
- TRACE 用于显示调试信息
- CONNECT 代理
- PATCH 对资源进行部分更新（极少用）

# 3. 状态码

- 1XX: 提供信息
  - 100 continue 情景：客户端向服务端传很大的数据，这个时候询问服务端，如果服务端返回100，客户端就继续传 （历史，现在比较少了）
  - 101 协议切换switch protocol 
  ```
  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  ```
  告诉客户端把协议切换为Websocket
- 2xx: 成功
  - 200 `Ok` 正常的返回成功 通常用在GET
  - 201 `Created` 已创建 通常用在POST
  - 202 `Accepted` 已接收 比如发送一个创建POST请求，服务端有些异步的操作不能马上处理先返回202，结果需要等通知或者客户端轮询获取
  - 203 `Non-Authoritative Infomation` 非权威内容  原始服务器的内容被修改过
  - 204 `No Content` 没有内容 一般PUT请求修改了但是没有返回内容
  - 205 `Reset Content` 重置内容
  - 206 `Partial Content` 服务端下发了部分内容
- 3XX: 重定向
  - 300 `Multiple Choices` 用户请求了多个选项的资源（返回选项列表）
  - 301 `Moved Permanently` 永久转移
  - 302 `Found` 资源被找到（以前是临时转移）不推荐用了 302拆成了303和307
  - 303 `See Other` 可以使用GET方法在另一个URL找到资源 
  - 304 `Not Modified` 没有修改 
  - 305 `Use Proxy` 需要代理
  - 307 `Temporary Redirect` 临时重定向 （和303的区别是，307使用原请求的method重定向资源， 303使用GET方法重定向资源）
  - 308 `Permanent Redirect` 永久重定向 (和301区别是 客户端接收到308后，之前是什么method，之后也会沿用这个method到新地址。301，通常给用户会向新地址发送GET请求)
- 4XX: 客户端错误
  - 400 `Bad Request` 请求格式错误
  - 401 `Unauthorized` 没有授权
  - 402 `Payment Required` 请先付费
  - 403 `Forbidden` 禁止访问
  - 404 `Not Found` 没有找到
  - 405 `Method Not Allowed` 方法不允许
  - 406 `Not Acceptable` 服务端可以提供的内容和客户端期待的不一样
- 5XX: 服务端错误
  - 500 `Internal Server Error` 内部服务器错误
  - 501 `Not Implemented` 没有实现
  - 502 `Bad Gateway` 网关错误
  - 503 `Service Unavailable` 服务不可用 （内存用光了，线程池溢出，服务正在启动）
  - 504 `Gateway Timeout` 网关超时 
  - 505 `HTTP Version Not Supported` 版本不支持

   
    
    
    
     
     