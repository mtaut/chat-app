import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import screens we want to navigate:
import Start from "./components/Start";
import Chat from "./components/Chat";

// create the navigator
const Stack = createNativeStackNavigator();

// this is the App's main component that renders the chat UI
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
