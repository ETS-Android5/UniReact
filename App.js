
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import UnityScreen from './src/Screen/UnityScreen';
import RNScreen from './src/Screen/RNScreen';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "blue" : "yellow",
    dispplay: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  return (
    <NavigationContainer>
    {/* <SafeAreaView style={backgroundStyle}> */}
    <StatusBar  />
    {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="ReactNative" component={RNScreen} />
        <Stack.Screen name="Unity" component={UnityScreen}/>
      </Stack.Navigator> */}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="ReactNative" component={RNScreen} />
        <Drawer.Screen name="Unity" component={UnityScreen}/>
      </Drawer.Navigator>
    {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
