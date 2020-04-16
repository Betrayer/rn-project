import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { firestore, storage } from "../../firebase/config";

export default function CreateScreen() {
  const { userId, userName } = useSelector((state) => state.user);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [takeAPicture, setTakeAPicture] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      console.log("status", status);
    })();
  }, []);

  const snap = async () => {
    if (takeAPicture) {
      let photo = await takeAPicture.takePictureAsync();
      console.log("photo", photo);
      setPhoto(photo.uri);
      uploadFile(photo.uri);
    }
  };

  const uploadFile = async (img) => {
    const response = await fetch(img);
    const file = await response.blob();
    const fileUploaded = await storage
      .ref(`image/${"someRandomButt"}`)
      .put(file);
    fileUploaded.on(
      "state_changed",
      () => {},
      () => {},
      async () => {
        const url = await storage
          .ref("image")
          .child("someRandomButt")
          .getDownloadURL();
        console.log("url", url);
      }
    );
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  const sendPost = async () => {
    await firestore.collection("posts").add({
      image: photo,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      userId,
      userName,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.exitWrapper}>
        <Text>Create and share your post</Text>
        <TouchableOpacity>
          <Ionicons
            name="ios-aperture"
            size={35}
            color={"#3f9bc1"}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </TouchableOpacity>
      </View>
      <Camera
        ref={(ref) => setTakeAPicture(ref)}
        style={{ width: 300, height: 300 }}
        type={type}
      ></Camera>
      {photo ? (
        <Image source={{ uri: photo }} style={{ width: 300, height: 300 }} />
      ) : (
        <></>
      )}
      <Button title="Snap" onPress={snap} />
      <Button title="Send" onPress={sendPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  exitWrapper: {
    marginTop: 40,
    flexDirection: "row",
    width: 380,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
