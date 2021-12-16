using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace uniReact
{


#if UNITY_IOS || UNITY_TVOS
    public class NativeAPI
    {
        [DllImport("__Internal")]
        public static extern void unityToIos(string message);
    }
#endif

    public class Constants
    {
        public const string MessagePrefix = "@UnityMessage@";
    }

    public class CallbackManager
    {
        private static int ID = 0;

        public static int generateId()
        {
            ID = ID + 1;
            return ID;
        }

        public static Dictionary<int, UniReactMessage> waitCallbackMessageMap = new Dictionary<int, UniReactMessage>();

    }
    public class UniReactMessage
    {
        public String name;
        public JObject data;
        public Action<object> callBack;
    }

    
    public class MessageHandler
    {
        public int id;
        public string seq;

        public String name;
        private JToken data;

        public MessageHandler(int id, string seq, string name, JToken data)
        {
            this.id = id;
            this.seq = seq;
            this.name = name;
            this.data = data;
        }

        public static MessageHandler Deserialize(string message)
        {
            JObject m = JObject.Parse(message);
            MessageHandler handler = new MessageHandler(
                m.GetValue("id").Value<int>(),
                m.GetValue("seq").Value<string>(),
                m.GetValue("name").Value<string>(),
                m.GetValue("data")
            );
            return handler;
        }

        public T getData<T>()
        {
            return data.Value<T>();
        }


        public void reply(object data)
        {
            JObject o = JObject.FromObject(new
            {
                id = id,
                seq = "end",
                name = name,
                data = data
            });
            Emiter.Instance.SendMessageToRN(Constants.MessagePrefix + o.ToString());
        }
    }
}
