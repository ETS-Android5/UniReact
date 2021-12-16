using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace uniReact
{

    public class Receiver : MonoBehaviour
    {
#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")]
        private static extern void onUnityMessage(string message);
#endif
        public static Receiver Instance { get; private set; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void OnBeforeSceneLoadRuntimeMethod()
        {
                GameObject go = new GameObject("UniReact_Receiver");
                DontDestroyOnLoad(go);
                Instance = go.AddComponent<Receiver>();
        }

        void onRNMessage(string message)
        {
            //Debug.Log("Manager onRNMessage" + message);
            //Debug.Log( message);
            if (message.StartsWith(Constants.MessagePrefix))
            {
                message = message.Replace(Constants.MessagePrefix, "");
            }
            else
            {
                return;
            }
            
            MessageHandler handler = MessageHandler.Deserialize(message);
            //Debug.Log(handler.seq + " - " + handler.name + " - " + handler.getData<string>());
            if ("end".Equals(handler.seq))
            {
                // handle callback message
                UniReactMessage m;
                if (CallbackManager.waitCallbackMessageMap.TryGetValue(handler.id, out m))
                {
                    CallbackManager.waitCallbackMessageMap.Remove(handler.id);
                    if (m.callBack != null)
                    {
                        m.callBack(handler.getData<object>());
                    }
                }
                return;
            }
            //Debug.Log("Manager onRNMessage");
            if (handler.name == "setXRotation") {
                GameObject.Find("Cube").GetComponent("cube").SendMessage("setXRotation", handler.getData<string>());
                handler.reply("X Rotation set !");
            }
            if (handler.name == "setYRotation")
            {
                GameObject.Find("Cube").GetComponent("cube").SendMessage("setYRotation", handler.getData<string>());
                handler.reply("Y Rotation set !");
            }
            if (handler.name == "setZRotation")
            {
                GameObject.Find("Cube").GetComponent("cube").SendMessage("setZRotation", handler.getData<string>());
                handler.reply("Z Rotation set !");
            }
        }


    }
    
}
