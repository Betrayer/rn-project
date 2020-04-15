import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { auth, firestore } from "../../firebase/config";

export default function HomeScreen() {
  const logOut = async () => {
    await auth.signOut();
  };

  const { userId, userName } = useSelector((state) => state.user);

  const addPost = async () => {
    await firestore.collection("posts").add({
      image:
        "https://lh3.googleusercontent.com/proxy/FKF3h2i6vxbXA2eGHvfyNAaQjovHGN096LjWhViGOzncrAOKgkLRmIjGblVpbpcuCo4au8rf_ZHiVEn1XX52BfmgzF5R3QFDkXRICglGVUnbmQ3zPMBNLtA9GS6v_w0cu9LPOe176PTjjbpaegXyjE__MZ74",
      comment: "Продается хорёк",
      likes: "700",
      userId: "034tatq5pnhM0oAHJcv7bnWL4w93",
      userName: "Вайф",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.exitWrapper}>
        <Text>Create and share your post</Text>
        <TouchableOpacity>
          <Ionicons
            name="ios-send"
            size={35}
            color={"#3f9bc1"}
            onPress={addPost}
          />
        </TouchableOpacity>
      </View>
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
