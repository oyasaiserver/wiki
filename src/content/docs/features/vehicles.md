---
title: 車・飛行機に乗る(OyasaiVehicles)
sidebar:
  order: 2
---

![車・飛行機に乗るの紹介画像](/images/seesaa/pI7T4IXo_W.webp)

CarBuilder2 で車、AircraftBuilder で飛行機を試乗・購入できます。総合メニューには「統合版は非対応」と表示されます。購入した車両はアイテムとして持ち運び、ブロックの上で使います。ポイントは車両の購入や性能カスタムに使います。

利用できる機能とランクの対応は未確認です。使えない操作は運営へ確認してください。

## 車の出し方

### 車両を試す・購入する

| 操作 | コマンド |
|---|---|
| 乗り物メニューを開く | `/realvehicle`（別名 `/rvmenu`） |
| 車のメニューを開く | `/carbuilder2`（別名 `/cbmenu`） |
| 飛行機のメニューを開く | `/aircraftbuilder`（別名 `/acmenu`） |
| ポイントを確認する | `/milepoint` |

メニューから「試乗」または「購入」を選び、車両を選択します。購入は車・飛行機とも **100 マイルポイント**です。購入車両はアイテムとして受け取ります。初回の記録がないプレイヤーには、参加時に 1,000 ポイントが付与されます。走行距離に応じたポイントは、降車や車両終了時に精算されます。

車両名が分かる場合は、メニューの代わりに次のコマンドも使えます。

- 車: `/cbmenu <車両名> spawn` で無料試乗、`/cbmenu <車両名> buy` で購入。`/cbmenu <車両名>` だけでも試乗できます。
- 飛行機: `/acmenu <車両名> spawn` で無料試乗、`/acmenu <車両名> buy` で購入。`/acmenu <車両名>` だけでも試乗できます。

購入した車両を出すには、アイテムを手に持ってブロックの上面を右クリックします。成功するとアイテムを消費します。設置場所や権限、車両数の条件を満たさない場合は出ず、アイテムは消費されません。

所有者なしの試乗は、車・飛行機それぞれ直前の1台を新しい試乗車両に置き換えます。ログアウトで車両が終了するのは、召喚した本人がその時点でその車両に搭乗している場合です。降車済みの召喚者や、他人が召喚した車両の乗客がログアウトしても、この条件では終了しません。

## 運転する

車両の座席を右クリックして乗ります。停止に近い車両の空席付近で、地面に立ち、スニークしていない場合は自動で乗ることもあります。運転席に乗ると操作の案内が表示されます。

| 車 | 操作 |
|---|---|
| 車・飛行機 | `W` で加速、`A`・`D` で旋回、`S` でブレーキ。AT 車と飛行機は停止後も `S` で後退 |
| 車 | ホットバー 1: 左ウインカー、2: ハザード、3: 右ウインカー |
| 車（MT 車） | ホットバー 4: シフトダウン、6: シフトアップ。停止中の `S` では後退しません。4でRまで下げて `W` で後退 |
| 車 | ホットバー 8: ライト、9: クルーズモード |
| 飛行機 | ホットバー 1〜4: 下降、5: 上下操作の中立（高度固定ではなく、下降する場合があります）、6〜9: 上昇 |

クルーズの切替は前進速度が一定以上（0.05以上）のときだけできます。`S` のブレーキで解除されます。

`/realvehicle camera`(`/rvmenu camera`)で、車両の旋回に合わせた視点追尾を切り替えます。初期状態は無効です。

## ガレージ・表示設定

- `/realvehicle garage`(`/rvmenu garage`)でガレージを開きます。車両アイテムだけを通常の左クリックで収納・取り出します。Shift移動、右クリックによる分割、ドラッグなどは使えません。
- `/realvehicle net`(`/rvmenu net`)で表示更新の設定を `Ultra` → `High` → `Medium` → `Low` の順に切り替えます。
- `/realvehicle break`(`/rvmenu break`)で自分が出した乗り物を終了します。購入車両は終了後に持ち主へ返されます。
- `/realvehicle vip car_smoke`(`/rvmenu vip car_smoke`)で車のドリフト煙の色を選びます。利用できない場合は `[OyasaiVehicles] 権限がありません。` と表示され、寄付案内が続きます。寄付者向けの機能です。利用については運営に確認してください。

## 性能カスタム

車または飛行機のメニューで「性能カスタム」を開き、下側の所持品にある対象の車両アイテムを直接クリックします。プラス・マイナスで1ずつ、Shiftを押しながらクリックすると10回分変更します。途中で残高・上限に達すると、一部だけ変更される場合があります。

