/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import bg_img from '../assets/images/bg_img.jpg';

const Home: React.FC = () => {
  const [pvtKey, setPvtKey] = useState('');
  const [sendAddr, setSendAddr] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (pvtKey === '' || sendAddr === '' || amount === '') {
      Alert.alert('Error','Please fill all fields');
      return;
    }
	Alert.alert('Submitted');
  };

  return (
    <ImageBackground source={bg_img} style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Sender Private Key"
        value={pvtKey}
        onChangeText={setPvtKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Address to Send to"
        value={sendAddr}
        onChangeText={setSendAddr}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
});

export default Home;
