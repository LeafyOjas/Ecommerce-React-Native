import React from "react";
import { StyleSheet, Text } from "react-native";

const PriceTag = ({ price }: { price: string }) => {
  return <Text style={styles.priceTag}>₹ {price}</Text>;
};

export default PriceTag;

const styles = StyleSheet.create({
  priceTag: {
    backgroundColor: "#ff80b3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: "auto",
    color: "#fff",
    minWidth: 60,
    marginRight: 4,
    marginBottom: 4,
    textAlign: "center",
  },
});
