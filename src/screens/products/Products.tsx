import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { useDeleteProduct, useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SUPER_ADMI_USERNAME } from "../../constants";
import { Product } from "../../types/ProductType";

interface RenderItemProps {
  item: Product;
}

const Products = () => {
  const { data: products, isLoading, error, refetch } = useProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (productId: number) => {
    deleteProduct.mutate(productId);
  };

  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUserData
  );
  // console.log(">>>>", currentUser);

  const isAdmin = currentUser?.username === SUPER_ADMI_USERNAME;

  const renderItem = ({ item }: RenderItemProps) => (
    <ProductCard data={item} isAdmin={isAdmin} handleDelete={handleDelete} />
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <FlatList
      renderItem={renderItem}
      data={products?.products}
      numColumns={2}
      refreshing={isLoading}
      onRefresh={refetch}
    />
  );
};

export default Products;

const styles = StyleSheet.create({});
