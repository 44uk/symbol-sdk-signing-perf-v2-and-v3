import sdk from 'symbol-sdk';

const facade = new sdk.facade.SymbolFacade("testnet");

export function createAndSignTx(key) {
  const privateKey = new sdk.PrivateKey(key);
  const keyPair = new facade.constructor.KeyPair(privateKey);
  const deadline = facade.network.fromDatetime(new Date(2023, 5, 19, 9, 0, 0)).timestamp;

  const transaction = facade.transactionFactory.create({
    type: 'transfer_transaction_v1',
    signerPublicKey: keyPair.publicKey.toString(),
    fee: 1_000_000n,
    deadline,
    recipientAddress: 'TARDV4-2KTAIZ-EF64EQ-T4NXT7-K55DHW-BEFIXV-JQY'.replace(/-/g, ''),
    mosaics: [],
    message: 'Good luck!'
  });
  // compat for SDK V2 message
  transaction.message = new Uint8Array([0, ...transaction.message]);

  const signature = facade.signTransaction(keyPair, transaction);
  return facade.transactionFactory.constructor.attachSignature(transaction, signature);
}

