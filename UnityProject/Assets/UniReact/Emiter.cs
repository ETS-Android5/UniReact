using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace uniReact
{
    public class Emiter : MonoBehaviour
    {
        

        public static Emiter Instance { get; private set; }

        static Emiter()
        {
            GameObject go = new GameObject("UniReact_Emiter");
            DontDestroyOnLoad(go);
            Instance = go.AddComponent<Emiter>();
        }

        

        public void SendMessageToRN(string message)
        {
            //Debug.Log("SendMessageToRN0" + Application.platform + RuntimePlatform.IPhonePlayer);
            if (Application.platform == RuntimePlatform.Android)
            {
                using (AndroidJavaClass jc = new AndroidJavaClass("com.unireact.UnityUtils"))
                {
                    jc.CallStatic("onUnityMessage", message);
                }
            }
            else if (Application.platform == RuntimePlatform.IPhonePlayer)
            {
                //Debug.Log("SendMessageToRN");
#if UNITY_IOS && !UNITY_EDITOR
 //Debug.Log("SendMessageToRN 2");
                 NativeAPI.unityToIos(message);
#endif
            }
        }

        public void SendMessage(UniReactMessage message)
        {
            int id = CallbackManager.generateId();
            if (message.callBack != null)
            {
                CallbackManager.waitCallbackMessageMap.Add(id, message);
            }

            JObject o = JObject.FromObject(new
            {
                id = id,
                seq = message.callBack != null ? "start" : "",
                name = message.name,
                data = message.data
            });
            Instance.SendMessageToRN(Constants.MessagePrefix + o.ToString());
        }
    }

   
}
