import assert from "node:assert/strict";
import test from "node:test";
import { checkLinks, inspectHtml } from "./check-links.mjs";

test("base-aware checks resolve local pages, images and anchors and reject missing base", () => {
  for (const base of ["/wiki", ""]) {
    const build = {
      files: new Set(["/index.html", "/start/index.html", "/favicon.svg"]),
      pages: new Map([
        ["/index.html", inspectHtml(
          `<a href="${base}/start/?q=1#%E7%9C%8B%E6%9D%BF">開始</a>` +
          `<a href="https://oyasaiserver.github.io${base}/start/">同一サイト</a>` +
          '<a href="https://example.com/">外部</a>' +
          `<img src="${base}/favicon.svg">`,
        )],
        ["/start/index.html", inspectHtml('<h2 id="看板">看板</h2><a href="../">ホーム</a>')],
      ]),
    };
    const options = { base, site: "https://oyasaiserver.github.io" };
    assert.deepEqual(checkLinks(build, options), {
      pages: 2, internal: 4, external: 1, anchors: 1, errors: [],
    });
    build.pages.set("/index.html", inspectHtml(
      `<a href="${base}/missing/">ページなし</a>` +
      `<a href="${base}/start/#missing">アンカーなし</a>` +
      `<img src="${base}/missing.svg">` +
      (base ? '<a href="/start/">base なし</a>' : ""),
    ));
    assert.equal(checkLinks(build, options).errors.length, base ? 4 : 3);
  }
});
