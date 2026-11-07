// TaskBoard: a tiny task list (Arbiter demo deliverable). No dependencies.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC = path.join(__dirname, "public");
const FILES = { "/": ["index.html", "text/html; charset=utf-8"], "/tasks.js": ["tasks.js", "text/javascript"], "/app.js": ["app.js", "text/javascript"] };

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify({ ok: true }));
  }
  const file = req.method === "GET" ? FILES[url.pathname] : undefined;
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain" });
    return res.end("Not found");
  }
  res.writeHead(200, { "content-type": file[1], "cache-control": "no-store" });
  fs.createReadStream(path.join(PUBLIC, file[0])).pipe(res);
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, () => console.log(`TaskBoard on port ${port}`));
