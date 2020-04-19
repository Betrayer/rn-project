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
import { FlatList } from "react-native-gesture-handler";

export default function CreateScreen() {
  const { userId, userName } = useSelector((state) => state.user);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [takeAPicture, setTakeAPicture] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      // console.log("status", status);
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
    const uniqueName = Date.now().toString();
    await storage.ref(`image/${uniqueName}`).put(file);
    const url = await storage.ref("image").child(uniqueName).getDownloadURL();
    console.log("url", url);
    sendPost(url);
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

  const sendPost = async (img) => {
    await firestore.collection("posts").add({
      image: img,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      userId,
      userName,
      likes: 0,
    });
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Snap" onPress={snap} /> */}
      {photo ? (
        <View style={styles.pictureTakenWrapper}>
          <Image source={{ uri: photo }} style={styles.pictureTaken} />
          <Button title="Send" onPress={sendPost} />
        </View>
      ) : (
        <View style={styles.cameraWrapper}>
          <View style={styles.cameraWindow}>
            <Camera
              ref={(ref) => setTakeAPicture(ref)}
              style={{ width: "100%", height: "90%" }}
              type={type}
            ></Camera>
          </View>

          <View style={styles.cameraButtonsWrapper}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text>SWITCH</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={snap}>
              <Text>SNAP</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  cameraWrapper: {
    height: "100%",
    width: "100%",
    // alignItems: 'center'
  },
  cameraWindow: {
    // flexDirection: 'row',
    justifyContent: "center",
  },
  cameraButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cameraButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  pictureTaken: {
    width: "100%",
    height: "100%",
  },
  pictureTakenWrapper: {
    width: "100%",
    height: "80%",
  },
});
