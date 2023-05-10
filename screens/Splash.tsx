/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, ImageBackground} from 'react-native';
import bg_img from '../assets/images/bg_img.jpg';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

	setTimeout(() => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'Home' }],
		});
	}, 3000);
  }, [animation]);

  return (
    <ImageBackground source={bg_img} style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}>
        React Native {'\n'} X {'\n'} Ethereum
      </Animated.Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default Splash;
