import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist", import.meta.url));
const port = Number(process.env.PORT || process.argv[2] || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("Specify a valid preview port.");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

async function info(path) {
  try {
    return await stat(path);
  } catch {
    return null;
  }
}

if (!(await info(resolve(root, "404.html")))) {
  throw new Error(
    "Static pages are missing. Run npm run build before previewing.",
  );
}

createServer(async (request, response) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  try {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    const path = decodeURIComponent(url.pathname);
    let file = resolve(root, `.${path}`);
    if (
      path.includes("\0") ||
      (file !== root && !file.startsWith(`${root}${sep}`))
    ) {
      response.writeHead(400).end("Invalid path");
      return;
    }

    let details = await info(file);
    if (details?.isDirectory()) {
      if (!path.endsWith("/")) {
        response
          .writeHead(308, { Location: `${url.pathname}/${url.search}` })
          .end();
        return;
      }
      file = resolve(file, "index.html");
      details = await info(file);
    }

    let status = 200;
    if (!details?.isFile()) {
      status = 404;
      file = resolve(root, "404.html");
      details = await stat(file);
    }

    response.writeHead(status, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Content-Length": details.size,
      "Cache-Control": "no-store",
    });
    if (request.method === "HEAD") response.end();
    else
      createReadStream(file)
        .on("error", () => response.destroy())
        .pipe(response);
  } catch {
    response.writeHead(400).end("Invalid request");
  }
})
  .on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Static preview: http://127.0.0.1:${port}`),
  );
