/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  View,
  Image,
} from 'react-native';
import bg_img from '../assets/images/bg_img.jpg';
import Loader from '../components/Loader';
import { Buffer } from 'buffer';

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
        gasPrice: '21000',
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



const Home: React.FC = () => {
  const [pvtKey, setPvtKey] = useState('');
  const [sendAddr, setSendAddr] = useState('');
  const [senderAddr, setSenderAddr] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('pending');

  const clearInputs = (): void => {
    setPvtKey('');
    setSendAddr('');
    setAmount('');
    setSenderAddr('');
  };

  const handleSubmit = async () => {
    if (pvtKey === '' || sendAddr === '' || amount === '' || senderAddr === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setIsLoading(true);
    setStatus('pending');
    try {
      const txHash = await sendTransaction(
        sendAddr,
        pvtKey,
        senderAddr,
        Number(amount),
      );
      setIsLoading(false);
      setStatus('success');
      Alert.alert('Transaction Sent', `Transaction hash: ${txHash}`);
      clearInputs();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setStatus('error');
      Alert.alert('Error', 'Failed to send transaction');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={bg_img} style={styles.img} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Sender Private Key"
        placeholderTextColor={'#fff'}
        value={pvtKey}
        onChangeText={setPvtKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Address to Send to"
        placeholderTextColor={'#fff'}
        value={sendAddr}
        onChangeText={setSendAddr}
      />
      <TextInput
        style={styles.input}
        placeholder="Sender Address"
        placeholderTextColor={'#fff'}
        value={senderAddr}
        onChangeText={setSenderAddr}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor={'#fff'}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {isLoading && <Loader status={status} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#fff',
  },
  button: {
    backgroundColor: '#1a73e8',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  img: {width: 100, height: '100%'},
  imgContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
