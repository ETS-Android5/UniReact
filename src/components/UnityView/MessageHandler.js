import { NativeModules } from 'react-native';
const { UnityModule } = NativeModules;

export const UnityMessagePrefix = '@UnityMessage@';

export const  waitCallbackMessageMap = new Map();

let sequence = 0;
export function generateId() {
    sequence = sequence + 1;
    return sequence;
}

export function isUnityMessage(message) {
    if (message.startsWith(UnityMessagePrefix)) {
        return true;
    } else {
        return false;
    }
}

export function deserialize (message) {
    if (!isUnityMessage(message)) {
        throw new Error(`"${message}" is't an UnityMessage.`);
    }
    message = message.replace(UnityMessagePrefix, '');
    const m = JSON.parse(message);
    const handler = new MessageHandler();
    handler.id = m.id;
    handler.seq = m.seq;
    handler.name = m.name;
    handler.data = m.data;
    return handler;
}
export default class MessageHandler {
    constructor() {
    }

    reply(data) {
        UnityModule.postMessage('UniReact_Receiver', 'onRNMessage', UnityMessagePrefix + JSON.stringify({
            id: this.id,
            seq: 'end',
            name: this.name,
            data: data
        }));
    }
}

export function handleMessage(message) {
    if (isUnityMessage(message)) {
        const handler = deserialize(message);
        console.log('handler',handler )
        if (handler.seq === 'end') {
            // handle callback message
            const m = waitCallbackMessageMap[handler.id];
            delete waitCallbackMessageMap[handler.id];
            if (m && m.callback != null) {
                m.callback(handler.data);
            }
            return;
        } else {
            return handler;
        }
    } else {
        return message;
    }
}