import React from 'react'

import {FlatList, View, Image} from 'react-native'

<FlatList
        data={allPosts}
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