1.  长连接： HTTP1.1默认是长连接  HTTP1.0默认短连接 设置Connection:keep-alive改为长连接
2.  缓存处理：HTTP1.0主要使用header里的if-modified-Since, Expries；HTTP1.1 添加更多相关字段Entity-tag, If-Unmodified-Since, If-Match, If-None-Match
3.  节约带宽 HTTP1.1添加range头 ，表示只请求部分资源；HTTP/1.0默认将资源相关的整个对象传送给请求放
4.  错误通知的管理 HTTP1.1增加了24个状态码，例如 414 表示客户端请求中所包含的 URL 地址太长，以至于服务器无法处理；410 表示所请求的资源已经被永久删除。
5.  Host请求头：随着虚拟机的出现，一台物理服务器上可以存在多个虚拟主机，并且他们共享同一个IP地址。为了支持虚拟主机，HTTP1.1添加了host请求头，请求消息和响应消息中应声明这个字段，若请求消息中缺少该字段时服务端会响应一个 404 错误状态码。


- 总结
  1. 长短连接 keep-alive 基于tcp
  2. 缓存策略（更加灵活、增加）
  3. 节约带宽（range头域请求部分资源）
  4. 错误消息管理（增加24课状态码）
  5. host请求头（ip、虚拟主机）；