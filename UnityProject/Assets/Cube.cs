using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;
using uniReact;

public class Cube : MonoBehaviour
{
    private int clickCount = 0;
    private int rotateX = 0;
    private int rotateY = 0;
    private int rotateZ = 0;

    private static Color[] colors = { Color.white, Color.blue, Color.grey, Color.red, Color.black };
    private int CurrentColorIndex = 0;


    void setXRotation(string val)
    {
        //Debug.Log("setXRotation:" + val);
        rotateX = int.Parse(val);
    }

    void setYRotation(string val)
    {
        //Debug.Log("setYRotation:" + val);
        rotateY = int.Parse(val);
    }

    void setZRotation(string val)
    {
        //Debug.Log("setZRotation:" + val);
        rotateZ = int.Parse(val);
    }

    void OnMouseDown()
    {
        Debug.Log("click");
        CurrentColorIndex = (CurrentColorIndex+1) % 5;
        clickCount++;
        GetComponent<Renderer>().material.color = colors[CurrentColorIndex];
        Emiter.Instance.SendMessage(new UniReactMessage(){
            name = "click",
            data = JObject.FromObject(
                new {
                    colors = colors[CurrentColorIndex].ToString() ,
                    clickCount = clickCount 
            }),
            callBack = (data) =>{
                Debug.Log("UNIREACT - Callback in unity :" + data);
            }
        });
    }


    // Update is called once per frame
    void Update()
    {
        transform.Rotate(rotateX, rotateY, rotateZ);
    }
}
