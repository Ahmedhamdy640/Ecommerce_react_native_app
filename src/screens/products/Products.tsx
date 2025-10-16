import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { useProducts } from "../../hooks/useProducts";
import { ProductType } from "../../types/ProductType";
import ProductCard from "../../components/ProductCard";
import { useCurrentUser } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { currentUserData } from "../../store/authSlice";

interface RenderItemProps {
  item: ProductType;
}

const Products = () => {
  const { data: products, isLoading, error } = useProducts();
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    if (currentUser) {
      dispatch(currentUserData(currentUser));
    }
  }, [currentUser, dispatch]);

  const renderItem = ({ item }: RenderItemProps) =>
    isLoading || isLoadingCurrentUser ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : error ? (
      <Text>{error.message}</Text>
    ) : (
      <ProductCard data={item} />
    );

  return (
    <FlatList
      renderItem={renderItem}
      data={products?.products}
      numColumns={2}
    />
  );
};

export default Products;

const styles = StyleSheet.create({});
