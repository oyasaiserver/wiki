import assert from "node:assert/strict";
import test from "node:test";
import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";
import { baseLinks } from "./base-links.mjs";
import { safeMarkdown } from "./safe-markdown.mjs";

test("base is applied to Markdown links, images and references only at build time", async () => {
  const markdown = [
    "[root](/) [page](/features/sociallikes/?q=1#看板)",
    "[prefixed](/wiki/start/) [similar](/wikipedia/) [relative](../start/)",
    "[anchor](#看板) [external](https://example.com/) [protocol](//example.com/)",
    "[mail](mailto:user@example.com) ![image](/favicon.svg)",
    "[reference][page] ![reference image][image]",
    "",
    "[page]: /start/",
    "[image]: /favicon.svg",
    "",
    "[unsafe](javascript:alert%281%29) <script>alert(1)</script>",
  ].join("\n");
  for (const base of ["/wiki", "/wiki/", "", undefined]) {
    const prefix = base?.replace(/\/$/, "") ?? "";
    const processor = await createSatteriMarkdownProcessor({
      mdastPlugins: [safeMarkdown, baseLinks(base)],
    });
    const { code } = await processor.render(markdown);
    for (const url of ["/", "/features/sociallikes/?q=1#%E7%9C%8B%E6%9D%BF", "/wikipedia/", "/start/"]) {
      assert.ok(code.includes(`href="${prefix}${url}"`), code);
    }
    assert.ok(code.includes(`src="${prefix}/favicon.svg"`), code);
    for (const url of ["/wiki/start/", "../start/", "#%E7%9C%8B%E6%9D%BF", "https://example.com/", "//example.com/", "mailto:user@example.com"]) {
      assert.ok(code.includes(`href="${url}"`), code);
    }
    assert.doesNotMatch(code, /javascript:|<script/);
  }
});
