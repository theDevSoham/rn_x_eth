/* eslint-disable prettier/prettier */
import {Buffer} from 'buffer';

export async function sendTransaction(
  senderAddress: string,
  senderPrivateKey: string,
  receiverAddress: string,
  amount: number,
) {
  // Construct the JSON-RPC payload
  const payload = {
    from: senderAddress,
    to: receiverAddress,
    value: `0x${Number(amount).toString(16)}`,
    gasPrice: '21000',
  };

  // Encode the payload as JSON and convert it to hex
  const json = JSON.stringify(payload);
  const hex = Buffer.from(json).toString('hex');

  // Construct the HTTP request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"jsonrpc":"2.0","id":1,"method":"eth_sendRawTransaction","params":["0x${hex}"]}`,
  };

  // Send the HTTP request to Infura endpoint
  const response = await fetch(
    'https://sepolia.infura.io/v3/3e71c39f476040a498217bd8ddac375f',
    options,
  );
  const result_1 = await response.json();
  console.log('Result: ', result_1);
  return result_1.result;
}
