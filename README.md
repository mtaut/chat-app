# React Native Mobile Chat App

A simple chat application built using React Native, with features for real-time messaging, custom UI options, and the ability for users to share images and their
location. The app uses Firebase integration for user authentication and data storage.

## Features

- **Real-time messaging:** send and receive messages instantly with the use of Firebase Firestore.

- **User Authentication:** authenticate users anonymously with Google Firebase authentication.

- **Customizable UI:** users can select a background color for their chat interface.

- **Additional Communication Features:** users have the ability to send images and location data.

- **Data storage:** data gets stored online and offline.

## Screens

1. **Start Screen:**

- Users can enter their name and select a chat background color.

- Provides access to the chat screen.

2. **Chat Screen:**

- Displays a real-time chat interface using `GiftedChat`.

- Users can send and receive text messages.

- Users can also pick and send images from the phone's image library.

- Users can send their location via the chat in a map view.

## Getting Started

### Technologies

- React Native

- Firebase

- GiftedChat

- Expo and Expo Go app

### Dependencies

- @react-native-async-storage/async-storage: ^1.24.0

- @react-navigation/native: ^6.1.18

- @react-navigation/native-stack: ^6.11.0

- expo: ^51.0.32

- expo-status-bar: ~1.12.1

- firebase: ^10.3.1

- react: 18.2.0

- react-native: 0.74.5

- react-native-get-random-values: ^1.11.0

- react-native-gifted-chat: ^2.6.3

- react-native-reanimated: ^3.10.1

- react-native-safe-area-context: 4.10.5

- react-native-screens: 3.31.1

## Setup Firebase

- Create a Firebase project in the Google Cloud Firebase Firestore console.

- Add Firebase credentials to project. These can be found in Firebase settings ---> General ---> SDK setup and configuration ---> const firebaseConfig = {};
