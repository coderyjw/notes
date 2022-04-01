# 1. BroadcastChannel

用于**同源**不同页面之间完成通信的功能

用法

```js
// a.html
var bc = new BroadcastChannel("test");
bc.postMessage("hello");

// b.html
var bc = new BroadCastChannel("test");
bc.onmessage = function (ev) {
  console.log(ev);
};
```

# 2. localStorage
localStorage是浏览器多个标签共用的存储空间，所以可以用来实现多标签之间的通信

# 3. SharedWorker
SharedWorker可以被多个window共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)

# 4. WebSocket
全双工（full-duplex）通信自然可以实现多个标签之间的通信

# 5. SetInterval + cookie
- 在页面A设置一个使用setInterval定时器不断刷新，检查Cookies的值是否发生变化，如果变化就进行刷新的操作。
- 由于Cookies是在同域可读的，所以在页面B审核的时候改变Cookies的值，页面A自然是可以拿到的。
这样做确实可以实现我想要的功能，但是这样的方法相当浪费资源。虽然在这个性能过盛的时代，浪费不浪费也感觉不出来，但是这种实现方案，确实不够优雅。

# 6. postMessage


