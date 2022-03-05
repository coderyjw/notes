# 1. 缓存介绍
 - 缓存：存储将被用到的数据，让数据访问更快
# 2. fifo的memory函数

# 3. LRU算法

# 4. HTTP缓存

- Cache-Control
定义所有缓存都要遵守的行为
- 可缓存性
  - public：允许所有方缓存
  - private: 值允许浏览器缓存
  - no-cache: 每次必须先询问服务器资源是否更新
  - no-store：不使用缓存
- 缓存期限
  - max-age: 秒 （存储周期）
  - s-maxage：秒（共享缓存如代理，存储周期）


1. 强制缓存 cache-control no-chahe no-store max-age
2. 协商缓存 last-modify|e-tag 安全  