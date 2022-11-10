## 1. DNS

### 1.1 DNS是什么？
`DNS`（Domain Names System），**域名系统**，是互联网一项服务，是**进行域名和与之相对应的 IP 地址进行转换的服务器**

简单来讲，`DNS` 相当于一个翻译官，负责将域名翻译成 `ip` 地址

IP 地址：一长串能够唯一地标记网络上的计算机的数字
域名：是由一串用点分隔的名字组成的 Internet 上某一台计算机或计算机组的名称，用于在数据传输时对计算机的定位标识

![Snipaste_2022-11-10_00-23-32.png](https://yejiwei.com/static/img/176089135d01054d83ada8cba01fe509.Snipaste_2022-11-10_00-23-32.png)

<!-- more -->

### 1.2 域名
域名是一个具有层次的结构，从上到下一次为根域名、顶级域名、二级域名、三级域名...

![Snipaste_2022-11-10_00-40-26.png](https://yejiwei.com/static/img/a59a5c3dfb0bfe41dd141bb351482156.Snipaste_2022-11-10_00-40-26.png)
例如 `www.baidu.com`，`www` 为三级域名、`baidu`为二级域名、`com`为顶级域名 ，系统为用户做了兼容，域名末尾的根域名.一般不需要输入

在域名的每一层都会有一个域名服务器，如下图：

![Snipaste_2022-11-10_00-40-35.png](https://yejiwei.com/static/img/96f95d0b6e03ccc06c05f9a1121d6fdd.Snipaste_2022-11-10_00-40-35.png)

### 1.3 查询方式
`DNS` 查询方式有两种
- 递归查询：如果 `A` 请求 `B` ，那么 `B` 作为请求的接收者一定要给 `A` 想要的答案


![Snipaste_2022-11-10_00-43-32.png](https://yejiwei.com/static/img/6ed4c81505c2b4939ec6a76e5905e0ad.Snipaste_2022-11-10_00-43-32.png)
- 迭代查询：如果接收者 `B` 没有请求者 `A` 所需要的准确内容，接收者 `B` 将告诉请求者 `A`，如何去获得这个内容，但是自己并不去发出请求

![Snipaste_2022-11-10_00-43-40.png](https://yejiwei.com/static/img/ef961216f35a857eba4c1308a8a39be8.Snipaste_2022-11-10_00-43-40.png)

### 1.4 域名缓存
在域名服务器解析的时候，使用缓存保存域名和 `IP` 地址的映射

计算机中 `DNS` 的记录也分成了两种缓存方式：

- 浏览器缓存：浏览器在获取网站域名的实际 `IP` 地址后会对其进行缓存，减少网络请求的损耗
- 操作系统缓存：操作系统的缓存其实是用户自己配置的 hosts 文件

### 1.5 查询过程
解析域名的过程如下：

- 首先搜索浏览器的 `DNS` 缓存，缓存中维护一张域名与 `IP` 地址的对应表

- 若没有命中，则继续搜索操作系统的 `DNS` 缓存

- 若仍然没有命中，则操作系统将域名发送至本地域名服务器，本地域名服务器采用递归查询自己的 `DNS` 缓存，查找成功则返回结果

- 若本地域名服务器的 `DNS` 缓存没有命中，则本地域名服务器向上级域名服务器进行迭代查询

    - 首先本地域名服务器向根域名服务器发起请求，根域名服务器返回顶级域名服务器的地址给本地服务器
    - 本地域名服务器拿到这个顶级域名服务器的地址后，就向其发起请求，获取权限域名服务器的地址
    - 本地域名服务器根据权限域名服务器的地址向其发起请求，最终得到该域名对应的 `IP` 地址
- 本地域名服务器将得到的 `IP` 地址返回给操作系统，同时自己将 `IP` 地址缓存起来

- 操作系统将 `IP` 地址返回给浏览器，同时自己也将 `IP` 地址缓存起

- 至此，浏览器就得到了域名对应的 `IP` 地址，并将 `IP` 地址缓存起

流程如下图所示：

![image.png](https://yejiwei.com/static/img/b2ee0c26d5548ceb3e0284527b221217.image.png)
### 1.6 DNS记录

`DNS` 记录是存储在 `DNS` 数据库中的特定资源记录，允许你配置和控制有关你的域名的其他信息。例如，你可以设置你的 `DNS` 记录，告诉世界你的域名将使用什么类型的邮件服务器（例如，微软Exchange），或者当有人访问你的网站时，应该返回哪个 `IP` 地址。

DNS记录可以理解成一个键值对：
- **键：域名；**
- **值：与域名关联的值；**

事实上，除了 IP 地址，DNS记录值还可以是 IPv6 地址、别名、文本等等。有超过30种类型的DNS记录.常见的DNS记录类型有以下：
- **A记录**：定义主机的IP地址
```text
www.example.com. IN A 139.18.28.5;
域名映射IP
IN 代表 Internet互联网
```
- **AAAA记录**：定义主机的IPv6地址
```text
123124.s2txip6.com. 103 IN AAAA 240e:940:401:1:1a::
```
- **CNAME记录**：定义域名的别名
```text
www.example.com IN CNAME example.com.
a.example.com IN CNAME b.example.com.
```
- **MX记录**：定义邮件服务器
```text
;happy.example.com作为邮件服务器
IN MX happy.example.com.

;A记录描述邮件服务器IP
happy.example.com. IN A 123.123.123.123;
```
- **NS记录**：定义提供dns信息的服务器
```text
;定义为zhihu.com提供dns信息的服务器
zhihu.com. 52908 IN NS n24.dnsv5.com.
```
- **SOA记录**：定义多个ns服务器中哪个是主服务器
```text
; ns3,dnsv5.com. 是主服务器
IN SOA ns3.dnsv5.com. enterprise3dnsadmin.dnspod.com. 15947187885 3600180 1209600 180
```
- **TXT记录**：提供文本信息
```text
;zhihu.com提供的文本信息
zhihu.com. 600 IN TXT "m5g7qjk31l5d1hkq6m3zvcf6lg2f0h16"
```

### 1.7 DNS查询工具

- dig(DNS look utility) 查询dns的小工具

![image.png](https://yejiwei.com/static/img/81068c426012ffbc009e23ef749d312a.image.png)
- nslookup 交互式查询域名服务工具


![image.png](https://yejiwei.com/static/img/64ef96c4c86bf7b450f76f9c93a06ca5.image.png)
- host(DNS look utility) 查询dns的小工具

![image.png](https://yejiwei.com/static/img/af503812d99c0dca24fb45f139c48dd4.image.png)

### 1.8 host修改

1. 编辑hosts文件  vim /etc/hosts
2. 添加 3.3.3.3 www.baidu.com
3. ping www.baidu.com

**结果**

![image.png](https://yejiwei.com/static/img/d0e9c02b4c0335b92c17e9bb4923e3b8.image.png)

## 2. CDN
### 2.1 CDN是什么？
CDN (全称 Content Delivery Network)，即内容分发网络

构建在现有网络基础之上的**智能虚拟网络**，依靠部署在各地的边缘服务器，通过中心平台的**负载均衡**、**内容分发**、**调度**等功能模块，使用户**就近获取所需内容**，**降低网络拥塞**，提高用户访问响应速度和命中率。CDN 的关键技术主要有**内容存储和分发技术。**

简单来讲，`CDN` 就是一个基于地理位置的分布式代理服务器/数据中心。它会根据用户位置分配最近的资源。

于是，用户在上网的时候不用直接访问源站，而是访问离他“最近的”一个 `CDN` 节点，术语叫边缘节点，其实就是缓存了源站内容的代理服务器。如下图：
![image.png](https://yejiwei.com/static/img/f9b6798a80b340600010eb721e4f8e1c.image.png)

### 2.2 CDN实现原理

当用户输入一个网址，浏览器会检查这个网址上所有资源的请求。以一个 `js` 文件为例

1. 它首先会做 `DNS` 查询，通常在没有应用 `CDN` 时，会返回一个 `ip` 地址，浏览器直接根据 `IP` 地址请求 `js` 资源；应用 `CDN` 后，`DNS` 返回的不再是 `IP` 地址，而是一个CNAME(Canonical Name ) 别名记录
2. 浏览器对别名做 `CDN` 查询，返回 `CDN` 智能 `DNS` 服务的 `ip` 地址
3. 查询 `CDN` 智能调度 `DNS` ，它会根据以下情况，返回合适的边缘节点`ip` 给用户
    - 地理位置，找相对最近的边缘节点
    - 运营商网络，找相同网络的边缘节点
    - 边缘节点的负载情况，找负载较轻的节点
    - 节点的“健康状况”、服务能力、带宽、响应时间等
4. 根据节点 `ip` 请求 `js` 文件，如果请求的资源

整体流程图如下：

![image.png](https://yejiwei.com/static/img/707d028ab043dfa29818f39dc0a2dd75.image.png)

### 2.3 缓存代理

缓存系统是 `CDN` 的另一个关键组成部分，缓存系统会有选择地缓存那些最常用的那些资源。

其中有两个衡量 `CDN` 服务质量的指标：

- 命中率：用户访问的资源恰好在缓存系统里，可以直接返回给用户，命中次数与所有访问次数之比
- 回源率：缓存里没有，必须用代理的方式回源站取，回源次数与所有访问次数之比

缓存系统也可以划分出层次，分成一级缓存节点和二级缓存节点。一级缓存配置高一些，直连源站，二级缓存配置低一些，直连用户。

回源的时候二级缓存只找一级缓存，一级缓存没有才回源站，可以有效地减少真正的回源。

现在的商业 `CDN` 命中率都在 90% 以上，相当于把源站的服务能力放大了 10 倍以上。

## 3. 小结
- DNS就是个域名系统，负责将域名翻译成 ip 地址；CDN是一个基于地理位置的分布式代理服务器，会根据用户位置分配最近的资源，就是为了提高资源的访问速度。
- 两者都有缓存设计，DNS（浏览器缓存、操作系统缓存）、CDN（一节缓存、二级缓存）

**参考文献**
- [面试官：DNS协议 是什么？说说DNS 完整的查询过程?](https://vue3js.cn/interview/http/DNS.html)
- [根域名的知识](https://www.ruanyifeng.com/blog/2018/05/root-domain.html)
- [DNS记录类型](https://fasionchan.com/network/dns/record-types/)
- [面试官：如何理解CDN？说说实现原理？](https://vue3js.cn/interview/http/CDN.html)
