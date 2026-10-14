---
title: 乗り物
sidebar:
  order: 2
---

おやさい鯖オリジナルのプラグインです。作者はSrain3([Github](https://github.com/Srain3))

## 車の出し方

- \<**/menu**> からCarBuilder2を開く。又は\<**/rvmenu**>から直接開く。どちらからでも同じ画面が開きます。試乗から好きな車を選択します。
- チャット欄に\<**/cbmenu [車名]**>と打てばいつでもどこでも試乗できます。
- 試乗することにより、車の購入や車のカスタマイズに必要なマイルポイントを入手できますので、移動の際は積極的に乗り回しましょう。
- 乗り終えたあとは、運転席の緑の羊毛を叩くか\</rvmenu break>で消しておきましょう！

![](https://image02.seesaawiki.jp/o/i/oyasai/pI7T4IXo_W.png)

## 車の作り方

### STEP 1. 車体作成

制限は車両の構成エンティティ数で計算されています。**全員：1500エンティティまで**

#### 車体とタイヤの作成！

まずは南向きに車体を作ります。車体の前方を南に向けてください。別の方角を向いていたらWorldEditの\<//rotate>で回転してください。

- 権限が無ければ運営に言っていただければ回転させます。
- 作るときは内装も込みで作るのをおすすめします。

写真のような感じで作ります。  
![](https://image01.seesaawiki.jp/o/i/oyasai/1feca8ad7f48b01d.png)

以下のブロックは灯火類に指定されています。

| ヘッドランプ | フロッグライト3種 |
| --- | --- |
| ヘッドランプ | ランタン2種 |
| ヘッドランプ | シーランタン |
| ヘッドランプ | エンドロッド |
| ブレーキランプ | レッドストーンブロック |
| ブレーキランプ | ネザーレンガ系（階段、半ブロック含む） |
| ウィンカー | オレンジ：黄色のシュルカーボックス |
| ウィンカー | オレンジ：黄色のテラコッタ |

#### ホイールを回したい場合！

車体からホイールをすべて除いて、車体左側ホイールを一本、車体の外に作成してください。

#### 二種類登録したい場合

例えばサイズの違うホイールや見た目の違うホイール、もう一本ホイールを作ってwheel2として登録していきます。

そしてホイールのあるべき中心点にスケルトンヘッド(又はゾンビヘッドでwheel2の場所指定)を置いてbody登録すると自動でホイールがそこに出現します。

- 後で微調整がしたい人は必ずしも必要ではありません。

![](https://image01.seesaawiki.jp/o/i/oyasai/e_oP011sAv.25.52.png)  
画像は偶数が中心の場合のやり方

#### 新機能：リトラクタブルヘッドライト！

#### リトラクタブルヘッドライトを動かしたい場合！

車体からヘッドライトをすべて除いて  
左側ヘッドライトを開いた状態で1つ車体の外に作成してください。  
![](https://image01.seesaawiki.jp/o/i/oyasai/R4dt8C2XTP.39.29.png)

そしてヘッドライトの根元辺りにクリーパーヘッドを置いてbody登録すると  
自動でヘッドライトが出ます。

### STEP 2. 登録

WorldEditで車体を登録します。この作業は初級者の方でも行えます。  

> **前知識**  
> ・木の斧でクリック/右クリックで選択したい範囲を選択出来ます。火のパーティクルが出てきてたら成功です。  
> ・\<//copy>コマンドを打つと、選択した範囲をクリップボード上にコピーできます。  
> ・車体をコピーした状態で登録コマンドを打つと、システムに車体が登録される仕組みです。

#### 登録してみよう！

#### 車体の登録する場合

\</cbmenu 登録名 save body>というコマンドで登録します。  
\<例>/cbmenu toyota\_AE86 save body

#### ホイールを登録する場合

\</cbmenu 登録名 save wheel>というコマンドで登録します。  
\<例>/cbmenu toyota\_AE86 save wheel

二種類目を登録する場合は（必要な人だけ）  
\</cbmenu 登録名 save wheel2>  
\<例>/cbmenu toyota\_AE86 save wheel2

スケルトンヘッドを設置してない方は別途で設定をしないと反映されません。  
(詳しくは「STEP 3. 微調整」のホイール設定を参照してください)

#### リトラクタブルヘッドライトを登録する場合

\</cbmenu 登録名 save headlight>というコマンドで登録できます  
\<例>/cbmenu toyota\_AE86 save headlight

- 登録は以上で完成です。次に色々微調整していきましょう！

### STEP 3. 微調整

試乗車を出してみましょう「位置がおかしい」「サイズが変」と感じた場合の修正方法です。

#### 車体の設定

#### サイズの調整

以下のコマンドでボディのサイズを調整します。デフォのサイズ値は3.5です。  
\</cbmenu 登録名 size body サイズ値>

#### 位置の調整

以下のコマンドでボディの位置(オフセット)を調整します。デフォは0 0 0です。  
\</cbmenu 登録名 offset body 0 X座標 Y座標 Z座標>  
\<例>/cbmenu toyota\_AE86 offset body 0 0.0 -0.3 0.0

#### ホイールの設定

#### サイズの設定

以下のコマンドでホイールのサイズを調整します。  
基本の推奨サイズ値は0.5ですが車両やホイールサイズによって変化します。  
\</cbmenu 登録名 size wheel サイズ値>

- 二種類目の変更の場合は上記のコマンドの「wheel」の部分を「wheel2」に置き換えたもので設定できます。

#### 位置の設定 (手動で登録する場合)

以下のコマンドでホイールの位置(オフセット)を調整します。  
Xが+だと左側-だと右側、Zが+だと前方-だと後方です。  
管理番号の登録数分ホイールが反映されます。番号は0から順に使うと便利です。  
\</cbmenu 登録名 offset wheel 管理番号 X座標 Y座標 Z座標>  
\<例 (左前)>/cbmenu toyota\_AE86 offset wheel 0 1.3 -0.6 2.1  
\<例 (右後)>/cbmenu toyota\_AE86 offset wheel 3 -1.3 -0.6 -2.1

#### シートの設定

#### 位置の設定

以下のコマンドで調整します。x、y、zで指定します。x、y、zは車の中心から±で指定されます。  
0.0,0.0,0.0なら車両中心部に座席が作られます。  
\</cbmenu 登録名 offset seat 管理番号 X座標 Y座標 Z座標>

日本車(右ハンドル)の運転席(Num:0)だします。/cbmenu 登録名 offset seat 0 -0.8 0.3 -0.2

| 登録名 | 車の名前になります。 |
| --- | --- |
| 管理番号 | 0番が運転席になります。0を登録してから1を登録すると助手席を作れます。 |
| X座標 | 左右軸です。1.0に設定すると左にズレます。-1.0に設定すると右にズレます。 |
| Y座標 | 上下軸です。1.0に設定すると上にズレます。-1.0に設定すると下にズレます。 |
| Z座標 | 前後軸です。1.0に設定すると前にズレます。-1.0に設定すると後ろにズレます。 |

#### リトラクタブルヘッドライト設定

#### サイズの調整

以下のコマンドでヘッドライトのサイズを調整します。  
基本の推奨サイズ値は0.5ですが車両やヘッドライトサイズによって変化します。  
\</cbmenu 登録名 size headlight サイズ値>

#### 位置調整 (手動で登録する場合)

以下のコマンドでヘッドライトの位置(オフセット)を調整します。  
Xが+だと左側-だと右側、Zが+だと前方-だと後方です。  
管理番号の登録数分ホイールが反映されます。番号は0から順に使うと便利です。  
\</cbmenu 登録名 offset headlight 管理番号 X座標 Y座標 Z座標>  
\<例>/cbmenu toyota\_AE86 offset headlight 0 1.3 -0.6 2.1

#### 回転位置の調整

以下のコマンドでヘッドライトの回転位置(オフセット)を調整します。  
Y→Zの順に設定を行うといいです。基本マイナス値推奨  
\</cbmenu 登録名 headlight rotateoffset X座標 Y座標 Z座標>  
\<例>/cbmenu toyota\_AE86 headlight rotateoffset 0.0 -0.35 -0.05

#### 回転の角度設定(閉じた時の角度)

以下のコマンドでヘッドライトの閉じた時の角度を調整します。  
基本は45.0ですが車両やヘッドライトによって変化します。  
\</cbmenu 登録名 headlight angle 角度>  
\<例>/cbmenu toyota\_AE86 headlight angle 55.0

**以上ですべての設定が終了です！お疲れ様でした！**

## 旧版の記述

以下は Seesaa 版で別ページだった旧版（暫定版）の記述です。

### 車の作成と運転（暫定版）

おやさい鯖オリジナルのプラグインです。作者はSrain3([Github](https://github.com/Srain3))

マイクラ内で車両を作って運転できます。

![](https://image02.seesaawiki.jp/o/i/oyasai/pI7T4IXo_W.png)![](https://image02.seesaawiki.jp/o/i/oyasai/N9Kgith_38.png)

[道路マップ](http://baakun.com:8123)

### つかいかた

**/menu** から購入、試乗、カスタムができます。  
![](https://image01.seesaawiki.jp/o/i/oyasai/h2TR2ktpB8.png)

| お試し用 | 試乗用 性能が制限されています 無料で出して乗れます |
| --- | --- |
| 購入 | 車両をマイルポイントで購入 |
| カスタム | 購入した車両をカスタマイズ |
| 切替 | 乗車時の視点追尾ON/OFFを切り替え |

ランクが高いほど複雑な作りの車両を扱えるようになります。  
制限は車両の構成エンティティ数で計算されています。  
初級者：７５０エンティティまで  
中級者：７５０エンティティまで  
上級者：１０００エンティティまで  
建築士：１５００エンティティまで  
匠：１５００エンティティまで  
同乗であればランクは関係ありません。  
このページのトップ画像の86を出すには/carcmd spawn truenoです。740エンティティなので建築士以上で乗れるようになります。  
上級者以上で乗れる86は/carcmd spawn trueno2です。  
緑の羊毛の座席が運転席です。

車両作成開放！全員作れるようになりました

### つくりかた

#### Step 1 車両作成

まずは南向きに車体を作ります。車体の前方を南に向けてください。  
（別の方角を向いていたらWorldEditの//rotateで回してください。  
　権限が無ければ運営に言っていただければ回転させます。）  
![](https://image02.seesaawiki.jp/o/i/oyasai/f6CglPw3Qx.png)![](https://image02.seesaawiki.jp/o/i/oyasai/NkMNxdECKl.32.37.png)![](https://image02.seesaawiki.jp/o/i/oyasai/1GhdIrjJg_.33.46.png)![](https://image02.seesaawiki.jp/o/i/oyasai/L5EkjWWMm0.33.14.png)  
こんな感じで作ります

以下のブロックは灯火類に指定されています。

| ブレーキランプ | レッドストーンブロック |
| --- | --- |
| ブレーキランプ | 赤い羊毛 |
| ブレーキランプ | ネザーレンガ系（階段、半ブロック含む） |
| ヘッドランプ | フロッグライト3種 |
| ヘッドランプ | 白い羊毛 |
| ウィンカー | オレンジ/黄色のシュルカーボックス |
| ウィンカー | オレンジ/黄色のテラコッタ |

![](https://image02.seesaawiki.jp/o/i/oyasai/7vlKaKdIP9.png)![](https://image01.seesaawiki.jp/o/i/oyasai/vFLDoEUID4.png)![](https://image01.seesaawiki.jp/o/i/oyasai/e2Ft154rR2.png)

#### Step 2 登録

次はWorldEditで車体を登録します。この作業は初級者の方でも行えます。

##### 1.木の斧で車体を範囲選択

設定したい範囲のブロックを、木の斧でクリック/右クリックで選択します。  
![](https://image01.seesaawiki.jp/o/i/oyasai/MkDu4Djd_X.png)

##### 2.コピー

チャットに**//copy**コマンドを打つと、選択した範囲をクリップボード上にコピーできます。  
車体をコピーした状態で登録コマンドを打つと、システムに車体が登録される仕組みです。

##### 3.登録

以下のコマンドで登録します。  
**/carcmd save 登録名 スケールサイズ**  
例:/carcmd save AE86Trueno 3.5  
![](https://image02.seesaawiki.jp/o/i/oyasai/tFzV5YPWPj.png)  
試乗購入のシステムに登録されて誰でも乗れるようになります。  
以下の設定は位置調整になります。車体を作り終わってから設定する際に読むことをおすすめします。

#### Step 3 設定

##### 4.シート設定

最初の位置調整です。これをしないと車両をスポーン出来ないので必ず設定してください。  
難しそうに見えますが、座標を打ち込むだけなので簡単に出来ます。

x、y、zで指定します。コマンドは/carcmd seat \<登録名> \<Num> \<x> \<y> \<z>です。  
xyzは車の中心から±で指定されます。0.0,0.0,0.0なら車両中心部に座席が作られます

| 登録名 |  | 車の名前になります。 |
| --- | --- | --- |
| Num |  | 若い番号が運転席になります。0を登録してから1を登録すると助手席を作れます。 |
| x |  | 左右軸です。1.0に設定すると左にズレます。-1.0に設定すると右にズレます。 |
| y |  | 上下軸です。1.0に設定すると上にズレます。-1.0に設定すると下にズレます。 |
| z |  | 前後軸です。1.0に設定すると前にズレます。-1.0に設定すると後ろにズレます。 |

![](https://static.seesaawiki.jp/formatter-storage/images/function/fukidashi/icon_guest.gif)

日本車(右ハンドル)の運転席(Num:0)だします  
/carcmd seat 登録名 0 -0.8 0.3 -0.2

最初は位置が分からないと思うので、まずは全て0で出してから微調整していくのがおすすめです。

運転席が設定されればスポーン出来るようになります。おつかれさまでした。  
車体の微調整用のコマンドリストです。

| /carcmd seat \<登録名> \<Num> delete |  | その番号のシートを消去します |
| --- | --- | --- |
| /carcmd body \<登録名> \<Size> |  | 車体のスケールサイズを変更できます |
| /carcmd body \<登録名> \<x> \<y> \<z> |  | 車体のオフセット位置を変更できます |
| /carcmd body \<登録名> \<Rotate> rotate |  | 車体を回転できます。X軸回転です |

![](https://image02.seesaawiki.jp/o/i/oyasai/G3Uh_WDJyQ.png)

おしり

### 車の作成と運転（初期の暫定版）

#### なにそれ

おやさい鯖オリジナルのプラグインです。作者はSrain3

自分で車を作って運転できます

![](https://image02.seesaawiki.jp/o/i/oyasai/pI7T4IXo_W.png)

↑プラグインで作った車

VehicleCraft、VehicleBuilder、CarCraft、CarBuilderなど・・・現在名前募集中！

#### つかいかた

**/carcmd spawn 登録名** で車を召喚します。緑の羊毛の座席が運転席です。  
↓/carcmd spawnまで入力したら登録名は自動でTAB補完してくれます。  
![](https://image01.seesaawiki.jp/o/i/oyasai/n8Gf234gEa.png)  
ランクが上がっていくにつれ複雑な作りの車両に乗れるようになっていきます。  
車両の構成エンティティ数で計算されています。  
初級者：１００エンティティまで  
中級者：２５０エンティティまで  
上級者：４００エンティティまで  
建築士：７５０エンティティまで  
匠：１０００エンティティまで  
このページのトップ画像の86を出すには/carcmd spawn truenoです。740エンティティなので建築士以上で乗れるようになります。  
中級者以上で乗れる86は/carcmd spawn trueno2です。ページ下部におすすめ車両のコマンドリストを貼っておきます。

なお、車を作るには匠↑の権限が必要です。

#### つくりかた

Step 1  
まずは南向きに車体を作ります。別の方角を向いていたら//rotateで回して、車体の前方を南に向けてください。

Step 2  
次はWorldEditで車体をコピーします。  
![](https://image01.seesaawiki.jp/o/i/oyasai/MkDu4Djd_X.png)  
木の斧で車体を範囲選択してから//copyコマンドを実行してください。  
車体をコピーした状態で登録用のコマンドを打つと車体が登録される仕組みです。  
登録用のコマンドは↓  
**/carcmd save 登録名 スケールサイズ**  
例:/carcmd save AE86Trueno 3.5

・/carcmd seat \<登録名> \<Num> \<x> \<y> \<z>でシートを登録します。若い番号が運転席になる仕様です。  
xyzは車の中心から±で指定されます。0.0,0.0,0.0なら車両中心部に座席が作られます  
xを1.0にしたら左にズレ、zを-1.0にしたら後ろにズレます。  
・/carcmd seat \<登録名> \<Num> deleteでその番号のシートを消去します。

・/carcmd body \<登録名> \<Size>で車体のスケールサイズを変更できます  
・/carcmd body \<登録名> \<x> \<y> \<z>で車体のオフセット位置を変更できます。  
・/carcmd body \<登録名> \<Rotate> rotateで車体を回転できます。X軸回転です

まだ書いてる途中

おしり

## 車種一覧

CarBuilderはおやさい鯖オリジナルのプラグインです。  
色んな人たちが作った多種多様な車両を乗り回してみましょう。（自分で作ることもできるぞ！）

乗り終えた車両は消しておきましょう。  
緑の羊毛を殴るか、**/rvmenu break**と打ち込むと車両を消せます。

### 制作者：machakirikiri

| 34NickBike | Acura\_NSX\_2019 | BMW\_M4\_G82\_2021 | BMX |
| --- | --- | --- | --- |
| BOAT | BOAT2 | Bugatti\_Chiron\_ 2020 | Bugatti\_Chiron\_ 2020\_block |
| Chevrolet\_ Camaro\_2010 | Chevrplet\_ Corvette\_1978 | Chevrplet\_Corvette\_ Z06\_2023 | Daihatsu\_Copen\_L880K |
| Devel\_sixteen | Dodge\_Challenger\_ SRT\_Hellcat | Dodge\_Challenger\_ SRT\_Hellcat\_BAA | Dodge\_charger\_baha |
| eru\_\_chanBike | Ford\_GT\_2006 | Ford\_Mustang\_2015 | Formula\_one\_ LP830\_SDC |
| Formula\_one\_ LP830\_SDC\_red | Formula\_one\_ LP830\_SDC\_white | Harly\_street\_bob | Hitler |
| Honda\_Civic\_EG6\_1991 | Honda\_Integra\_ TypeR\_DB8 | Jeep\_Gladiator\_2020 | Juguar\_F\_Type\_ Coupe\_2021 |
| Kanedabike | KimJongUn | Lamborghini\_ Countach\_5000QV | Lamborghini\_ Countach\_LP500 |
| Lamborghini\_ Huracan\_2021 | Lexus\_LS\_2021 | MachakiriBike | Mazda\_rx7\_fc3s |
| Mazda\_rx7\_fd3s | McLaren\_ 600LT\_2019 | Mercedes\_AMG\_ GTR\_2017 | MINECART |
| Mini\_Cooper\_2022 | Nagi\_FC35\_ machaCustom | Nissan\_180sx | Nissan\_Fairlady\_Z32 |
| Nissan\_ Fairlady\_Z32\_block | Nissan\_Fairlady\_Z33 | Nissan\_Onevia | Nissan\_R35\_GTR |
| Nissan\_Sileighty | Nissan\_Silvia\_S13 | Nissan\_ skyline\_R34\_GTR | Nissan\_Z\_2023 |
| OfficeChair | Pagani\_Huayra\_ Roadster\_2020 | Porsche\_911\_ Carrera\_45 | Porsche\_911\_ Turbo\_1975 |
| Porsche\_911\_ Turbo\_S\_2021 | Porsche\_911\_ Turbo\_S\_2021\_Cyan | Porsche\_912 | Porsche\_912\_Red |
| Porsche\_Cayenne\_ GTS\_Coupe\_2020 | Porshe\_Taycan\_ Turbo\_GT\_2024 | Porshe\_Taycan\_ Turbo\_GT\_2024\_ with\_Weissach | Power\_Suit |
| RollsRoyce\_ Ghost\_2021 | RollsRoyce\_ Ghost\_2021\_wr | Segwey\_onS | Segwey\_X2 |
| Shopping\_Cart | Subaru\_BRZ\_2012 | Subaru\_BRZ\_2022 | Suzuki\_Swift\_2021 |
| Toilet | Toyota\_AE86\_trueno\_1 | Toyota\_AE86\_trueno\_2 | Toyota\_Alphard\_2002 |
| Toyota\_Forklift | Toyota\_GR\_ supra\_2020 | Toyota\_GR86\_2018 | Toyota\_GR86\_2022 |
| Unicycle | veilside\_RX\_7 | Vespa\_mcc | Vespa\_mcc2 |
| Wheel\_Chair |  |  |  |

### 制作者：marzipan99

| AstonMarin\_DB11 | Countach\_LP800 | GL650 | harley |
| --- | --- | --- | --- |
| Harley\_street\_bob | Honda\_Goldwing | Honda\_Goldwing\_white | jiro |
| Mercedes\_G\_class | SCANIA\_S730 | tesla\_roadstar | ural |
| Vespa\_pink | Vespa\_skyblue | xenotype |  |

### 制作者：CornNagi

| Carbon\_AE86\_ Levin | Custom\_GTR34 | CUSTOMIZED\_ BLACK\_FD35 | duck |
| --- | --- | --- | --- |
| FD35\_Graywolf | INSANE\_Custom\_FC35 | JZA80\_Supra\_ Cyberpunk | Mitsubishi\_ Lancer\_Evo\_X |
| NagiBlackSedan | NagiRedLuxuryCar | WHITE\_CUSTOM\_FC35 | TOYOTA\_ comfort\_Tuned |

### 制作者：Srain3

| car\_LE\_WR | Honda\_NBOX | Isuzu\_erga | MAZDA\_CX\_5 |
| --- | --- | --- | --- |
| Nissan\_s30z | sakura\_moti | SUBARU\_ Impreza\_GDBF | SUBARU\_ Legacy\_Blitzen |
| TOYOTA\_2000GT | TOYOTA\_2000GT\_Bond | car\_wagon\_LE | TOYOTA\_comfort |
| TOYOTA\_ comfort\_TAXI | Mercedea\_770k | Mercedea\_770k\_VIP |  |

### 制作者：shimakaze8010

| crown | dodgecharger\_2015 | Humvee | L\_ATV |
| --- | --- | --- | --- |
| mustangboss429 | PatriaAMV | safetycar |  |

### 制作者：Meno0721

| mr2mk3 | nsx | nsxr |
| --- | --- | --- |

### 制作者：Una\_10

| Sankyakutorii | XR250 |
| --- | --- |

### 制作者：Hyol1n

| Cobu | Cobu1 |
| --- | --- |

### 制作者：NacuCat

| Jeep\_Wrangler\_SAHARA |
| --- |

### 制作者：Leve\_Tomo

| SUBARU\_WRX\_STI |
| --- |

### 制作者：maikukoshou

| M10 |
| --- |

### 制作者：xxJAMxx

| jaguar\_XJ13 | Fairlady\_Z34\_Custom |
| --- | --- |

### 制作者：naniyattenno

| kimofcopper |
| --- |

### 制作者：Blue\_1838

| blue\_sen | MARIO\_car |
| --- | --- |

### 制作者：suzumemikann

| ruiji |
| --- |

### 制作者：Aramaa2121

| mahounohonn1 |
| --- |

### 製作者：rinta227

| rinta\_tank\_type1 |
| --- |
