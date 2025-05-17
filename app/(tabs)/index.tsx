import Loader from "@/components/Loader";
import PriceTag from "@/components/PriceTag";
import { baseApi, windowWidth } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { useProductStore } from "@/hooks/useProductStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";

const router = useRouter();

export default function Index() {
  const { setAllProducts } = useProductStore();
  const { loading, data } = useFetch(`${baseApi}products`, (data) =>
    setAllProducts(data)
  );
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      style={{ flex: 1 }}
      ListHeaderComponent={() => (
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            padding: 16,
            color: "#000",
          }}
        >
          Products
        </Text>
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={loading ? <Loader /> : <Text>No data found</Text>}
      renderItem={({ item }) => (
        <View
          style={styles.item}
          onTouchEnd={() => {
            router.push({
              pathname: "/products/[id]" as any,
              params: { id: item.id.toString() },
            });
          }}
        >
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
    paddingTop: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccccb3",
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    position: "relative",
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
    width: windowWidth / 2 - 40,
    height: 120,
    backgroundColor: "white",
    alignSelf: "center",
  },
});
