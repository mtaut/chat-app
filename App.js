import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens we want to navigate:
import Start from "./components/Start";
import Chat from "./components/Chat";

// create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// this is the App's main component that renders the chat UI
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyA04V6TWAyjF63dUnw8Z9UFtiOpJarZHgs",
    authDomain: "chat-app-b3f36.firebaseapp.com",
    projectId: "chat-app-b3f36",
    storageBucket: "chat-app-b3f36.appspot.com",
    messagingSenderId: "1089360636484",
    appId: "1:1089360636484:web:de812bb70a2d800de62a11",
  };

  // initialize Firebase
  const app = initializeApp(firebaseConfig);

  // initialize Cloud Firestore and get reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
