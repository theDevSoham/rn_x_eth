/* eslint-disable prettier/prettier */
import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CatchyStatusBar from './components/CatchyStatusBar';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Moralis from 'moralis';

Moralis.start({
  apiKey: 'RMr4ZX0Hz7Ei9JrfJasp7O0VUMe5BTDiuVsIjwmAfOOu4eMtqwkuW0ehuE84TvPG',
});

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <CatchyStatusBar backgroundColor="#a423c4" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
