import assert from "node:assert/strict";
import test from "node:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { convertImage, extractUrls, fetchImage, imageFormat, imageName, main, MAX_BYTES } from "./import-images.mjs";

const url = "https://image01.seesaawiki.jp/o/i/oyasai/example.png";
const png = Buffer.from("89504e470d0a1a0a00000000", "hex");

test("extracts Markdown, reference, HTML and frontmatter URLs without changing their spelling", () => {
  assert.deepEqual(extractUrls(`image: '${url}'\n![a](${url}) [a](${url})\n[a]: ${url}\n<img src="${url}"><a href='${url}'>`), Array(6).fill(url));
});

test("signatures select the format, including a mismatched file extension", async () => {
  for (const [bytes, format] of [
    [png, "png"], [Buffer.from("ffd8ff00", "hex"), "jpeg"],
    [Buffer.from("GIF87a"), "gif"], [Buffer.from("GIF89a"), "gif"],
    [Buffer.from("RIFF0000WEBP"), "webp"],
  ]) assert.equal(imageFormat(bytes), format);
  for (const bytes of [Buffer.alloc(0), Buffer.from("<html>error</html>"), Buffer.from("RIFF0000WAVE")]) {
    assert.throws(() => imageFormat(bytes));
  }
  assert.deepEqual(await fetchImage(url, async () => new Response(png)), { bytes: png, format: "png" });
  assert.equal(imageName(url, "jpeg", new Set()), "example.jpg");
});

test("filename collisions use the source path and then a URL hash", () => {
  const used = new Set();
  const names = [url, url.replace("image01", "image02"), url + "?version=2"]
    .map((value) => imageName(value, "png", used));
  assert.equal(names[0], "example.png");
  assert.equal(names[1], "o-i-oyasai-example.png");
  assert.match(names[2], /^o-i-oyasai-example-[a-f0-9]+\.png$/);
  assert.equal(new Set(names).size, 3);
});

test("rejects non-images, HTTP failures, and both declared and streamed oversize bodies", async () => {
  for (const response of [
    () => new Response("<html>error</html>"),
    () => new Response("missing", { status: 404 }),
    () => new Response(png, { headers: { "content-length": MAX_BYTES + 1 } }),
    () => new Response(Buffer.concat([png, Buffer.alloc(MAX_BYTES)])),
  ]) await assert.rejects(fetchImage(url, async () => response()));
});

test("never requests other hosts, including a redirect to an unauthorized host", async () => {
  let calls = 0;
  const redirect = async () => {
    calls++;
    return new Response(null, { status: 302, headers: { location: "https://static.seesaawiki.jp/image.png" } });
  };
  await assert.rejects(fetchImage(url, redirect), /許可対象外/);
  assert.equal(calls, 1);
  for (const value of ["https://i.imgur.com/a.png", url.replace("https:", "http:"), url.replace(".jp/", ".jp.evil.invalid/")]) {
    await assert.rejects(fetchImage(value, redirect), /許可対象外/);
  }
  assert.equal(calls, 1);
  const result = await fetchImage(url, async (value) => value === url
    ? new Response(null, { status: 302, headers: { location: url.replace("image01", "image02") } })
    : new Response(png));
  assert.equal(result.format, "png");
});

test("Discord downloads preserve signed queries but filenames never include them", async () => {
  for (const host of ["cdn.discordapp.com", "media.discordapp.net"]) {
    const value = `https://${host}/attachments/123/456/image.png?ex=expiry&is=time&hm=signature`;
    await fetchImage(value, async (requested) => {
      assert.equal(requested, value);
      return new Response(png);
    });
    assert.equal(imageName(value, "webp", new Set()), "image.webp");
    const used = new Set(["image.webp", "attachments-123-456-image.webp"]);
    assert.equal(imageName(value, "webp", new Set(used)), imageName(value.replace("signature", "renewed"), "webp", new Set(used)));
  }
});

test("converts PNG/JPEG with fixed quality, keeps larger results, and leaves GIF/WebP unchanged", async () => {
  const webp = Buffer.from("RIFF0000WEBP");
  const original = Buffer.concat([png, Buffer.alloc(100)]);
  const command = async (executable, args) => {
    assert.equal(executable, "cwebp");
    assert.deepEqual(args.slice(0, 4), ["-q", "85", "-m", "6"]);
    assert.deepEqual(await readFile(args[4]), original);
    await writeFile(args[6], webp);
  };
  for (const format of ["png", "jpeg"]) {
    assert.deepEqual(await convertImage(original, format, command), { bytes: webp, format: "webp" });
  }
  assert.deepEqual(await convertImage(png, "png", async (_, args) => {
    await writeFile(args[6], Buffer.concat([webp, Buffer.alloc(100)]));
  }), { bytes: png, format: "png" });
  for (const format of ["gif", "webp"]) {
    assert.deepEqual(await convertImage(original, format, () => assert.fail("must not convert")), { bytes: original, format });
  }
  await assert.rejects(convertImage(png, "png", async (_, args) => {
    await writeFile(args[6], "invalid");
  }));
  await assert.rejects(convertImage(png, "png", async () => { throw new Error("encoder failed"); }), /encoder failed/);
});

test("IMAGE_URL_MAP fetches refreshed URLs but uses original URL for paths, filenames, and manifest", async () => {
  const tmp = await mkdtemp(path.join(tmpdir(), "wiki-image-map-test-"));
  try {
    const original = "https://cdn.discordapp.com/attachments/123/456/test_image.png";
    const refreshed = "https://cdn.discordapp.com/attachments/123/456/test_image.png?ex=signed&is=time&hm=sig";
    const docDir = path.join(tmp, "src/content/docs");
    await mkdir(docDir, { recursive: true });
    await writeFile(path.join(docDir, "sample.md"), `![sample](${original})\n`);

    const mapPath = path.join(tmp, "discord-map.json");
    await writeFile(mapPath, JSON.stringify({
      refreshed_urls: [{ original, refreshed }],
    }));

    let requestedUrl;
    const request = async (url) => {
      requestedUrl = url;
      return new Response(png);
    };
    const webp = Buffer.from("RIFF0000WEBP");
    const command = async (_bin, args) => {
      await writeFile(args[6], webp);
    };

    const result = await main({
      root: tmp,
      mapPath,
      request,
      command,
      sleep: () => {},
    });

    assert.equal(requestedUrl, refreshed);
    assert.equal(result.failures.length, 0);

    const manifestPath = path.join(tmp, "scripts/images.json");
    const manifestText = await readFile(manifestPath, "utf8");
    assert.ok(!manifestText.includes("ex="), "JSON に ex= が含まれていないこと");
    assert.ok(!manifestText.includes("is="), "JSON に is= が含まれていないこと");
    assert.ok(!manifestText.includes("hm="), "JSON に hm= が含まれていないこと");
    assert.ok(!manifestText.includes("signed"), "JSON に refreshed が含まれていないこと");

    const manifest = JSON.parse(manifestText);
    assert.ok(manifest.images[original], "マニフェストのキーは original URL であること");
    assert.equal(manifest.images[original].path, "/images/discord/test_image.webp");

    const savedFile = path.join(tmp, "public/images/discord/test_image.webp");
    assert.ok(await readFile(savedFile), "保存された画像ファイルが存在すること");

    const docText = await readFile(path.join(docDir, "sample.md"), "utf8");
    assert.equal(docText, "![sample](/images/discord/test_image.webp)\n");
    assert.ok(!docText.includes("ex="));
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
});

