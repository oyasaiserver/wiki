# おやさいサーバー Wiki

おやさいサーバーのプレイヤー向け Wiki の原稿です。新 Wiki の原稿は `src/content/docs/` にあります。[platform の oyasai-web](https://github.com/oyasaiserver/platform/tree/master/packages/oyasai-web) と同じ設定・テーマ・依存を使い、このリポジトリからも GitHub Pages に試験公開します。

## 書き方

GitHub の鉛筆マークから編集するか、ブランチを切って PR を作成してください。新しい配信コンテナの導入後は、`main` の変更を約5分間隔で確認し、ビルドと検査が成功した版だけを公開します。失敗した場合は前の版を配信し続けます。

| フォルダー（`src/content/docs/` 以下） | ハブ |
|---|---|
| `start/` | はじめに・接続 |
| `rules/` | ルールとマナー |
| `ranks/` | ランクと権限 |
| `play/` | 遊び方・経済 |
| `features/` | 機能・プラグイン |
| `world/` | ワールド・観光・交通 |
| `community/` | イベント・コミュニティ |
| `staff/` | スタッフ・運営 |

- 1ページ1テーマ。通常の `.md` を使用し、冒頭の YAML frontmatter に `title` を付けます。MDX・シンボリックリンク・submodule は使えません。
- ページ間リンクは公開 URL（例: `[SocialLikes](/features/sociallikes/)`）で指定します。`index.md` はそのディレクトリの URL、その他の `.md` は拡張子を除いた末尾 `/` の URL になります。
- サイドバーは自動生成されます。順番は frontmatter の `sidebar.order`、表示名は `sidebar.label` で指定します。
- 画像は外部の HTTPS URL を参照します。原稿以外のファイルは配信コンテナへ取り込みません。
- Markdown の生 HTML は無効です。frontmatter は `title`、`description`、`template`、`pagefind`、`sidebar`（`order`・`label`・`hidden`）、`hero`（テキスト・リンク・限定されたアイコン）に限定され、HTML・任意の属性やスクリプトは使えません。
- 原稿の中身に関する事実の確認方法は [AGENTS.md](AGENTS.md) を参照してください。

## 原稿を確認する

```bash
python -m venv .venv
.venv/bin/pip install -r requirements-content.txt
.venv/bin/python -m unittest discover -s scripts -p 'test_*.py'
.venv/bin/python scripts/check-content.py
```

ローカルのサイトビルドには Node.js 22.22.3 を使い、`npm ci && npm run build` を実行します。
`npm test && npm run check:site` で base 対応、生成後のリンク・アンカー・画像と日本語検索を確認します。生成物は `dist/` に出力されます。
`astro.config.mjs` の `base` を消すとルート配信に切り替わり、原稿のリンクを書き換える必要はありません（独自ドメインへ移る際は `site` も変更します）。

PR の CI は原稿の YAML・タイトル・内部ページリンクに加え、サイトをビルドして Starlight の schema、生成後のリンクと日本語検索を検査します。PR では公開せず、`main` への push または `main` での手動実行で検査に成功したサイトを GitHub Pages（`https://oyasaiserver.github.io/wiki/`）へ公開します。

旧 `docs/`、`mkdocs.yml`、`requirements.txt` は移行中の参照として残しています。新 Wiki の原稿は `src/content/docs/` を編集してください。旧 MkDocs の CI ビルドは原稿検査へ切り替えています。
