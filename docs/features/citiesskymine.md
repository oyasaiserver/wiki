---
title: CitiesSkyMine
---

# CitiesSkyMine

![](https://image01.seesaawiki.jp/o/i/oyasai/b7d504e6bd07b033.png)

**新プラグインCitiesSkyMineがサーバーに導入されました！**

**CitiesSkylinesのような都市建築をMinecraftでもっと手軽に！**

## CitiesSkyMineとは

- Minecraft内で都市建築を補助するプラグインでWorldEditの選択範囲を使い、道路・交差点・窓・階段・柱割り・雲・ベジェ曲線などを生成することができます。
- 窓の一括生成・坂道の自動ブロック配置・選択範囲操作など建築を加速するコマンドが使えます。

※**建築士**から使用できます！

### 使用ガイド

🪟 窓生成 /.win — 壁に向かって立つだけで窓を一発生成  
🪜 坂道生成 /.ss — 勾配に合わせてslab・stairsを自動配置  
📦 スタック /.ns — 選択範囲を前後左右に複製  
💾 選択保存 /.sel — 選択範囲に名前をつけて保存・復元  
🖌️ ブラシプリセット /.brp — FAWEブラシ設定をワンコマンドで呼び出し  
⚙️ 設定GUI /.cf — チェストGUIでクリック設定

## 基本

主要コマンドは /csm \<command> で実行する。  
よく使う機能には slash-dot 形式のショートカットがある。

\<例>  

```
/csm help <command>
/.help <command>
```

生成系の取り消しは原則としてFAWEの//undoを使う。

## コマンド一覧

| コマンド | ショートカット | 内容 |
| --- | --- | --- |
| /csm help | /.help | ヘルプを表示 |
| /csm window | /.win | 正面方向に窓を生成 |
| /csm slabstairs | /.ss | 選択範囲に階段・坂道を生成 |
| /csm columns | /.col | 選択範囲に柱を生成 |
| /csm stack | /.ns | 選択範囲を視点基準で複製 |
| /csm selection | /.sel | WorldEdit 選択範囲を保存・復元 |
| /csm settings | /.settings | 個人設定 GUI を開く |
| /csm config | /.config | config.yml の権限設定を編集 |
| /csm cloud | /.cloud | cobweb の雲を生成 |
| /csm bezier | /.bez | ベジェ曲線をプレビュー・生成 |
| /csm debugstick | /.ds | BlockData を変更 |
| /csm preset | /.brp | ブラシプリセットを保存・実行 |
| /csm payload | /.pl | payload を復元して配置 |
| /csm reload | config.yml を再読み込み |  |

互換コマンドとして/rc、/.rc、/ri、/.ri、/hb、/.hbも残っている。  
新しく覚える場合は/csm ...とslash-dotショートカットを優先します。

## ヘルプ

```
/.help cloud
/.help bezier
/csm help columns
```

```
/.helpの後ろに指定する項目は1つだけ。
```

## SlabStairs

```
/.ss [material]
```

\<例>  

```
/.ss stone_brick
/.ss oak
/.ss quartz
```

WorldEditで2点を選択してから実行する。  
選択範囲の勾配に応じてslab、stairs、full blockを組み合わせた坂道を生成する。

## 柱割り

```
/.col <columnWidth> <gap> [edge|center] [2d]
/.col suggest <columnWidth> <gap> [edge|center] [2d]
/.col build <columnWidth> <gap> [edge|center] [2d]
```

\<例>  

```
/.col 2 7
/.col suggest 2 7 center
/.col 2 7 center 2d
```

WorldEditの選択範囲に手持ちブロックで柱を生成する。  
suggestは生成せず、柱割り候補だけを表示する。

## Stack

```
/.ns <direction...> <times> [skip-blocks...]
```

\<例>  

```
/.ns forward 5
/.ns right 3
/.ns up 2
/.ns f 4 -a
```

WorldEdit選択範囲をプレイヤーの向きを基準に複製する。  
forward、back、left、right、up、downが使え、-aは空気を上書きしない指定である。

## Selection

```
/.sel save [name]
/.sel list
/.sel delete <name>
/.sel p
/.sel <name>
```

WorldEditの選択範囲を保存・復元する。  
直前の選択範囲は自動記録され、/.sel pで復元できる。

## 個人設定 GUI

```
/.settings
/.settings win
/.settings road
/.settings ri
/.settings pl
```

GUIでは道路・窓・交差点・payload配置などのプレイヤー個人設定を変更できる。  
ここで変更した値はプレイヤーデータとして保存される。

## 雲生成

```
/.cloud [size] [height] [density] [yOffset] [seed]
```

\<例>  

```
/.cloud
/.cloud 128 16 0.50
/.cloud 128 16 0.50 128 2026
```

現在位置から上方向にcobwebの雲を生成する。  
sizeはX/Z両方に使われるため、生成範囲は正方形である。yOffsetを省略すると100ブロック上に生成される。  
seedを省略するとランダム値が使われる。

4番目の引数だけを指定した場合はseedとして扱われる。  
yOffsetを指定したい場合は5番目のseedまで指定する。

## ベジェ曲線

```
/.bez add
/.bez set <1-8>
/.bez fromsel
/.bez remove [1-8]
/.bez preview <on|off>
/.bez build [material] [radius]
/.bez build flat [material] [width]
/.bez segments [8-256]
/.bez status
/.bez clear
```

\<例>  

```
/.bez add
/.bez fromsel
/.bez preview on
/.bez build stone 3
/.bez build flat gray_concrete 7
```

制御点からベジェ曲線を作る。  
fromselはFAWEのconvex/polyhedral選択から頂点を読み込む。  
buildは半径指定の曲線。build flatは道路向けの1枚板を生成する。

## DebugStick

```
/.ds select
/.ds cycle
```

見ているブロックのBlockDataプロパティを選択・変更する。  
バニラのデバッグ棒に近い操作をコマンドで行う。

## ブラシプリセット

```
/.brp save <name> <command>
/.brp load <name>
/.brp <name>
/.brp list
/.brp delete <name>
```

\<例>  

```
/.brp save road //br sphere gray_concrete 5
/.brp road
```

よく使うブラシ系コマンドを保存して呼び出す。

## Payload

```
/csm payload load <payload>
/csm payload load64 <payload>
/.pl load64 <payload>
```

Base997 / Base64 payloadを復元して配置する。  
巨大なpayloadはチャット欄の長さ制限に注意する。
