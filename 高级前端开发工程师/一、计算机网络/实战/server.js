const express = require("express");

const app = express();

app.get("/gretting", (req, res) => {
  res.end("hello");
});

/* method解析body */
app.post("/product", (req, res) => {
  const contentType = req.headers["content-type"];
  let responseText = ``;
  let body = null;
  req.on("data", (buffer) => {
    responseText += buffer.toString("utf-8");
  });

  req.on("end", () => {
    switch (contentType) {
      case "application/json":
        body = JSON.parse(responseText);
        console.log(body);
        res.set("content-type", "application/json");
        //Created
        res.status(201).end(JSON.stringify({ success: true }));
        break;
    }
  });
});

app.put("/product/:id", (req, res) => {
  console.log(req.params.id);
  // No Content
  res.sendStatus(204);
});

app.get("/301", (req, res) => {
  // Moved Permanently 永久转移
  res.redirect(301, "def");
});

app.post("/302", (req, res) => {
  // Found 资源被找到（以前是临时转移）不推荐用了 302拆成了303和307
  res.redirect(302, "def");
});

app.post("/303", (req, res) => {
  // See Other 可以使用GET方法在另一个URL找到资源
  res.redirect(303, "def");
});

app.post("/307", (req, res) => {
  // Temporary Redirect 临时重定向 （和303的区别是，307使用原请求的method重定向资源， 303使用GET方法重定向资源）
  res.redirect(307, "def");
});

app.get("/def", (req, res) => {
  res.end("def");
});

app.listen(3000, () => {
  console.log("3000服务已启动");
});
