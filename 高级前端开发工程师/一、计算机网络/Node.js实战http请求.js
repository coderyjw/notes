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
