/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {Buffer} from 'buffer';

async function sendTransaction(
  senderAddress: string,
  senderPrivateKey: string,
  receiverAddress: string,
  amount: number,
) {
  // Construct the JSON-RPC payload
  const payload = {
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [
      {
        from: senderAddress,
        to: receiverAddress,
        value: `0x${Number(amount).toString(16)}`,
      },
    ],
    id: 1,
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

export default function App() {
  const [senderAddress, setSenderAddress] = useState('');
  const [senderPrivateKey, setSenderPrivateKey] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');

  async function handleSend() {
    try {
      const txHash = await sendTransaction(
        senderAddress,
        senderPrivateKey,
        receiverAddress,
        Number(amount),
      );
      Alert.alert('Transaction Sent', `Transaction hash: ${txHash}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send transaction');
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Sender Address"
        value={senderAddress}
        onChangeText={setSenderAddress}
      />
      <TextInput
        placeholder="Sender Private Key"
        value={senderPrivateKey}
        onChangeText={setSenderPrivateKey}
      />
      <TextInput
        placeholder="Receiver Address"
        value={receiverAddress}
        onChangeText={setReceiverAddress}
      />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}
