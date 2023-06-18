import { Address, Account, Deadline, NetworkType, PlainMessage, TransferTransaction, UInt64 } from 'symbol-sdk-v2';

export function createAndSignTx(key) {
  const account = Account.createFromPrivateKey(key, NetworkType.TEST_NET);
  const adjustEpoch = 1667250467 * 1000;
  const dlEpoch = (new Date(2023, 5, 19, 9, 0, 0)).getTime();
  const symbolTime = (dlEpoch - adjustEpoch);
  const recipientAddress = Address.createFromRawAddress('TARDV4-2KTAIZ-EF64EQ-T4NXT7-K55DHW-BEFIXV-JQY');

  const transferTransaction = TransferTransaction.create(
    Deadline.createFromAdjustedValue(symbolTime),
    recipientAddress,
    [],
    PlainMessage.create('Good luck!'),
    NetworkType.TEST_NET,
    UInt64.fromUint(1_000_000)
  );

  const signedTransaction = account.sign(transferTransaction, "49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4");
  return signedTransaction;
}
