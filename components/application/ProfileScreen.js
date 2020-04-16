import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { firestore } from "../../firebase/config";

export default function ProfileScreen() {
  const logOut = async () => {
    await auth.signOut();
  };

  const { userId } = useSelector((state) => state.user);

  const [currentUserPosts, setCurrentUserPosts] = useState([]);

  useEffect(() => {
    getCurrentCollection();
  }, [userId]);

  const getCurrentCollection = async () => {
    if (!userId) {
      return;
    }
    // console.log("userId", userId);
    const data = await firestore
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setCurrentUserPosts(data.docs.map((doc) => doc.data()))
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.exitWrapper}>
        <Text>Profile</Text>
        <TouchableOpacity>
          <Ionicons
            style={styles.exit}
            name="md-exit"
            size={35}
            color={"#3f9bc1"}
            onPress={logOut}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <FlatList
          data={currentUserPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            // console.log("post", item);
            return (
              <View style={styles.postWrapper}>
                <Image style={styles.postImage} source={{ uri: item.image }} />
                <View style={styles.commentWrapper}>
                  <Text>Comments:</Text>
                  <Text style={styles.commentText}>
                    {item.userName}: {item.comment}
                  </Text>
                </View>
              </View>
            );
          }}
        />
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
  wrapper: {
    marginTop: 40,
    flexDirection: "row",
    width: 380,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: '#f4511e'
  },
  postImage: {
    width: 360,
    height: 220,
    borderTopRightRadius: 20,
  },
  postWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  commentWrapper: {
    width: 360,
    flexDirection: "column",
  },
});
