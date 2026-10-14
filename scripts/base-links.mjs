export function baseLinks(base = "") {
  function rewrite(node, context) {
    context.setProperty(node, "url", withBase(node.url, base));
  }
  return {
    name: "oyasai-base-links",
    link: rewrite,
    image: rewrite,
    definition: rewrite,
  };
}

export function withBase(url, base = "") {
  const prefix = base.replace(/\/$/, "");
  return url.startsWith("/") &&
    !url.startsWith("//") &&
    url !== prefix &&
    !url.startsWith(prefix + "/")
    ? prefix + url
    : url;
}
