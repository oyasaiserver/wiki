# おやさいサーバー Wiki

おやさいサーバーのプレイヤー向け Wiki の原稿です。Markdown で書き、[MkDocs](https://www.mkdocs.org/)（Material テーマ）でサイトにします。

## 書き方

どれでも同じように PR になり、`main` に merge されたものが公開されます。

| 方法 | 向いている人 |
|---|---|
| 編集画面（公開サイトの `/admin/`） | Git を使わない人。保存すると PR になり、「公開」で merge される |
| GitHub 上で直接編集 | ちょっと直したい人 |
| ブランチを切って PR | Git を使う人、AI エージェント（[AGENTS.md](AGENTS.md)） |

## フォルダー

`docs/` の下に、目的別の「ハブ」フォルダーがあります。

| フォルダー | ハブ |
|---|---|
| `start/` | はじめに・接続 |
| `rules/` | ルールとマナー |
| `ranks/` | ランクと権限 |
| `play/` | 遊び方・経済 |
| `features/` | 機能・プラグイン |
| `world/` | ワールド・観光・交通 |
| `community/` | イベント・コミュニティ |
| `staff/` | スタッフ・運営 |

- 1ページ1テーマ。ファイル名は英小文字とハイフン（例: `features/sociallikes.md`）。
- ページ同士は相対リンクでつなぐ（例: `[SocialLikes](../features/sociallikes.md)`）。
- 画像は `docs/assets/` に置く。
- 新しいページはメニューに自動で並びます。ハブの名前と順番は各フォルダーの `.pages` で決めます。

## 手元で確認する

```bash
pip install -r requirements.txt
mkdocs serve
```

http://127.0.0.1:8000/ で見られます。PR ごとに `mkdocs build --strict` が動き、リンク切れがあると失敗します。

## まだ決まっていないこと

- 公開先（サーバー・DNS）
- 編集画面の GitHub ログインの中継（`docs/admin/config.yml` の `base_url`）
- サイト生成の道具。MkDocs 2.0 は今のプラグインやテーマが動かないため、`requirements.txt` で MkDocs 1.6 と Material 9.7 に固定している。原稿は Markdown なので、後継（Material チームの Zensical など）へ移るときも原稿は変えなくてよい。
