---
title: 統合版（Bedrock）で接続・紐付けする方法
---

# 統合版（Bedrock）で接続・紐付けする方法

実は・・・おやさい鯖はPocket Edition（スマホ版）、Bedrock Edition（統合版）でもログインできます。
iPhoneでもAndroidでも、PS4でもXboxでもSwitchでも接続して遊べます。

## 接続方法

| 項目 | 内容 |
| --- | --- |
| バージョン | 最新版 |
| 接続アドレス | oyasai.io |
| ポート | 19132(デフォルト) |

![](https://image01.seesaawiki.jp/o/i/oyasai/FQawHmy9mF.png)

**Switchの場合の入力例**
外部サーバーに繋げれるようにしてから下記のように入力してください。
その後、すべてをダウンロードして参加をクリックで参加できます。

![](https://media.discordapp.net/attachments/1496990289179709551/1499709791457640458/2026042106085000_s.jpg?ex=69fbb7d5&is=69fa6655&hm=b2956c8db08730713eff63bfb270351933aed0b99b84715e4de83a9e61c37ec4&=&format=webp&width=1423&height=800)

![](https://media.discordapp.net/attachments/1496990289179709551/1499709791939989616/2026042106090700_s.jpg?ex=69fbb7d5&is=69fa6655&hm=799871c1a11d8eb1fac6bc313a2567e52184b2cecf021d7d566ae386c650df40&=&format=webp&width=1423&height=800)

**スマホの場合の入力例**
右上のサーバーを追加から、新しいサーバーを追加に進み下記のように入力し、追加してプレイをタップで参加できます。

![](https://media.discordapp.net/attachments/1496990289179709551/1501465794075164794/image.jpg?ex=69fc2c7d&is=69fadafd&hm=4ed8b535bdf5a2f4a67739eb539c10197c9846cc07eaa18edad9e957c6fd7ac7&=&format=webp&width=1730&height=800)

![](https://media.discordapp.net/attachments/1496990289179709551/1501465794360508446/image.jpg?ex=69fc2c7d&is=69fadafd&hm=56741f554fe5eb0b8adb067fab92d093b5652b818eca788c18fb12cf62c221f3&=&format=webp&width=1730&height=800)

## JAVA版と統合版の紐付け方法

JAVAアカウント、統合版アカウントで別々のアカウントで遊ぶこともできますが、相互で紐付けして同じアカウントで遊ぶ事も出来ます。
紐付けを解除して再び別々のアカウントに分ける事も可能です。

**Java版を持っていない方は、紐付けは読み飛ばして大丈夫です。**

注意点

- ベースがJava EditionのIDになるので、Bedrock EditionのIDは使えなくなります。/unlinkすればまた使えます。
- ※紐付けをしない場合、JAVA版・統合版で２つのアカウントを使い分ける場合、ランクの引き継ぎは致しません。

| 項目 | 接続アドレス | 備考 |
| --- | --- | --- |
| java版 | link.geysermc.org | ポートはデフォの25565なので省略可 |
| 統合版 | link.geysermc.org | ポートはデフォの19132なので省略可 |

上のアドレスでJAVA版・統合版それぞれでサーバーに入る。
JAVA版でサーバーに入った状態で/linkと打つ。するとlink 〇〇〇〇という4桁の数字が出てくる。
統合版でサーバーに入り/link 〇〇〇〇（さっきの4桁の数字）と打つ。

以上が紐付けの方法です。

- アカウント移行は少々ややこしいです。困ったらDiscordの#質問チャンネルに書いてみましょう。

紐付け解除は上記のリンク鯖に行き【/unlink】と打ってください。

## 統合版からJAVA版へのお引越し

JAVA版をメインに使う場合、ランクなどを引き継ぐため運営に申告をお願いします。
**以前使っていた統合版アカウントは初級に戻させていただきます。**

### アカウント引越し前の注意

お金や投票ポイント、チェストのロック情報などこれらの情報は引き継げませんので事前にチェストのロックを解除するなり移行先のアカウントへの移す等の引越し準備をお願いします。
また、IDで管理している情報、例えば統合版で設置したSocialLikesは引き継げません。

## 旧ページの内容（BedrockEditionでログインする方法）

<!-- 要確認: 以下は旧ページ。接続アドレス・リンク方法が上の新しい案内と異なるため、現行かどうか確認してください -->

| 項目 | 内容 |
| --- | --- |
| バージョン | 最新版 |
| 接続アドレス | baakun.com |
| ポート | 19132(デフォルト) |

アカウント移行ややこしいです。困ったらDiscordの#質問チャンネルに書いてみましょう。

### Java版アカウントにリンク

Java Editionアカウント、Bedrock Editionアカウントで別々のアカウントで遊ぶこともできますが
相互で紐付けして同じアカウントで遊ぶことが出来ます。
紐付け解除して再び別々のアカウントに分ける事も可能です。

注意点
・ベースがJava EditionのIDになるので、Bedrock EditionのIDは使えなくなります。/unlinkaccountすればまた使えます。

**Step 1**
Java Editionでログインして、以下のコマンドでコードを生成します。

| コマンド | 説明 |
| --- | --- |
| /linkaccount ゲーマータグ | ゲーマータグとはBE,PEのユーザーIDを意味します |

★例
以下はJava EditionのID「DangerousG3」を、Bedrock Editionのゲーマータグ「Bajakun」とリンクしたい場合の例です。
まずJava EditionでDangerousG3としてログインして、「/linkaccount Bajakun」コマンドを実行します。

![](https://image01.seesaawiki.jp/o/i/oyasai/dzO93i9ot9.png)

こんな文章が出てきます。
「**/linkaccount DangerousG3 5252**」が生成されたコードです。

**Step 2**
Bedrock Editionでコードを打ち込み、リンクを完了させます。

★例
先程Java Edition内で生成されたコード「**/linkaccount DangerousG3 5252**」をBedrock Editionで実行します。

![](https://image02.seesaawiki.jp/o/i/oyasai/wklgZzoUE_.png)

![](https://image01.seesaawiki.jp/o/i/oyasai/J5BWR1ByUK.png)

この画面が出たら成功です。

以上が紐付けの方法です。
紐付け解除は「/unlinkaccount」です。

紐付けをしないもしくはunlinkaccountでJava版、Bedrock版２つのアカウントに分ける場合、ランクの引き継ぎは出来ません。

### Bedrock版→Java版の引っ越し

運営に申告をお願いします。
申告していただく前に１つお願いがあります。IDで管理している情報、例えばBedrock Editionアカウントで設置したSocialLikesやチェストのロック情報など
これらの情報は引き継げません。事前にチェストのロックを解除するなりアカウント引っ越しの準備をお願いします。
