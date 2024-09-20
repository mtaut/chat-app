import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

// this is the landing/start screen
const Start = ({ navigation }) => {
  // user sign-in logic to Firebase Database
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          backgroundColor: backgroundColor,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  // empty state to take name value
  const [name, setName] = useState("");
  // colors array and empty state for users to select for app background color of chat's UI
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const [backgroundColor, setBackgroundColor] = useState("");

  return (
    // will need to add KeyboardAvoidingView here
    <ImageBackground
      source={require("../img/background-image.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <Text style={styles.appTitle}>Chatties</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        <View style={styles.appColorContainer}>
          <Text style={styles.appColorText}>Choose a Background Color:</Text>
          <View style={styles.colorBtnContainer}>
            {/* map over colors array to render chat UI background color buttons */}
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.appColorBtn,
                  { backgroundColor: color },
                  backgroundColor === color && styles.selectedColor,
                ]}
                onPress={() => setBackgroundColor(color)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            if (name == "") {
              Alert.alert("Enter Your Name");
            } else {
              signInUser();
            }
          }}
        >
          <Text style={styles.buttonText}>Start a Chatty</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </ImageBackground>
  );
};

// start screen element styles
const styles = StyleSheet.create({
  container: {
    width: "88%",
    height: "44%",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 4,
    margin: 60, // adjusted this from 30, which seems to look best. adjusted again after adding KeyboardAvoidingView
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  appTitle: {
    marginBottom: "45%", // re-adjusted this with KeyboardAvoidingView, but it disappears anyway when typing name
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
    width: "88%",
    height: 60,
    padding: 15,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10, // keeping this close to startButton-marginBottom for consistency
  },
  startButton: {
    backgroundColor: "#757083",
    alignItems: "center",
    width: "88%",
    padding: 20,
    borderRadius: 4,
    marginBottom: 17, // moved this up from 10 (matching textInput marginTop) so full button can be viewed and pressed after entering name
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  appColorContainer: {
    width: "88%", // not adding a margin here
  },
  appColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1.0,
    margin: 10,
  },
  colorBtnContainer: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "center",
  },
  appColorBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#757083",
  },
});

export default Start;
