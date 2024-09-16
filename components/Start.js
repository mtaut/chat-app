import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

// this is the landing/start screen
const Start = ({ navigation }) => {
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
          onPress={() =>
            navigation.navigate("Chat", {
              name: name,
              backgroundColor: backgroundColor,
            })
          }
        >
          <Text style={styles.buttonText}>Start a Chatty</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "88%",
    height: "44%",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 4,
    margin: 90, // adjusted this to 30 and looked good, but blocked the input bar when typing. Fix this when KeyboardAvoidingView is added...
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  appTitle: {
    marginBottom: "30%", // set the title to 60%-and liked it-but re-adjusted until KeyboardAvoidingView is added...
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
    marginTop: 10, // keeping this and borderRadius the same as the startButton marginBottom for consistency
  },
  startButton: {
    backgroundColor: "#757083",
    alignItems: "center",
    width: "88%",
    padding: 20,
    borderRadius: 4,
    marginBottom: 10,
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
    opacity: "100%",
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
