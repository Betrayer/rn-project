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

  const { userId, userName, userAvatar } = useSelector((state) => state.user);

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
      <View style={styles.exitWrapper}>
        <Text style={styles.profile}>Signed as {userName}</Text>
        <TouchableOpacity>
          <Ionicons
            style={styles.exit}
            name="md-exit"
            size={35}
            color={"#1E90FF"}
            onPress={logOut}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profileImageWrapper}>
        <Image style={styles.profileImage} source={{ uri: userAvatar }} />
        <Text style={styles.profileName}></Text>
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
                {/* <View style={styles.commentWrapper}>
                  <Text>Comments:</Text>
                  <Text style={styles.commentText}>
                    {item.userName}: {item.comment}
                  </Text>
                </View> */}
                <View style={styles.commentWrapper}>
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
                    <TouchableOpacity style={styles.commentsButton}>
                      <Text style={styles.buttonText}>Show comments</Text>
                    </TouchableOpacity>
                  </View>
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
    // marginTop: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: "flex-end",
    backgroundColor: "#f4511e",
    height: 70,
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
  profile: {
    color: "#FFF",
    fontSize: 20,
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
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: 50,
    justifyContent: "space-around",
  },
  profileImageWrapper: {
    alignItems: "center",
    height: 150,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  profileName: {
    fontSize: 16,
    padding: 20,
  },
});
