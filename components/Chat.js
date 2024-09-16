import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

// this is the chat screen
const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.welcomeText}>Welcome to Chatties!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "#FFFFFF",
  },
});

export default Chat;
