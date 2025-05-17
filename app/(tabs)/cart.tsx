import { useCartStore } from "@/hooks/useCartStore";
import { useProductStore } from "@/hooks/useProductStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";

const Cart = () => {
  const { getCartItems, getTotalPrice, cart, addToCart, decrementToCart } =
    useCartStore();
  const { products } = useProductStore();
  const cartItems = getCartItems();
  const totalPrice = getTotalPrice();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cartItems}
        numColumns={1}
        contentContainerStyle={{
          backgroundColor: "#fff",
          flexGrow: 1,
          padding: 16,
          paddingBottom: 80,
        }}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.header}>Your Cart</Text>
            <Pressable onPress={() => router.back()}>
              <Text
                style={{ fontWeight: "bold", textDecorationLine: "underline" }}
              >
                Go back
              </Text>
            </Pressable>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text>No Items added in the cart yet</Text>}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={item.image}
              style={styles.image}
              contentFit="contain"
            />
            <View style={styles.sbContainer}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={15}
                startingValue={item.rating?.rate}
                readonly
                style={{ alignSelf: "flex-start", marginTop: 4 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: 200,
                }}
              >
                <View style={[styles.row, styles.iconContainer]}>
                  <Pressable onPress={() => addToCart(products.get(item.id))}>
                    <Text style={styles.iconText}>+</Text>
                  </Pressable>
                  <Text
                    style={[
                      styles.iconText,
                      { marginLeft: 10, marginRight: 10 },
                    ]}
                  >
                    {cart.get(item.id)?.quantity ?? 0}
                  </Text>
                  <Pressable onPress={() => decrementToCart(item.id)}>
                    <Text style={styles.iconText}>-</Text>
                  </Pressable>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  ₹&nbsp;{item.quantity * item.price}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <View
        style={{
          padding: 32,
          backgroundColor: "#4d004d",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.footerText}>Order Total</Text>
        <Text style={styles.footerText}>₹&nbsp;{totalPrice}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    marginBottom: 20,
  },
  cartItem: {
    padding: 12,
    borderRadius: 10,
    borderRightWidth: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRightColor: "#ccc",
    marginBottom: 20,
    flexDirection: "row",
  },
  image: {
    height: 100,
    width: 100,
  },
  sbContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    width: 200,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomFooter: {},
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "flex-start",
  },
  iconContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#4d004d",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
