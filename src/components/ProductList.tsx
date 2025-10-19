import { FlatList, FlatListProps } from "react-native";
import React from "react";
import { Product } from "../types/ProductType";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SUPER_ADMI_USERNAME } from "../constants";

interface Props extends Omit<FlatListProps<Product>, "data" | "renderItem"> {
  products: Product[];
  deleteProduct: (productId: number) => void;
}
export function ProductList({ products, deleteProduct, ...rest }: Props) {
  const user = useSelector((state: RootState) => state.auth.currentUserData);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      data={item}
      isAdmin={user?.username === SUPER_ADMI_USERNAME}
      handleDelete={() => deleteProduct(item.id)}
    />
  );

  return (
    <FlatList
      renderItem={renderItem}
      data={products}
      numColumns={2}
      {...rest}
    />
  );
}
