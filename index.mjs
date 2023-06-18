import { performance } from 'perf_hooks';

import { createAndSignTx as createAndSignTxByV2 } from './v2.mjs';
import { createAndSignTx as createAndSignTxByV3 } from './v3.mjs';

const numberOfSigning = 10_000;
const privateKey = "74DA0B32A121027CF6A8FA2AFAEED15C093B2DA948D54E9E1B0FF72795D7204B";

async function main() {
  // SDK V2で`numberOfSigning `回のトランザクション作成＆署名を行った場合。
  const startV2 = performance.now();
  for(let count = 0; count < numberOfSigning; count++) {
    const tx = createAndSignTxByV2(privateKey);
    if(count === 0) { console.info(tx.payload); }
  }
  const endV2 = performance.now();

  // SDK V3で`numberOfSigning `回のトランザクション作成＆署名を行った場合。
  const startV3 = performance.now();
  for(let count = 0; count < numberOfSigning; count++) {
    const tx = JSON.parse(createAndSignTxByV3(privateKey));
    if(count === 0) { console.info(tx.payload); }
  }
  const endV3 = performance.now();

  // それぞれの経過時間を計算
  const timeV2ms = endV2 - startV2;
  const timeV3ms = endV3 - startV3;

  return {
    "number of Signing": numberOfSigning,
    "timeV2(ms)": timeV2ms,
    "timeV3(ms)": timeV3ms,
    "V3 Faster than V2": `x${~~(timeV2ms / timeV3ms)}`
  };
}

main().then(_ => console.log(_)).catch(error => console.error(error));
