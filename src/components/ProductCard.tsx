import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProductType } from "../types/ProductType";
import { Ionicons } from "@expo/vector-icons";
import { useCurrentUser } from "../hooks/useAuth";
import { SUPER_ADMI_USERNAME } from "../constants";

interface ProductCardProps {
  data: ProductType;
}
const ProductCard = ({ data }: ProductCardProps) => {
  const { data: currentUser } = useCurrentUser();

  const isAdmin = currentUser?.username === SUPER_ADMI_USERNAME;
  return (
    <View style={styles.container}>
      {isAdmin && (
        <Pressable style={styles.removeIcon} onPress={() => {}}>
          <Ionicons name="trash" size={24} color="red" />
        </Pressable>
      )}
      <View>
        <Image
          source={{ uri: data.thumbnail }}
          style={{ width: "100%", height: 120, resizeMode: "contain" }}
        />
        <Text numberOfLines={2}>{data.title}</Text>
      </View>
      <View>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>{data.price} $</Text>
          <View style={styles.infoContainer}>
            <Ionicons name="star" size={16} color="gold" />
            <Text style={[styles.ratingText, styles.boldText]}>
              {data.rating}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>{data.category}</Text>
          <Text>{data.availabilityStatus}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "45%",
    margin: 10,
    padding: 10,
    paddingTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 245,
    justifyContent: "space-between",
  },
  removeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 1,
  },
  boldText: {
    fontWeight: "bold",
  },
  ratingText: {
    marginLeft: 4,
  },
});
