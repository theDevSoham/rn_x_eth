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
import axios from 'axios';
import Loader from '../components/Loader';

const Home: React.FC = () => {
  const [pvtKey, setPvtKey] = useState('');
  const [sendAddr, setSendAddr] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('pending');

  const clearInputs = (): void => {
	setPvtKey('');
	setSendAddr('');
	setAmount('');
  };

  const handleSubmit = () => {
    if (pvtKey === '' || sendAddr === '' || amount === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
	setIsLoading(true);
	setStatus('pending');
    let data = JSON.stringify({
      senderKey: pvtKey,
      to: sendAddr,
      amount: amount,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://rnxeth.onrender.com/send',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
		setIsLoading(false);
		setStatus('completed');
        Alert.alert(
          'Success',
          'Transaction sent successfully with hash: ' + response,
        );
		clearInputs();
      })
      .catch(error => {
		setIsLoading(false);
		setStatus('failed');
        console.log(error);
      });
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
