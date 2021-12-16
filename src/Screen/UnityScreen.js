import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import  {UnityView,
  unityModule,
} from '../components/UnityView';
import Slider from '@react-native-community/slider';

function UnityScreen(props) {
  const [lastUnityMessage, setLastUnityMessage] = useState();
  const handleChange = func => value => {
    // console.log('send', func, value);
    unityModule.sendMessage(func,`${value}`, (data) => console.log("UNIREACT - Callback in RN :" + data));
    // else unityModule.callGameObjecttMethod('Cube', func, `${value}`)
    
  };

  const onUnityMessage = hander => {
    // console.log('onUnityMessage', hander);
    setLastUnityMessage(JSON.stringify(hander, null, 2));
    setTimeout(() => {
      hander.reply('I am click callback!');
    }, 2000);
  };
  const onMessage = message => console.log('onMessage', message);

  return (
    // <View style={styles.container}>
    <UnityView
      style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      onUnityMessage={onUnityMessage}
      onMessage={onMessage}>
      <View style={styles.commandPanel}>
        <View>
          <Text style={styles.text}>X</Text>
          <Slider
            minimumValue={0}
            step={1}
            maximumValue={10}
            onValueChange={handleChange('setXRotation')}
          />
        </View>

        <View>
          <Text style={styles.text}>Y</Text>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={1}
            onValueChange={handleChange('setYRotation')}
          />
        </View>
        <View>
          <Text style={styles.text}>Z</Text>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={1}
            onValueChange={handleChange('setZRotation')}
          />
        </View>
        <View style={{ height: 300 }}>
          <Text style={styles.unityLog}>{lastUnityMessage}</Text>
        </View>
      </View>
    </UnityView>
    // </View>
  );
}

UnityScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    backgroundColor: 'red',
  },
  commandPanel: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: 300,
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  unityLog: {
    height: 150,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    marginTop: 10,
  },
});
export default UnityScreen;
