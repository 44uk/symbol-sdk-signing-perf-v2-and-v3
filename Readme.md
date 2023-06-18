# Symbol SDK Signing Performance v2 and v3.

Symbol SDK `v2` と `v3` における、署名パフォーマンスの比較用コード。

- Node.js 16.19.0
- symbol-sdk(v2) 2.0.4
- symbol-sdk(v3) 3.0.7


## 実行例と結果について

パッケージインストール後、`$ npm start` で実行すると次の結果が表示されます。

`v2`と`v3`それぞれで、同じ転送トランザクションを作成し、それを署名するということを`10,000`回繰り返し、
そのパフォーマンス（経過時間）を測定したものを出力します。

最初の二行の出力は、`v2`/`v3`で生成した署名済みトランザクションのペイロードです。
２つが一致することを確認するために出力しています。

- `'number of Signing'` -> トランザクション作成＆署名のループ回数です。
- `'timeV2(ms)'` `v2` -> を使用した作成＆署名に掛かった時間です。
- `'timeV3(ms)'` `v3` -> を使用した作成＆署名に掛かった時間です。
- `'V3 Faster than V2'` -> `v3`は`v2`の何倍処理が早いかを表現します。


次の出力は私のマシン上で実行した結果例です。
`v3`は`v2`のおよそ`43`倍は良いパフォーマンスであることを示しています。


```shell
$ npm start

> start
> node index.mjs

AB00000000000000BFA1A00A781816CEEE7591B1CC426E0659207A30783619C1E7F1AA6E092C3BFC656B56D01807DC7DC2EE6BD43E9EB07EA1F14C118E7B48EF5FD95830E80B1E0D5A2190E23EDE16ADA9C0DF52E292C10BBC2277CD4B48BC25FC1BDFC68620FFD9000000000198544140420F0000000000485314A10400000098223AF34A98119217DC2427C6DE7F577A33D8242A2F54C30B0000000000000000476F6F64206C75636B21
AB00000000000000BFA1A00A781816CEEE7591B1CC426E0659207A30783619C1E7F1AA6E092C3BFC656B56D01807DC7DC2EE6BD43E9EB07EA1F14C118E7B48EF5FD95830E80B1E0D5A2190E23EDE16ADA9C0DF52E292C10BBC2277CD4B48BC25FC1BDFC68620FFD9000000000198544140420F0000000000485314A10400000098223AF34A98119217DC2427C6DE7F577A33D8242A2F54C30B0000000000000000476F6F64206C75636B21
{
  'number of Signing': 10000,
  'timeV2(ms)': 87269.98762500286,
  'timeV3(ms)': 2027.1041249930859,
  'V3 Faster than V2': 'x43'
}
```

## その他

- WASM化されているのは署名処理なので、厳密にはトランザクション作成処理をループに入れるべきではなかったかもしれません。
- とはいえ、同じ内容のトランザクションに1回以上署名するというシチュエーションは考えられません。
- 宛先やメッセージが動的に変化するトランザクションを大量に送信するシチュエーションを想定した、ということで。

