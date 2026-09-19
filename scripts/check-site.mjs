import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve("dist");
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]),
);
const pages = new Map();
for (const url of urls) {
  const html = await readFile(
    resolve(root, `.${url.pathname}`, "index.html"),
    "utf8",
  );
  pages.set(url.pathname, html);
  assert.equal(
    (html.match(/<h1\b/g) ?? []).length,
    1,
    `${url.pathname}: exactly one h1`,
  );
  assert.equal(
    (html.match(/<title>/g) ?? []).length,
    1,
    `${url.pathname}: exactly one title`,
  );
  assert.equal(
    (html.match(/rel="canonical"/g) ?? []).length,
    1,
    `${url.pathname}: exactly one canonical`,
  );
  assert(
    html.includes(`href="${url.href}"`),
    `${url.pathname}: canonical matches sitemap`,
  );
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(
    new Set(ids).size,
    ids.length,
    `${url.pathname}: duplicate HTML id`,
  );
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(match[1]);
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
    if (!match[1].startsWith("/")) continue;
    assert(
      (await stat(resolve(root, `.${match[1]}`))).isFile(),
      `${url.pathname}: missing image ${match[1]}`,
    );
    assert(
      /\balt="[^"]*"/.test(match[0]),
      `${url.pathname}: missing image alt`,
    );
    assert(
      /\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]),
      `${url.pathname}: missing image dimensions`,
    );
  }
}
for (const [path, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = match[1].replace(/&amp;/g, "&");
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const target = new URL(href, `https://mustafa-proger.vercel.app${path}`);
    const targetPage = pages.get(target.pathname);
    assert(targetPage, `${path}: unknown internal route ${href}`);
    if (target.hash)
      assert(
        targetPage.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`),
        `${path}: missing anchor ${href}`,
      );
  }
}
const notFound = await readFile(resolve(root, "404.html"), "utf8");
assert(notFound.includes("noindex, follow"), "404 must not be indexed");
assert(
  !notFound.includes('rel="canonical"'),
  "404 must not canonicalize to an existing page",
);
console.log(
  `Site checks passed: ${pages.size} prerendered pages, metadata, images, anchors and 404.`,
);
