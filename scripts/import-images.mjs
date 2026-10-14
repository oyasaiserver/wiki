import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const MANIFEST = path.join(ROOT, "scripts/images.json");
export const HOSTS = new Set(["image01.seesaawiki.jp", "image02.seesaawiki.jp", "cdn.discordapp.com", "media.discordapp.net"]);
const run = promisify(execFile);
export const MAX_BYTES = 10_000_000;
const URLS = /https?:\/\/[^\s<>"'`()\[\]{}]+/g;

export function extractUrls(text) {
  return text.match(URLS) ?? [];
}

function allowedUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || !HOSTS.has(url.hostname) ||
      url.port || url.username || url.password) {
    throw new Error(`許可対象外の URL: ${value}`);
  }
  return url;
}

export function imageFormat(bytes) {
  if (bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))) return "png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  if (["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii"))) return "gif";
  if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP") return "webp";
  throw new Error("PNG/JPEG/GIF/WebP の先頭バイトではありません");
}

export async function convertImage(bytes, format, command = run) {
  if (!["png", "jpeg"].includes(format)) return { bytes, format };
  const directory = await mkdtemp(path.join(tmpdir(), "wiki-image-"));
  try {
    const input = path.join(directory, `input.${format}`);
    const output = path.join(directory, "output.webp");
    await writeFile(input, bytes);
    await command("cwebp", ["-q", "85", "-m", "6", input, "-o", output]);
    const converted = await readFile(output);
    if (imageFormat(converted) !== "webp") throw new Error("変換結果が WebP ではありません");
    return converted.length <= bytes.length ? { bytes: converted, format: "webp" } : { bytes, format };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

export async function fetchImage(value, request = fetch) {
  let url = allowedUrl(value);
  const signal = AbortSignal.timeout(30_000);
  for (let redirects = 0; redirects <= 5; redirects++) {
    const response = await request(url.href, { redirect: "manual", signal });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      await response.body?.cancel();
      const location = response.headers.get("location");
      if (!location) throw new Error("転送先がありません");
      url = allowedUrl(new URL(location, url).href);
      continue;
    }
    if (!response.ok || Number(response.headers.get("content-length")) > MAX_BYTES) {
      await response.body?.cancel();
      throw new Error(response.ok ? "10 MB 超過" : `HTTP ${response.status}`);
    }
    const chunks = [];
    let length = 0;
    let format;
    for await (const chunk of response.body) {
      length += chunk.length;
      if (length > MAX_BYTES) throw new Error("10 MB 超過");
      chunks.push(Buffer.from(chunk));
      if (!format && length >= 12) format = imageFormat(Buffer.concat(chunks, length));
    }
    const bytes = Buffer.concat(chunks, length);
    return { bytes, format: format ?? imageFormat(bytes) };
  }
  throw new Error("転送回数が多すぎます");
}

export function imageName(value, format, used) {
  const url = allowedUrl(value);
  const original = path.posix.basename(url.pathname);
  const extension = path.posix.extname(original);
  const suffix = format === "jpeg" ? (/^\.jpe?g$/i.test(extension) ? extension : ".jpg") : `.${format}`;
  const clean = (name) => name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const stem = clean(original.slice(0, original.length - extension.length)) || "image";
  let name = stem + suffix;
  if (used.has(name.toLowerCase())) {
    name = clean(url.pathname.split("/").slice(1, -1).join("-")) + "-" + name;
  }
  if (used.has(name.toLowerCase())) {
    name = name.slice(0, -suffix.length) + "-" + createHash("sha256").update(url.origin + url.pathname).digest("hex") + suffix;
  }
  if (used.has(name.toLowerCase())) throw new Error(`ファイル名が衝突: ${value}`);
  used.add(name.toLowerCase());
  return name;
}

async function sources(root = ROOT) {
  const files = new Map();
  for (const directory of ["src/content/docs", "archive"]) {
    const dir = path.join(root, directory);
    let entries;
    try {
      entries = await readdir(dir, { recursive: true, withFileTypes: true });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      continue;
    }
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        const file = path.join(entry.parentPath, entry.name);
        files.set(file, await readFile(file, "utf8"));
      }
    }
  }
  return files;
}

export async function loadUrlMap(mapPath = process.env.IMAGE_URL_MAP) {
  if (!mapPath) return new Map();
  const data = JSON.parse(await readFile(mapPath, "utf8"));
  return new Map((data.refreshed_urls ?? []).map(({ original, refreshed }) => [original, refreshed]));
}

