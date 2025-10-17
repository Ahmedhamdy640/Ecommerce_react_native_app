import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Product } from "../types/ProductType";
import { Ionicons } from "@expo/vector-icons";
import { useDeleteProduct } from "../hooks/useProducts";
interface ProductCardProps {
  data: Product;
  isAdmin?: boolean;
  handleDelete?: (productId: number) => void;
}
const ProductCard = ({ data, isAdmin, handleDelete }: ProductCardProps) => {
  const onPressDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDelete?.(data.id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {isAdmin && (
        <TouchableOpacity style={styles.removeIcon} onPress={onPressDelete}>
          <Ionicons name="trash" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
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
    zIndex: 999,
  },
  icon: {
    zIndex: 999,
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
