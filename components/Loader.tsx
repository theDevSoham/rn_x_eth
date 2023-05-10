/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

type LoaderProps = {
  status: 'pending' | 'completed' | 'failed' | string;
};

const Loader: React.FC<LoaderProps> = ({status}: LoaderProps) => {
  const [message, setMessage] = React.useState('Loading...');

  React.useEffect(() => {
    switch (status) {
      case 'pending':
        setMessage('Loading...');
        break;
      case 'completed':
        setMessage('Completed!');
        break;
      case 'failed':
        setMessage('Failed!');
        break;
      default:
        setMessage('Loading...');
    }
  }, [status]);

  return (
    <View style={styles.container}>
      {status === 'pending' && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {status !== 'pending' && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
	width: '100%',
	height: '100%',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 1,
	backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  message: {fontSize: 24, color: '#000'},
});

export default Loader;
