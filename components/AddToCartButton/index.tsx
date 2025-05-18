import { useCartStore } from "@/hooks/useCartStore";
import { useProductStore } from "@/hooks/useProductStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AddToCartButton = ({ productId }: { productId: number }) => {
  const { cart, addToCart, decrementToCart } = useCartStore();
  const { products } = useProductStore();

  const content = cart.has(productId) ? (
    <View style={styles.row}>
      <Pressable onPress={() => addToCart(products.get(productId))}>
        <Text style={styles.text}>+</Text>
      </Pressable>
      <Text style={[styles.text, { marginLeft: 10, marginRight: 10 }]}>
        {cart.get(productId)?.quantity ?? 0}
      </Text>
      <Pressable onPress={() => decrementToCart(productId)}>
        <Text style={styles.text}>-</Text>
      </Pressable>
    </View>
  ) : (
    <Pressable
      style={styles.row}
      onPress={() => addToCart(products.get(productId))}
    >
      <Ionicons name="cart-outline" size={20} color="white" />
      <Text style={styles.text}>Add to cart</Text>
    </Pressable>
  );
  return <View style={styles.container}>{content}</View>;
};

export default AddToCartButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    alignSelf: "flex-start",
    padding: 10,
    // position: "absolute",
    // bottom: 0,
    // left: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    marginLeft: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
