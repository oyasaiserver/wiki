import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { extractUrls, HOSTS, imageFormat, MAX_BYTES } from "./import-images.mjs";
import { loadBuild } from "./check-links.mjs";
import config from "../astro.config.mjs";

const { images, failures } = JSON.parse(await readFile("scripts/images.json", "utf8"));
const remaining = new Set();
const references = new Map();
for (const directory of ["src/content/docs", "archive"]) {
  for (const entry of await readdir(directory, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const text = await readFile(`${entry.parentPath}/${entry.name}`, "utf8");
    for (const url of extractUrls(text)) {
      if (HOSTS.has(new URL(url).hostname)) remaining.add(url);
    }
    for (const match of text.matchAll(/\/images\/(?:seesaa|discord)\/[a-zA-Z0-9._-]+/g)) {
      references.set(match[0], (references.get(match[0]) ?? 0) + 1);
    }
  }
}
assert.deepEqual(remaining, new Set(failures.map(({ url }) => url)), "残った外部 URL と失敗一覧が不一致");
assert.deepEqual(new Set(references.keys()), new Set(Object.values(images).map(({ path }) => path)), "原稿と対応表が不一致");
for (const { path, bytes, format } of Object.values(images)) {
  const original = await readFile(`public${path}`);
  assert.equal(original.length, bytes, path);
  assert.ok(bytes <= MAX_BYTES, path);
  assert.equal(imageFormat(original), format, path);
  assert.deepEqual(await readFile(`dist${path}`), original, `ビルドへの画像コピー: ${path}`);
}
const base = (config.base ?? "").replace(/\/$/, "");
let builtReferences = 0;
for (const [page, { links }] of (await loadBuild()).pages) {
  for (const href of links) {
    if (!/\/images\/(seesaa|discord)\//.test(href)) continue;
    assert.ok(href.startsWith(`${base}/images/`), `${page}: base がありません: ${href}`);
    assert.ok(references.has(href.slice(base.length)), `${page}: 対応表にありません: ${href}`);
    builtReferences++;
  }
}
assert.ok(builtReferences > 0, "生成 HTML に画像参照がありません");
console.log(JSON.stringify({
  images: Object.keys(images).length,
  sourceReferences: [...references.values()].reduce((sum, count) => sum + count, 0),
  builtReferences, remainingUrls: remaining.size,
}, null, 2));
