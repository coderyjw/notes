const webSocketServer = require("ws").Server;

var wss = new webSocketServer({ port: 9527 });

var clients = [];
wss.on("connection", function (client) {
  console.log("一个客户端连接到服务器");
  if (clients.indexOf(client) == -1) {
    clients.push(client);
    console.log("有" + clients.length + "个客户端在线");

    client.on("message", function (msg) {
      console.log("收到消息", msg.toString());
      for (let c of clients) {
        if (c !== client) {
          c.send(msg.toString());
        }
      }
    });
  }
});
console.log(webSocketServer);
