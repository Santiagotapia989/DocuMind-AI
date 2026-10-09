// Servidor local sin dependencias: sirve los estáticos y enruta la función.
// Uso: node dev-server.js  →  http://localhost:8888
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { handler } from "./netlify/functions/chat.js";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 8888;
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (url.pathname.startsWith("/.netlify/functions/") || url.pathname === "/api/chat") {
      let body = "";
      for await (const chunk of req) body += chunk;
      const result = await handler({ httpMethod: req.method, body, headers: req.headers });
      res.writeHead(result.statusCode, result.headers);
      return res.end(result.body);
    }

    const path = normalize(join(ROOT, url.pathname === "/" ? "index.html" : url.pathname));
    if (!path.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end();
    }
    try {
      const data = await readFile(path);
      res.writeHead(200, { "Content-Type": MIME[extname(path)] || "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(PORT, () => console.log(`DocuMind local → http://localhost:${PORT}`));
