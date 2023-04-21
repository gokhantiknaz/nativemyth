 import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  View,
} from "react-native";
import Button_1 from "../components/button1";
import { db, collection, addDoc  } from "../firebase/firebase-utilities";

const CreateChat = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [responseRecieve, setresponseRecieve] = useState(false);

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleChatSubmit = async () => {
    setresponseRecieve(true)
    if (inputText === "") {
      setresponseRecieve(false);
      return;
    }
   


    try {
      const response = await fetch(
        "https://openai80.p.rapidapi.com/chat/completions",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "673f8f817cmsh332d89277fd83b7p1e7383jsnd9d06adb3202",
            "X-RapidAPI-Host": "openai80.p.rapidapi.com",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputText }],
          }),
        }
      );
      const json = await response.json();
      if (
        json.choices &&
        json.choices.length > 0 &&
        json.choices[0].message &&
        json.choices[0].message.content
      ) {
        setResponseText(json.choices[0].message.content);
        setresponseRecieve(false)

        /////// Making Collection ////////
          try {
            const docRef = await addDoc(collection(db, "conversation"), {
              response:  responseText
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        /////// Making Collection ////////

      } else {
        console.error("Invalid response format:", json);
      }
    } catch (error) {
      console.error(error);
    }

    setInputText("");
  };

  return (
    <View style={styles.container}>
      

      <ScrollView style={{width: '100%'}} >

        <View style={styles.container1} >
          { responseText !== "" && (
            <Text style={styles.responseText}>Response: {responseText}</Text>
          )}
        </View>

        { responseRecieve == true ? (
            <ActivityIndicator size="large" color="#20DF7F" />
        ) : (
          <View />
        )}

        

        <View style={styles.container2}>

          <TextInput
            style={styles.input}
            onChangeText={handleInputChange}
            value={inputText}
            placeholder="Enter a message"
            placeholderTextColor={'#ffffff'}

            
          />

        <View style={styles.container3} >
          <Button_1 title="Submit" onPress={handleChatSubmit} />
        </View>


        </View>
      </ScrollView>




       
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "8%",
    paddingTop: "12%",
    backgroundColor: "#ffffff",
  },
  container1:{
    width: "100%",
    paddingTop: "40%",
  },
  container2:{
    width: "100%",
    paddingVertical:"50%"

  },
  container3:{
    width: "100%",
    // paddingVertical:"2%"
  },
  safeArea: {
    width: "100%",
    padding: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: "#224957",
    fontSize: 18,
    color: "#ffffff",
  },
  responseText: {
    paddingHorizontal: '8%',
    fontSize: 18,
    color: "#224957"
  },
});

export default CreateChat;