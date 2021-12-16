import React, { useEffect } from 'react';
import { requireNativeComponent, NativeEventEmitter } from 'react-native';
import eventEmitter from './eventEmiter'
import { handleMessage } from './MessageHandler';

  
const UnityViewNative = requireNativeComponent('UnityView');

export const UnityView =( {onUnityMessage, ...props}) => {
    useEffect(() => {
        if(eventEmitter) {

            const subscription = eventEmitter.addListener('UnityMessage', onUnityMessageReceived);
            return () => subscription.remove();
        }
    })
    const onUnityMessageReceived = (event) => {
        // console.log(event);
        const message = handleMessage(event)
        // console.log('message', message);
        if(message) onUnityMessage(message)
      }
    return <UnityViewNative {...props} />
}