export async function main(options = {}) {
  const root = options.root ?? ROOT;
  const manifestPath = options.manifestPath ?? path.join(root, "scripts/images.json");
  const urlMap = options.urlMap ?? await loadUrlMap(options.mapPath ?? process.env.IMAGE_URL_MAP);
  const request = options.request ?? fetch;
  const command = options.command ?? run;
  const sleepFn = options.sleep ?? sleep;
  const files = await sources(root);
  let report;
  try {
    report = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    report = { images: {}, failures: [] };
  }
  const urls = [...files.values()].flatMap(extractUrls);
  const targets = [...new Set(urls.filter((url) => HOSTS.has(new URL(url).hostname)))].sort();
  const used = new Map();
  for (const directory of ["seesaa", "discord"]) {
    const output = path.join(root, "public/images", directory);
    await mkdir(output, { recursive: true });
    used.set(directory, new Set((await readdir(output)).map((name) => name.toLowerCase())));
  }
  const replacementsByPath = new Map();
  const originals = [];
  // 再実行では保存済み画像を検査し、成功した取得を繰り返さない。
  for (const [url, result] of Object.entries(report.images)) {
    allowedUrl(url);
    if (!/^\/images\/(seesaa|discord)\/[a-zA-Z0-9._-]+$/.test(result.path)) throw new Error("保存パスが不正です");
    const bytes = await readFile(path.join(root, "public", result.path));
    if (bytes.length > MAX_BYTES || bytes.length !== result.bytes || imageFormat(bytes) !== result.format) {
      throw new Error(`保存済み画像が対応表と一致しません: ${result.path}`);
    }
    const converted = await convertImage(bytes, result.format, command);
    result.originalBytes ??= bytes.length;
    if (converted.format !== result.format) {
      const directory = result.path.split("/")[2];
      const savedPath = `/images/${directory}/${imageName(url, converted.format, used.get(directory))}`;
      await writeFile(path.join(root, "public", savedPath), converted.bytes, { flag: "wx" });
      replacementsByPath.set(result.path, savedPath);
      originals.push(path.join(root, "public", result.path));
      Object.assign(result, { path: savedPath, bytes: converted.bytes.length, format: converted.format });
    }
  }
  report.failures = [];
  const saveReport = async () => {
    await mkdir(path.dirname(manifestPath), { recursive: true });
    return writeFile(manifestPath, JSON.stringify(report, null, 2) + "\n");
  };
  let replacements = 0;
  const replaceReferences = async () => {
    for (const [file, text] of files) {
      const updated = text.replace(/\/images\/(?:seesaa|discord)\/[a-zA-Z0-9._-]+/g, (savedPath) => {
        if (!replacementsByPath.has(savedPath)) return savedPath;
        replacements++;
        return replacementsByPath.get(savedPath);
      }).replace(URLS, (url) => {
        if (!report.images[url]) return url;
        replacements++;
        return report.images[url].path;
      });
      if (updated !== text) {
        await writeFile(file, updated);
        files.set(file, updated);
      }
    }
  };
  await replaceReferences();
  await saveReport();
  for (const original of originals) await unlink(original);
  for (const [index, url] of targets.entries()) {
    if (report.images[url]) continue;
    let result;
    let failure;
    // 初回の取得と、最大3回の再試行。転送先も許可ホストに限定する。
    const fetchUrl = urlMap.get(url) ?? url;
    for (let attempt = 0; attempt < 4; attempt++) {
      if (sleepFn) await sleepFn(300);
      try {
        const fetched = await fetchImage(fetchUrl, request);
        result = { ...await convertImage(fetched.bytes, fetched.format, command), originalBytes: fetched.bytes.length };
        break;
      } catch (error) {
        failure = error.message;
      }
    }
    if (result) {
      const directory = new URL(url).hostname.endsWith("seesaawiki.jp") ? "seesaa" : "discord";
      const name = imageName(url, result.format, used.get(directory));
      await writeFile(path.join(root, "public/images", directory, name), result.bytes, { flag: "wx" });
      report.images[url] = {
        path: `/images/${directory}/${name}`, bytes: result.bytes.length, format: result.format,
        originalBytes: result.originalBytes,
      };
    } else {
      report.failures.push({ url, error: failure });
    }
    await saveReport();
    console.log(`${index + 1}/${targets.length} ${result ? "保存" : `失敗: ${failure}`} ${url}`);
  }
  await replaceReferences();
  await saveReport();
  const summary = { saved: Object.keys(report.images).length, failures: report.failures, replacements };
  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
