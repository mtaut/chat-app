import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Select image from library",
      "Take a picture",
      "Send location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occured while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      console.log("File has been uploaded successfully");
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel="More options"
      accessibilityHint="Allows you to send an image or your geolocation."
      style={styles.container}
      onPress={onActionPress}
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    bordercolor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
