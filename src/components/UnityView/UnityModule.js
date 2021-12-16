import { NativeModules, DeviceEventEmitter } from 'react-native';
import { generateId, UnityMessagePrefix, waitCallbackMessageMap } from './MessageHandler';

const { UnityModule } = NativeModules;
class UnityModuleClass {
    callGameObjecttMethod(gameObject, methodName, message) {
        // console.log('callGameObjecttMethod')
        UnityModule.postMessage(gameObject, methodName, message);
    }
    sendMessage(name, data, callback) {
        const id = generateId();
            if (callback) {
                waitCallbackMessageMap[id] = {callback};
            }
        // console.log('sendMessage')
        UnityModule.postMessage('UniReact_Receiver', 'onRNMessage', UnityMessagePrefix + JSON.stringify({
            id,
            seq: 'start',
            name: name,
            data: data,
            callback,
        }));
        // UnityModule.postMessage('UniReact_Receiver', 'onRNMessage', JSON.stringify(message));
    }
    addMessageListener(listener) {
        const id = this.getHandleId();
        this.stringListeners[id] = listener;
        this.unityMessageListeners[id] = listener;
        return id;
    }
}

export const unityModule = new UnityModuleClass();