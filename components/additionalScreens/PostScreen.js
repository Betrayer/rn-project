import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../../firebase/config";

export const PostScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
        userAvatar: currentUser.photoURL,
      },
    });
  };

  const getCollection = async () => {
    if (!userId) {
      return;
    }
    // console.log("userId", userId);
    const data = await firestore.collection("posts").onSnapshot((data) =>
      setAllPosts(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      )
    );
  };

  const getCurrentUserPost = async (id) => {
    const data = await firestore.collection("posts").doc(id).get();
    // console.log("data.data", data.data());
    await firestore
      .collection("posts")
      .doc(id)
      .update({
        likes: Number(data.data().likes) + 1,
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}></View>
      <FlatList
        data={allPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // console.log("post", item);
          return (
            <TouchableOpacity
              style={styles.postWrapper}
              activeOpacity={0.7}
              onLongPress={() => navigation.navigate("Map", { info: item })}
            >
              <Image style={styles.postImage} source={{ uri: item.image }} />

              <View style={styles.commentWrapper}>
                {/* <Text>Comments:</Text> */}
                {/* <Text style={styles.commentText}>
                  {item.userName}: {item.comment}
                </Text> */}
                <View style={styles.commentsButtonWrapper}>
                  <View style={styles.likesWrapper}>
                    <TouchableOpacity>
                      <Ionicons
                        style={styles.exit}
                        name="ios-heart"
                        size={35}
                        color={"#FF0000"}
                        onPress={() => {
                          getCurrentUserPost(item.id);
                        }}
                      />
                    </TouchableOpacity>
                    <Text>{item.likes}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.commentsButton}
                    onPress={() => navigation.navigate("Comments")}
                  >
                    <Text style={styles.buttonText}>Show comments</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // backgroundColor: '#F5FFFA'
    // justifyContent: "center",
  },
  topHeader: {
    height: 50,
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
    borderRadius: 10,
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
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: 50,
    justifyContent: "space-around",
  },
  commentsButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 5,
  },
  commentsButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E90FF",
    width: 200,
    height: 30,
    borderRadius: 7,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});
