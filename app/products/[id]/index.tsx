import AddToCartButton from "@/components/AddToCartButton";
import PriceTag from "@/components/PriceTag";
import { windowWidth } from "@/constants";
import { useProductStore } from "@/hooks/useProductStore";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";

const ProductView = () => {
  const { id } = useLocalSearchParams();
  const { products } = useProductStore();

  const { title, description, rating, price, image } = products.get(Number(id));
  return (
    <ScrollView
      className="p-4"
      contentContainerStyle={{ backgroundColor: "#fff", flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
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
      </View>
      <Image
        source={image}
        style={{ width: windowWidth, height: 500 }}
        contentFit="cover"
      />
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={{ fontSize: 15 }}>{description}</Text>
      </View>

      <AddToCartButton productId={Number(id)} />
      <PriceTag price={price} />
    </ScrollView>
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
});
