import Loader from "@/components/Loader";
import PriceTag from "@/components/PriceTag";
import { baseApi, windowWidth } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { Image } from "expo-image";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";

export default function Index() {
  const { loading, data } = useFetch(`${baseApi}products`);
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={loading ? <Loader /> : <Text>No data found</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image
            source={item?.image}
            contentFit="contain"
            style={styles.image}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              maxHeight: 40,
            }}
          >
            <Rating
              type="star"
              ratingCount={5}
              imageSize={15}
              startingValue={item?.rating?.rate}
              readonly
            />
            <Text style={{ fontSize: 12, marginLeft: 4 }}>
              ({item?.rating?.rate})
            </Text>
          </View>
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {item?.title}
          </Text>
          <PriceTag price={item?.price} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffe6e6",
    opacity: 0.8,
    flexGrow: 1,
  },
  item: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccccb3",
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    position: "relative",
    // paddingBottom: 36,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 10,
  },
  image: {
    width: windowWidth / 2 - 20,
    height: 150,
    backgroundColor: "white",
  },
});
