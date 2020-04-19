import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => (
  <View>
    <MapView showsUserLocation={true} style={styles.mapContainer}>
      <Marker
        coordinate={{
          latitude: route.params.info.location.latitude,
          longitude: route.params.info.location.longitude,
        }}
      ></Marker>
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: "100%",
  },
});
