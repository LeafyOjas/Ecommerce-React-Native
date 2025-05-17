import React from "react";
import { ActivityIndicator, View } from "react-native";
const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator
        size="large"
        color="#b30086"
        style={{ transform: [{ scale: 2 }] }}
      />
    </View>
  );
};

export default Loader;
