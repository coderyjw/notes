# 1. 通用头部
1. Cache-Control： 用来指定当前的请求/回复中是否使用缓存机制
   1. public:表明响应可以被任何对象缓存 （例如：1.该响应没有max-age指令或Expires消息头；2. 该响应对应的请求方法是 POST 。）
   2. private：表明响应只能被单个用户缓存，不能作为共享缓存
   3. no-cache：在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)。
   4. no-store：缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。
   5. max-age
2. Connection：客户端（浏览器）想要优先使用的连接类型（Connection: keep-alive (Upgrade)）
3. Date：报文创建时间 Date: Dec, 26 Dec 2015 17: 30: 00 GMT
4. Upgrade：要求服务器升级到一个高版本协议 Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11
5. Via  告诉服务器，这个请求是由哪些代理发出的  Via: 1.0 fred, 1.1 itbilu.com.com (Apache/1.1)
6. Warning：一个一般性的警告，表示在实体内容中可能存在错误 Warning: 199 Miscellaneous warning

# 2. 请求头部
1. Accept: 	告诉服务器自己允许哪些媒体类型  Accept: text/plain
2. Accept-Charset: 浏览器申明可接受的字符集 Accept-Charset: utf-8
3. Accept-Encoding 浏览器申明自己接收的编码方法 	Accept-Encoding: gzip, deflate
4. Accept-Language 浏览器可接受的响应内容语言列表 Accept-Language: en-US
5. Authorization 用于表示 HTTP 协议中需要认证资源的认证信息 Authorization: Basic OSdjJGRpbjpvcGVul ANIc2SdDE==
6. Expect 表示客户端要求服务器做出特定的行为 Expect: 100-continue
7. From 	发起此请求的用户的邮件地址 From: user@itbilu.com
8. Host 	表示服务器的域名以及服务器所监听的端口号
9. Referer  指示了请求来自于哪个具体页面，包含服务器名和路径的详细URL，浏览器自动添加到http请求 Header 中 Referer: https://developer.mozilla.org/en-US/docs/Web/JavaScript
10. Origin  指示了请求来自于哪个站点，只有服务器名，不包含路径信息 Origin: https://developer.mozilla.org
11. User-Agent 	浏览器的身份标识字符串
12. Range  表示请求某个实体的一部分，字节偏移以 0 开始 Range: bytes=500-999

# 3. 响应头部
1. Accept-Ranges 字段的值表示可用于定义范围的单位 Accept-Ranges: bytes
2. Age 创建响应的时间 Age：5744337
3. ETag 唯一标识分配的资源 Etag：W/"585cd998-7c0f"
4. Location 表示重定向后的 URL   Location: http://www.zcmhi.com/archives/94.html
5. Retry-After  	告知客户端多久后再发送请求  	Retry-After: 120
6. Server  告知客户端服务器信息   	Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)


# 4.实体头部
1. Allow 对某网络资源的有效的请求行为，不允许则返回405  Allow: GET, HEAD
2. Content-Type 返回内容的MIME类型 Content-Type: text/html; charset=utf-8
3. Content-Length   	返回内容的字节长度   Content-Length: 348
4. Content-encoding 返回内容的编码方式 Content-Encoding: gzip
5. Content-Language  响应体的语言  Content-Language: en,zh
6. Last-Modified  	请求资源的最后修改时间  	Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT
7. Expires   	响应过期的日期和时间   Expires: Thu, 01 Dec 2010 16:00:00 GMT


通用头：是客户端和服务器都可以使用的头部，可以在客户端、服务器和其他应用程序之间提供一些非常有用的通用功能，如Date头部。
请求头：是请求报文特有的，它们为服务器提供了一些额外信息，比如客户端希望接收什么类型的数据，如Accept头部。
响应头：便于客户端提供信息，比如，客服端在与哪种类型的服务器进行交互，如Server头部。
实体头：指的是用于应对实体主体部分的头部，比如，可以用实体头部来说明实体主体部分的数据类型，如Content-Type头部。
