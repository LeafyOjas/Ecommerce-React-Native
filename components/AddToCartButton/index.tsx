import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AddToCartButton = () => {
  return (
    <Pressable>
      <View style={styles.container}>
        <Ionicons name="cart-outline" size={20} color="white" />

        <Text style={styles.text}>Add to cart</Text>
      </View>
    </Pressable>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    alignSelf: "flex-start",
    padding: 10,
    position: "absolute",
    bottom: -30,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    marginLeft: 6,
  },
});
