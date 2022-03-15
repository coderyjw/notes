- 强制缓存
  Cache-Control:public private no-cache no-store
- 协商缓存
  服务端判断资源是否修改
  为修改返回 304

  1. 服务端给客户端 Last-Modify 客户端给服务端 If-Modify-Since
  2. 服务端给客户端 ETag(指纹) 客户端给服务端 If-None-Match

  - 协商缓存优先使用 ETag
  - Last-Modify 只能精确到秒级
  - 如果资源被重复生成，而内容不变，ETag 更精确