- 最高速は1〜180、パワー・ブレーキは1〜1000。車はさらにギア数1〜100、タイヤ1〜200です。
- 上部の `Cost:現在値/上限` を確認してください。通常のコスト上限は累計走行距離1,000mごとに1増え、初期値は10です。サーバー設定によって固定上限になる場合もあります。
- 通常品のプラス操作は1につき3ポイント。マイナスは無料ですが、ポイントは返りません。イベント品は指定コスト上限まで無料で変更できます。
- 車は「MT切り替え」でAT/MT、「Mode切り替え」で `Normal` → `Normal_Race` → `Pro` → `Pro+` → `Real` を切り替えます。
- 変更できないときは基本的に音だけで、ポイント不足のチャット表示は出ません。残高、性能値、コスト上限を確認してください。

## マイルポイント・タイムアタック

- `/milepoint` で現在のポイントを確認します。ポイントは車両の購入や、性能カスタムのプラス操作に使われます。通常のカスタムは性能を 1 上げるごとに 3 ポイントを消費します。性能を下げてもポイントは戻りません。
- 距離ポイントは運転者が「距離m ÷ 250 × 2」、同乗者が「距離m ÷ 250」 です。乗車分の精算ごとに端数を切り捨てます。累計走行距離は別に加算します。ワールド移動と1tickで16mを超える移動は距離に加算しません。
- `/timeattack <コース名>`（別名 `/ta`）で、そのコースの自己ベストを確認します。記録がない場合は表示されません。計測の開始・区間計測はコース上の仕掛けから行います。

## 制限と困ったとき

- 購入した車・飛行機は、通常は同時に 6 台まで出せます。
- 車両の設計エンティティ数や、サーバー側の利用設定によってスポーンできないことがあります。権限やモデルの上限は運営に確認してください。
- 車両を出す操作はブロック上面への右クリックが必要です。アイテムを手に持っていない、別の面をクリックした、という場合は反応しません。

| 表示 | 意味・対応 |
|---|---|
| `[CarBuilder2] 権限がありません。` / `[AircraftBuilder] このコマンドを実行する権限がありません。` | メニューやコマンドの利用が許可されていません。運営に確認してください。 |
| `[CarBuilder2] 実行権限がありません。` / `[AircraftBuilder] 実行権限がありません。` | 車両への乗車・アイテムからのスポーンが許可されていません。 |
| `[CarBuilder2] 同時に出せる購入車両は6台までです。` | 同時に出ている購入車両を終了してから、もう一度試してください。 |
| `[CarBuilder2] エンティティ数<上限>を超えています (<数>)` / `[AircraftBuilder] エンティティ数が<上限>を超えています (<数>)` | 選んだ車両の設計がサーバー側の上限を超えています。運営に相談してください。試乗コマンドでは、この表示の後に試乗成功の表示が続く場合があります。実際に車両が出たか確認してください。 |
| `[CarBuilder2] ポイント不足です!` / `[AircraftBuilder] ポイント不足です` / `Not enough points!` | 購入に必要なポイントがありません。`/milepoint` で残高を確認してください。 |
| `[CarBuilder2] インベントリを開けてください!` / `[AircraftBuilder] インベントリに空きがありません` / `Inventory is full!` | インベントリに空きを作ってから購入してください。 |
| `[OyasaiVehicles] ガレージに収納しました` | 車両アイテムを持ち物に戻せなかったため、ガレージへ送りました。 |
| `[OyasaiVehicles] ガレージに空きがないため、足元にアイテムをドロップしました!` | ガレージも満杯だったため、アイテムが足元に落ちました。拾ってください。 |

[retained-image-1]: /images/seesaa/1feca8ad7f48b01d.webp
[retained-image-2]: /images/seesaa/e_oP011sAv.25.52.webp
[retained-image-3]: /images/seesaa/R4dt8C2XTP.39.29.webp
[retained-image-4]: /images/seesaa/N9Kgith_38.webp
[retained-image-5]: /images/seesaa/h2TR2ktpB8.webp
[retained-image-6]: /images/seesaa/f6CglPw3Qx.webp
[retained-image-7]: /images/seesaa/NkMNxdECKl.32.37.webp
[retained-image-8]: /images/seesaa/1GhdIrjJg_.33.46.webp
[retained-image-9]: /images/seesaa/L5EkjWWMm0.33.14.webp
[retained-image-10]: /images/seesaa/7vlKaKdIP9.webp
[retained-image-11]: /images/seesaa/vFLDoEUID4.webp
[retained-image-12]: /images/seesaa/e2Ft154rR2.webp
[retained-image-13]: /images/seesaa/MkDu4Djd_X.webp
[retained-image-14]: /images/seesaa/tFzV5YPWPj.webp
[retained-image-15]: https://static.seesaawiki.jp/formatter-storage/images/function/fukidashi/icon_guest.gif
[retained-image-16]: /images/seesaa/G3Uh_WDJyQ.webp
[retained-image-17]: /images/seesaa/n8Gf234gEa.png

## 車種一覧

プレイヤーが作った車両の一覧です。

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

### 制作者：rinta227

| rinta\_tank\_type1 |
| --- |
