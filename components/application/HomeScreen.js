import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "../../firebase/config";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const { userId, userPosts } = useSelector((state) => {
    return state.user;
  });

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    currentUser();
  }, []);

  useEffect(() => {
    getCollection();
  }, [userId]);

  const currentUser = async () => {
    const currentUser = await auth.currentUser;
    dispatch({
      type: "CURRENT_USER",
      payload: {
        userName: currentUser.displayName,
        userId: currentUser.uid,
      },
    });
  };

  const getCollection = async () => {
    if (!userId) {
      return;
    }
    // console.log("userId", userId);
    const data = await firestore
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) => setAllPosts(data.docs.map((doc) => doc.data())));
  };

  console.log("allPosts", allPosts);
  // console.log('user.displayName', user.displayName)

  const logOut = async () => {
    await auth.signOut();
    dispatch({ type: "USER_SIGNED_OUT" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}></View>
      <FlatList
        data={allPosts}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => {
          // console.log("post", item);
          return (
            <View style={styles.postWrapper}>
              <Image
                style={styles.postImage}
                // style={{
                //   width: 350,
                //   height: 200,
                //   marginBottom: 10,
                //   borderRadius: 10,
                // }}
                source={{ uri: item.image }}
              />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
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
    borderTopRightRadius: 20
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
