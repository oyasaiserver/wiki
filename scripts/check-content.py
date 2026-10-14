"""新 Wiki の原稿を検査する。完成サイトのアンカー・検索検査は platform 側で行う。"""
import pathlib
import re
import subprocess
import sys
import urllib.parse

import yaml

ROOT = pathlib.Path("src/content/docs")


def target_path(source, target):
    url = urllib.parse.urlsplit(target)
    if url.scheme or url.netloc or not url.path:
        return None
    route = urllib.parse.unquote(url.path)
    if route.startswith("/images/"):
        image_root = pathlib.Path("public/images").resolve()
        destination = (pathlib.Path("public") / route.lstrip("/")).resolve()
        if not destination.is_relative_to(image_root):
            raise ValueError(f"画像の範囲外: {target}")
        return destination
    if route.startswith("/"):
        destination = ROOT / route.lstrip("/")
    else:
        # 原稿の URL は index.md がディレクトリ、他の .md が末尾 / のページになる。
        base = source.parent if source.name == "index.md" else source.with_suffix("")
        destination = base / route
    destination = destination.resolve()
    if not destination.is_relative_to(ROOT.resolve()):
        raise ValueError(f"原稿の範囲外: {target}")
    if destination.suffix == ".md":
        return destination
    page = destination.with_suffix(".md")
    return page if page.is_file() else destination / "index.md"


def check():
    entries = subprocess.check_output(["git", "ls-files", "-s", "-z"], text=True).split("\0")
    for entry in filter(None, entries):
        if entry.startswith(("120000 ", "160000 ")):
            raise ValueError("リンク・submodule は使用できません: " + entry.split("\t", 1)[1])
    files = sorted(ROOT.rglob("*"))
    if not (ROOT / "index.md").is_file() or not (ROOT / "404.md").is_file():
        raise ValueError("index.md と 404.md が必要です")
    count = 0
    for source in files:
        if source.is_symlink() or source.suffix.lower() == ".mdx":
            raise ValueError(f"通常の .md を使用してください: {source}")
        if not source.is_file() or source.suffix != ".md":
            continue
        text = source.read_text(encoding="utf-8")
        match = re.match(r"\A---\n(.*?)\n---(?:\n|$)", text, re.S)
        if not match:
            raise ValueError(f"frontmatter がありません: {source}")
        metadata = yaml.safe_load(match[1])
        if not isinstance(metadata, dict) or not isinstance(metadata.get("title"), str) or not metadata["title"].strip():
            raise ValueError(f"title がありません: {source}")
        body = text[match.end():]
        body = re.sub(r"<!--[\s\S]*?-->|```[\s\S]*?```|`[^`]*`", "", body)
        links = [m[1] for m in re.finditer(r"(?<!!)\[[^\]\n]*\]\(([^)\s]+)(?:\s+[^)]*)?\)", body)]
        links.extend(action["link"] for action in metadata.get("hero", {}).get("actions", []))
        for link in links:
            target = target_path(source, link)
            if target is not None and not target.is_file():
                raise ValueError(f"リンク先がありません: {source}: {link}")
        count += 1
    if not count:
        raise ValueError("原稿がありません")
    print(f"Markdown 原稿 {count} 件: YAML・title・内部ページリンクを確認")


if __name__ == "__main__":
    try:
        check()
    except (ValueError, yaml.YAMLError) as error:
        sys.exit(str(error))
