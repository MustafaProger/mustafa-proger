import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const output = resolve(root, "dist");
const template = await readFile(resolve(output, "index.html"), "utf8");
const sitemap = await readFile(resolve(root, "public/sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]),
);
const routes = sitemapUrls.map((url) => url.pathname);
assert(routes.length > 0, "The sitemap must contain at least the home page.");
assert.equal(
  new Set(routes).size,
  routes.length,
  "Sitemap routes must be unique.",
);
assert.equal(
  template.split('<div id="root"></div>').length,
  2,
  "The Vite template must contain one empty React root.",
);
assert.equal(
  template.split("</head>").length,
  2,
  "The Vite template must contain one document head.",
);
const pageTitles = new Set();

const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");

  for (const path of [...routes, "/404/"]) {
    let markup = renderToString(
      createElement(StaticRouter, { location: path }, createElement(App)),
    );
    const metadata = [];

    // React 19 puts hoisted document metadata and resource preloads first when
    // rendering a fragment. Move that prefix into the Vite-generated <head>.
    const headTag =
      /^(?:<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/>|<link\b[^>]*\/>)/;
    let match;
    while ((match = markup.match(headTag))) {
      metadata.push(match[0]);
      markup = markup.slice(match[0].length);
    }

    assert.equal(
      metadata.filter((tag) => tag.startsWith("<title")).length,
      1,
      `${path}: one page title is required`,
    );
    assert.equal(
      [...markup.matchAll(/<h1\b/g)].length,
      1,
      `${path}: exactly one page heading must be rendered at build time`,
    );
    if (path !== "/404/") {
      const canonical = metadata
        .find((tag) => tag.includes('rel="canonical"'))
        ?.match(/href="([^"]+)"/)?.[1];
      assert.equal(
        canonical,
        sitemapUrls.find((url) => url.pathname === path)?.href,
        `${path}: canonical must match the sitemap`,
      );
    } else {
      assert(
        metadata.some((tag) => tag.includes("noindex")),
        "The 404 page must be noindex",
      );
    }

    const html = template
      .replace("</head>", `    ${metadata.join("\n    ")}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    const head = html.split("</head>")[0];
    assert.equal(
      [...head.matchAll(/<title\b/g)].length,
      1,
      `${path}: duplicate page title`,
    );
    assert.equal(
      [...head.matchAll(/<meta\b[^>]*name="description"/g)].length,
      1,
      `${path}: exactly one description is required`,
    );
    assert.equal(
      [...head.matchAll(/<link\b[^>]*rel="canonical"/g)].length,
      path === "/404/" ? 0 : 1,
      `${path}: unexpected canonical count`,
    );
    const title = head.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    assert(!pageTitles.has(title), `${path}: page titles must be unique`);
    pageTitles.add(title);
    const destination =
      path === "/404/"
        ? resolve(output, "404.html")
        : resolve(output, `.${path}`, "index.html");
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html, "utf8");
    console.log(`Prerendered ${path}`);
  }
} finally {
  await server.close();
}
