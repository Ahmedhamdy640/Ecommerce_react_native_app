import { ActivityIndicator, Text } from "react-native";
import React, { FC } from "react";
import { useDeleteProduct, useProducts } from "../../hooks/useProducts";

import { TopTabScreenProps } from "../../navigation/types";
import { ProductList } from "../../components/ProductList";

const Products: FC<TopTabScreenProps<"All Products">> = () => {
  const { data: products, isLoading, error, refetch } = useProducts();
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <ProductList
      products={products?.products || []}
      refreshing={isLoading}
      onRefresh={refetch}
      deleteProduct={deleteProduct}
    />
  );
};

export default Products;
