import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { firestore } from "../../firebase/config";

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");

  const addComment = async (id) => {
    const data = await firestore.collection("posts").doc(id).get();
    await firestore
      .collection("posts")
      .doc(route.params.item.id)
      .update({
        comments: [...data.data().comments, comment],
      });
  };

  return (
    <View style={styles.container}>
      <Text>COMMENTS</Text>
      <TextInput placeholder="type smth" onChangeText={setComment} />
      <Button title="send comment" onPress={addComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
