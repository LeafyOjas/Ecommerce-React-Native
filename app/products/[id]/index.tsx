import AddToCartButton from "@/components/AddToCartButton";
import PriceTag from "@/components/PriceTag";
import { windowWidth } from "@/constants";
import { useProductStore } from "@/hooks/useProductStore";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";

const ProductView = () => {
  const { id } = useLocalSearchParams();
  const { products } = useProductStore();

  const { title, description, rating, price, image } = products.get(Number(id));
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="p-4"
        contentContainerStyle={{ backgroundColor: "#fff", flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={15}
                startingValue={rating?.rate}
                readonly
                style={{ marginRight: 10 }}
              />
              <Text style={styles.rating}>{rating.count} Reviews</Text>
            </View>
            <Link
              href="/(tabs)/cart"
              style={{
                textDecorationLine: "underline",
                color: "purple",
                fontWeight: 600,
              }}
            >
              Visit cart
            </Link>
          </View>
        </View>
        <Image
          source={image}
          style={{ width: windowWidth - 32, height: 400, alignSelf: "center" }}
          contentFit="contain"
        />
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 15 }}>{description}</Text>
        </View>

        <View style={styles.footer}>
          <AddToCartButton productId={Number(id)} />
          <PriceTag price={price} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    padding: 20,
  },
  rating: {
    fontSize: 14,
    textDecorationLine: "underline",
    fontWeight: 700,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
});
