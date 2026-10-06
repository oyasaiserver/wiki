# AI エージェント向けの入口

このリポジトリは、おやさいサーバーのプレイヤー向け Wiki の原稿です。読者はプレイヤーです。

## 事実の出どころ

- プラグインの機能・コマンド・権限は、[oyasaiserver/platform](https://github.com/oyasaiserver/platform) の `master` を最新の正本として確認してから書く。入口は platform の `docs/_MANIFEST.md`。そこから各プラグインの `PROJECT.md` と `plugins/<Plugin>/`（`plugin.yml`、コマンド定義）へ辿る。
- platform に無い運営上の情報（ルール、イベント、スタッフ）は、既存の Wiki ページか、依頼した人の指示に従う。
- 確かめられなかったことは書かないか、「未確認」と書く。推測でコマンドや数値を書かない。
- platform の変更を Wiki に反映するときは、どのコミット・PR を見て書いたかを PR の本文に書く。

## 書き方

- 1ページ1テーマ。置き場所は [README.md](README.md) の「フォルダー」の表に従う。
- 冒頭に `title` を持つ frontmatter を付ける（編集画面と同じ形）。
- 関連ページへは相対リンクを張る。
- 開発の手順や内部設計は書かない。それは platform の `docs/` に書く。
- 個人情報、非公開のサーバー情報、スタッフ内の議論は書かない。

## 作業の流れ

1. `main` から新しいブランチを切る。
2. ページを書く。
3. `mkdocs build --strict` を通す（[README.md](README.md) の「手元で確認する」）。
4. PR を出す。タイトルは `docs: 〜` の形にする。
