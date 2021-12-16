import {
    NativeModules,
    Platform,
    NativeEventEmitter,
    DeviceEventEmitter,
  } from 'react-native';
  
  export default Platform.select({
    ios: NativeModules.UnityModule && new NativeEventEmitter(NativeModules.UnityModule),
    android: DeviceEventEmitter,
  });