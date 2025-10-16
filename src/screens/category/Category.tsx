import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { useCategory } from "../../hooks/useCategory";
import { Product } from "../../types/ProductType";
import ProductCard from "../../components/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SUPER_ADMI_USERNAME } from "../../constants";

interface RenderItemProps {
  item: Product;
}
const Category = () => {
  const { data, isLoading, error } = useCategory();

  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUserData
  );
  console.log(">>>>", currentUser);

  const isAdmin = currentUser?.username === SUPER_ADMI_USERNAME;
  const renderItem = ({ item }: RenderItemProps) => (
    <ProductCard data={item} isAdmin={isAdmin} />
  );

  const header = () => (
    <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10 }}>
      Smartphones
    </Text>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error) {
    return (
      <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {error.message}
      </Text>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={header}
      renderItem={renderItem}
      data={data?.products}
      numColumns={2}
    />
  );
};

export default Category;

const styles = StyleSheet.create({});
